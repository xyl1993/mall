//此方法用来揭秘微信返回的用户信息
var WXBizDataCrypt = require('../utils/WXBizDataCrypt')

function decryptData(encryptedData,iv,appId,sessionKey){
  var pc = new WXBizDataCrypt(appId, sessionKey)

  var data = pc.decryptData(encryptedData , iv)

  return data
}

function jscode2session(APPID,SECRET,JSCODE) {
  return `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`;
}

function getAccessTokenUri(APPID,APP_SECRIPT){
  return `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APP_SECRIPT}`;
}

function sendMessageUri(ACCESS_TOKEN){
  return `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${ACCESS_TOKEN}`;
}

function getPayUri(){
  return `https://api.mch.weixin.qq.com/pay/unifiedorder`;
}

module.exports = {

  jscode2session,
  decryptData,
  sendMessageUri,
  getAccessTokenUri,
  getPayUri
};
