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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { redirecturi, productId, addressId, chooseId, account_id } = options;
    const self = this;
    const sessionid = wx.getStorageSync('sessionid')
    // if (!sessionid){
      wx.getSetting({
        success(settingRes) {
          wx.login({
            success: res => {
              api.get(`program/user/auth/` + res.code).then(res => {
                let { data, status } = res;
                if (status === 200) {
                  wx.setStorageSync('sessionid', data.sessionid) //把登录后获取的openId等信息保存本地
                  wx.setStorageSync('is_admin', data.is_admin) //把登录后获取的openId等信息保存本地
                  wx.setStorageSync('mall_user', data) //把登录后获取的openId等信息保存本地
                  if (settingRes.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success: res => {
                        const param = {
                          encryptedData: res.encryptedData,
                          iv: res.iv
                        };
                        api.put(`program/user/auth`, param).then(res => {
                          self.redirect(redirecturi, productId, addressId, chooseId, account_id);
                        });
                      }
                    })
                  } else {
                    self.redirect(redirecturi, productId, addressId, chooseId, account_id);
                  }
                }
              });
            }
          })
        }
      })
    // }else{
    //   wx.switchTab({
    //     url: '../index/index',
    //   })
    // }
  },
  redirect: function (uri, productId, addressId, chooseId, account_id){
    let is_admin = wx.getStorageSync('is_admin');
    if(uri){
      switch(uri){
        case 'productDetail':
          wx.redirectTo({
            url: '../productDetail/productDetail?productId=' + productId
          })
        break;
        case 'shareOrder':
          if (is_admin === 1){
            wx.redirectTo({
              url: `../shareOrder/shareOrder?addressId=${addressId}&chooseId=${chooseId}&account_id=${account_id}`
            })
          }else{
            wx.switchTab({
              url: '../shopcar/shopcar',
            })
          }
          break;
        default:break;
      }
    }else{
      wx.switchTab({
        url: '../index/index',
      })
    }
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