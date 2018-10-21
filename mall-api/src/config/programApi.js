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

module.exports = {
  jscode2session,
  decryptData
};
