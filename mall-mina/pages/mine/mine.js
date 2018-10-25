//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authStatus:false
  },
  onLoad: function () {
    let _this = this;
    wx.getSetting({
      success(settingRes) {
        if (settingRes.authSetting['scope.userInfo']){
          //已经授权
          _this.setData({ authStatus:true});
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          _this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onGotUserInfo(e){
    this.setData({ authStatus:true});
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleFun(e){
    let authStatus = this.data.authStatus;
    if (authStatus){
      let type = e.currentTarget.dataset.type;
      switch (type) {
        case 'address':
          wx.navigateTo({
            url: '../address/address'
          })
          break;
        case 'collection':
          wx.navigateTo({
            url: '../collection/collection'
          })
          break;
        default: break;
      }
    }else{
      wx.showToast({
        title: '请先授权登陆',
        icon: 'none',
        duration: 1000
      })
    }
  }
})
