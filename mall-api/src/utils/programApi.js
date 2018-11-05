const {
  handleError
} = require('./handleUtilFun');
const config = require('../config/environment');
const axios = require('axios');
var accessTokenJson = require('../config/data/access_token');
const {getAccessTokenUri,sendMessageUri} = require('../config/programApi');
const fs = require('fs');
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
module.exports = {
  getAccessToken,
  sendMessage
};

