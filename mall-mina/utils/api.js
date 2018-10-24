import {
  Config
} from "../config/index.js";
const Fly = require("../lib/wx.umd.min.js"); //wx.js为您下载的源码文件
const fly = new Fly();
const allowUrls = new RegExp(Config.allowUrls); //'g'
const noJsonTypeUrls = new RegExp(Config.noJsonTypeUrls); //'g'


function createAuthorizationHeader(url) {
  let sessionid = wx.getStorageSync('sessionid');
  if (sessionid) {
    return {
      "sessionid": sessionid,
      "Content-Type": "application/json;charset=UTF-8"
    }
  }
}

function checkStatus(response) {
  return {
    status: response.status,
    data: response.data,
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
  },
  delete(url, data) {
    return fly.delete(Config.api_url + url, data, {
      headers: createAuthorizationHeader(url)
    })
      .then(checkStatus)
  },
  put(url, data) {
    return fly.put(Config.api_url + url, data, {
        headers: createAuthorizationHeader(url)
      })
      .then(checkStatus)
  }
}