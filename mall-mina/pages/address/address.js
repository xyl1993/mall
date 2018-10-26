import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
Page({

  data: {
    addressList:[],
    type:''
  },

  onLoad: function (options) {
    if (options.type) {
      this.setData({ type: options.type });
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.getAddressList();
  },
  getAddressList: function(){
    api.get(`program/user/address`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        data.map((item,index)=>{
          item.icontext = item.collect_name.substring(0,1)
        })
        this.setData({ addressList: data });
      }
    });
  },
  add:function(){
    wx.navigateTo({
      url: '../addressDetail/addressDetail'
    })
  },
  edit:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../addressDetail/addressDetail?addressId=${id}`
    })
  },
  setAddress:function(e){
    let type = this.data.type;
    let item = e.currentTarget.dataset.item;
    item.default_status = 1;
    if (type){
      wx.showLoading({
        title: '请求中',
        mask: true
      });
      api.put(`program/user/address/${item.id}`, item).then(res => {
        const { data, status } = res;
        if (status === 200) {
          wx.navigateBack({
            delta: 1
          })
        }
      });
    }
  }
})