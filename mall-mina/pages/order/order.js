//获取应用实例
import api from '../../utils/api.js';
import { toFix } from '../../utils/util.js';
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
    const mall_user = wx.getStorageSync('mall_user');
    this.setData({
      is_admin: is_admin,
      account_id: mall_user.id
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
  toDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDetail/productDetail?productId=' + id
    })
  },
 
  payAction: function (e) {
    let self = this;
    let dataAddress = self.data.address;
    let formId = e.detail.formId;
    if (dataAddress.length === 0){
      wx.showToast({
        title: '请先选择收货人',
        icon: 'none',
        duration: 3000
      })
      return
    }
    wx.showLoading({
      title: '正在提交',
      mask: true
    });
    let subForm = e.detail.value;
    let productList = self.data.productList;
    let allPrice = toFix(self.data.allPrice);
    let chooseId = self.data.chooseId;
    let account_id = self.data.account_id;
    let address = {
      collect_name: dataAddress[0].collect_name,
      phone: dataAddress[0].phone,
      address: dataAddress[0].address,
      addressId: dataAddress[0].id
    }
    let params = { allPrice, chooseId, account_id, productList, ...address };
    api.post(`program/order`, params).then(res => {
      const { data, status } = res;
      if (status === 200) {
        console.log(data);
        const { timeStamp, nonceStr, paySign, orderNumber} = data;
        wx.requestPayment({
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: paySign,
          success(res) {
            //下单成功
            params = { orderNumber, allPrice, formId };
            params.address = dataAddress[0].address;
            api.post(`program/order/pay`, params).then(res => {
              const { data, status } = res;
              if (status === 200) {
                wx.hideLoading();
                wx.redirectTo({
                  url: '../allorder/allorder?type=2'
                })
              }
            });
           },
          fail(res) { 
            wx.hideLoading();
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 3000,
              success:function(){
                wx.redirectTo({
                  url: '../allorder/allorder?type=1'
                })
              }
            })
          }
        })
      }
    });
  },
})