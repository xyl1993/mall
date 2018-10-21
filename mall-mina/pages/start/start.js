// pages/start/start.js
//index.js
//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js';
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(settingRes) {
        wx.login({
          success: res => {
            api.get(`program/user/auth/` + res.code).then(res => {
              let { data, status } = res;
              if (status === 200) {
                wx.setStorageSync('sessionid', data.sessionid) //把登录后获取的openId等信息保存本地
                // if (this.data.canIUse) {
                //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                //   // 所以此处加入 callback 以防止这种情况
                //   app.userInfoReadyCallback = res => {
                //     console.log(res.userInfo);
                //   }
                // } else {
                // 在没有 open-type=getUserInfo 版本的兼容处理
                if (settingRes.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success: res => {
                      const param = {
                        encryptedData: res.encryptedData,
                        iv: res.iv
                      };
                      api.put(`program/user/auth`, param).then(res => {
                        let { data, status } = res;
                        wx.switchTab({
                          url: '../index/index',
                        })
                      });
                    }
                  })
                } else {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
                // }
              }
            });
          }
        })
        
      }
    })


   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})