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
    chooseId:'',
    is_admin: 0,
    addressId:''
  },

  onLoad: function (options) {
    let self = this;
    const is_admin = wx.getStorageSync('is_admin');

    this.setData({
      is_admin: is_admin
    });
    if (options.chooseId) {
      this.setData({ chooseId: options.chooseId });
      this.getShopcarList();
    };
    if (options.addressId) {
      this.setData({ addressId: options.addressId });
      this.getAddressDetail(options.addressId);
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
  getAddressDetail: function (addressId){
    let address = [];
    api.get(`program/user/address/${addressId}`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        console.log(res);
        this.setData({ address: address.push(data)});
      }
    });
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
    wx.showLoading({
      title: '正在提交',
      mask: true
    });
    let subForm = e.detail.value;
    let productList = this.data.productList;
    let allPrice = this.data.allPrice;
    let chooseId = this.data.chooseId;
    let address = {
      collect_name:subForm.collect_name,
      phone:subForm.phone,
      address:subForm.address
    }
    let params = { allPrice, chooseId, productList, ...address };
    api.post(`program/order`, params).then(res => {
      const { data, status } = res;
      if (status === 200) {
        wx.redirectTo({
          url: '../orderSuccess/orderSuccess'
        })
      }
    });
  },

  addAddress:function(){
    wx.navigateTo({
      url: '../address/address?type=order'
    })
  },
  tabAddress:function(e){
    if(this.data.is_admin === 1){
      wx.navigateTo({
        url: '../address/address?type=order'
      })
    }else{
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../addressDetail/addressDetail?addressId=${id}`
      })
    }
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (this.data.address.length===0){
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      return {
        title: '请确认您的订单',
        path: `pages/shareOrder/shareOrder?addressId=${this.data.address[0].id}&chooseId=${this.data.chooseId}`,
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }
  }
})