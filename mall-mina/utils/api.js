import { Config } from "../config";
const Fly = require("../lib/wx.umd.min.js"); //wx.js为您下载的源码文件
const fly = new Fly();
const allowUrls = new RegExp(Config.allowUrls);//'g'
const noJsonTypeUrls = new RegExp(Config.noJsonTypeUrls);//'g'


function createAuthorizationHeader(url) {
  if (!allowUrls.test(url)) {
    let token;
    let idInfo = wx.getStorageSync('idInfo');
    if (idInfo) {
      token = idInfo.sessionId;
    }
    if (noJsonTypeUrls.test(url)) {
      return {
        "wxa-sessionid": token
      }
    } else {
      return {
        "wxa-sessionid": token,
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
  }
  if (noJsonTypeUrls.test(url)) {
    return {}
  } else {
    return { "Content-Type": "application/json;charset=UTF-8" }
  }
}

function checkStatus(response) {
  NProgress.done()
  return {
    data: {
      status: response.status,
      data: response.data,
    }
  }
}

export default {
  post(url, data) {
    return fly.post(Config.api_url + url, data, {
      headers: createAuthorizationHeader(url)
    })
      .then(checkStatus)
  },
  get(url, data) {
    return fly.get(Config.api_url + url, data, {
      headers: createAuthorizationHeader(url)
    })
      .then(checkStatus)
  }
}