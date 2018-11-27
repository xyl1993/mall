const {
  handleError
} = require('./handleUtilFun');
const status = require('http-status');
const config = require('../config/environment');
const axios = require('axios');
var accessTokenJson = require('../config/data/access_token');
const {getAccessTokenUri,sendMessageUri,getPayUri} = require('../config/programApi');
const fs = require('fs');

const md5 = require('blueimp-md5')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

const getAccessToken = function(){
  return new Promise((resolve,reject)=>{
    //获取当前时间 
    var currentTime = new Date().getTime();
    //判断 本地存储的 access_token 是否有效
    if (accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
      axios({
        method:'get',
        url:getAccessTokenUri(config.AppID,config.AppSecret)
      })
      .then((response)=> {
        const data = response.data;
        if (!data.errcode) {
          accessTokenJson.access_token = data.access_token;
          accessTokenJson.expires_time = new Date().getTime() + (parseInt(data.expires_in) - 200) * 1000;
          //更新本地存储的
          fs.writeFile(`${config.serverDataFolder}access_token.json`, JSON.stringify(accessTokenJson),function (err) {
            if (err) throw err;
            //将获取后的 access_token 返回
            resolve(accessTokenJson.access_token);
          });
        } else {
          //将错误返回
          resolve(data);
        }
      })
      .catch((err)=>{
        //将错误返回
        reject(err)
      })
    }else {
      //将本地存储的 access_token 返回
      resolve(accessTokenJson.access_token);  
    }
  })
}

const sendMessage = function (access_token,body) {
  return new Promise((resolve,reject)=>{
    axios({
      method:'post',
      data:body,
      url:sendMessageUri(access_token),
    })
    .then((response)=> {
      const data = response.data;
      if (!data.errcode) {
        resolve(data);
      } else {
        //将错误返回
        resolve(data);
      }
    })
    .catch((err)=>{
      //将错误返回
      reject(err)
    })
  })
};

const payAction = function (req) {
  const { openid } = req;
  const appId = config.AppID;
  // 商户号
  const mchId = config.mchId;
  // 支付的 key
  const PAY_API_KEY = config.PAY_API_KEY;
  // attach 是一个任意的字符串, 会原样返回, 可以用作一个标记
  const attach = 'GJS-ORG';
  // 一个随机字符串
  const nonceStr = getNonceStr();
  // 生成商家内部自定义的订单号, 商家内部的系统用的, 不用 attach 加入也是可以的
  const tradeId = getTradeId(attach);
  //商品信息
  const productIntro = "test";   
  //付款成功返回url
  const notifyUrl = "/index";
  const price = "0.01";
  // 这里是在 express 获取用户的 ip, 因为使用了 nginx 的反向代理, 所以这样获取
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ip = ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
  // 生成签名
  const sign = getPrePaySign(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openid, tradeId, ip, price,PAY_API_KEY);
  console.log(sign);
  //将微信需要的数据拼成 xml 发送出去
  const sendData = wxSendData(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openid, tradeId, ip, price, sign)
  return new Promise((resolve,reject)=>{
    axios({
      method:'post',
      data:sendData,
      url:getPayUri(),
    })
    .then((response)=> {
      const data = response.data;
      // 微信返回的数据也是 xml, 使用 xmlParser 将它转换成 js 的对象
      xmlParser.parseString(data, (err, success) => {
        if (err) {
          log('parser xml error ', err);
          resolve({code:status.INTERNAL_SERVER_ERROR,data:err});
        } else {
          if (success.xml.return_code[0] === 'SUCCESS') {
            const prepayId = success.xml.prepay_id[0]
            const payParamsObj = getPayParams(prepayId, tradeId)
            // 返回给前端, 这里是 express 的写法
            // res.json(payParamsObj)
            resolve({code:status.OK,data:payParamsObj});
          } else {
            resolve({code:status.INTERNAL_SERVER_ERROR,data:success.xml.return_msg[0]});
          }
        }
      })
    })
    .catch((err)=>{
      //将错误返回
      reject(500)
    })
  })
};


// 预定义的一些工具函数
function getNonceStr() {
  var text = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (var i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getTradeId(attach) {
  var date = new Date().getTime().toString()
  var text = ""
  var possible = "0123456789"
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  var tradeId = 'ty_' + attach + '_' + date + text
  return tradeId
}

function getPrePaySign(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price,PAY_API_KEY) {
  var stringA = 'appid=' + appId +
    '&attach=' + attach +
    '&body=' + productIntro +
    '&mch_id=' + mchId +
    '&nonce_str=' + nonceStr +
    '&notify_url=' + notifyUrl +
    '&openid=' + openId +
    '&out_trade_no=' + tradeId +
    '&spbill_create_ip=' + ip +
    '&total_fee=' + price +
    '&trade_type=JSAPI'
  var stringSignTemp = stringA + '&key=' + PAY_API_KEY
  var sign = md5(stringSignTemp).toUpperCase()
  return sign
}

function wxSendData(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price, sign) {
  const sendData = '<xml>' +
    '<appid>' + appId + '</appid>' +
    '<attach>' + attach + '</attach>' +
    '<body>' + productIntro + '</body>' +
    '<mch_id>' + mchId + '</mch_id>' +
    '<nonce_str>' + nonceStr + '</nonce_str>' +
    '<notify_url>' + notifyUrl + '</notify_url>' +
    '<openid>' + openId + '</openid>' +
    '<out_trade_no>' + tradeId + '</out_trade_no>' +
    '<spbill_create_ip>' + ip + '</spbill_create_ip>' +
    '<total_fee>' + price + '</total_fee>' +
    '<trade_type>JSAPI</trade_type>' +
    '<sign>' + sign + '</sign>' +
    '</xml>'
  console.log(sendData);
  return sendData
}

function getPayParams(prepayId, tradeId) {
  const nonceStr = util.getNonceStr()
  const timeStamp = new Date().getTime().toString()
  const package = 'prepay_id=' + prepayId
  const paySign = util.getPaySign(appId, timeStamp, nonceStr, package)
  // 前端需要的所有数据, 都从这里返回过去
  const payParamsObj = {
    nonceStr: nonceStr,
    timeStamp: timeStamp,
    package: package,
    paySign: paySign,
    signType: 'MD5',
    tradeId: tradeId,
  }
  return payParamsObj
}


module.exports = {
  getAccessToken,
  sendMessage,
  payAction
};

