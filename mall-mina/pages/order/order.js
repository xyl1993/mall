//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
const sumPrice = function (item) {
  let allPrice = 0;
  item.map((item, index) => {
    allPrice = allPrice + item.current_price * item.number;
  })
  return allPrice;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    address:[],
    allPrice: 0.00,
    buttonClicked: false,
    fileIp: Config.file_servier,
    chooseId:''
  },

  onLoad: function (options) {
    if (options.chooseId) {
      this.setData({ chooseId: options.chooseId });
      this.getShopcarList();
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddress();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  getShopcarList: function () {
    api.get("program/shopcar", { chooseId: this.data.chooseId}).then(res => {
      let { data, status } = res;
      if (status === 200) {
        let allPrice = sumPrice(data);
        this.setData({ productList: data, allPrice: allPrice})
      }
    });
  },

  getAddress:function(){
    api.get(`program/user/address`, { address_status:1}).then(res => {
      const { data, status } = res;
      if (status === 200) {
        this.setData({ address: data });
      }
    });
  },

  replay:function(e){
    ButtonClicked(this, e);
    if (this.data.address.length===0){
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showLoading({
        title: '正在提交',
        mask: true
      });
      let productList = this.data.productList;
      let allPrice = this.data.allPrice;
      let chooseId = this.data.chooseId;
      let params = { allPrice, chooseId, productList, ...this.data.address[0] };
      api.post(`program/order`, params).then(res => {
        const { data, status } = res;
        if (status === 200) {
          wx.redirectTo({
            url: '../orderSuccess/orderSuccess'
          })
        }
      });
    }
  },

  addAddress:function(){
    wx.navigateTo({
      url: '../address/address?type=order'
    })
  },
  tabAddress:function(){
    wx.navigateTo({
      url: '../address/address?type=order'
    })
  }
})