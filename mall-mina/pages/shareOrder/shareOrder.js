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
    productList: [],
    address: [],
    allPrice: 0.00,
    buttonClicked: false,
    fileIp: Config.file_servier,
    chooseId: '',
    addressId: '',
    loading:false
  },

  onLoad: function (options) {
    this.setData({ account_id: options.account_id });
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  getAddressDetail: function (addressId) {
    let address = [];
    api.get(`program/user/address/${addressId}`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        console.log(data);
        if (data){
          address.push(data)
          this.setData({ address: address});
        }
      }
    });
  },
  getShopcarList: function () {
    wx.showLoading({
      title: '正在请求',
      mask: true
    })
    api.get("program/shopcar", { chooseId: this.data.chooseId }).then(res => {
      let { data, status } = res;
      if (status === 200) {
        if(data && data.length>0){
          let allPrice = sumPrice(data);
          this.setData({ productList: data, allPrice: allPrice })
          wx.hideLoading()
        } else {
          wx.switchTab({
            url: '../index/index'
          })
          wx.hideLoading()
        }
      }
    });
  },
  toDetail:function(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDetail/productDetail?productId=' + id
    })
  },
  replay: function (e) {
    ButtonClicked(this, e);
    const self = this;
    wx.showModal({
      title: '提示',
      content: '确认这样操作吗?',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在提交',
            mask: true
          });
          const form_id = e.detail.formId;
          let subForm = e.detail.value;
          let productList = self.data.productList;
          let allPrice = self.data.allPrice;
          let chooseId = self.data.chooseId;
          let account_id = self.data.account_id;
          let address = {
            collect_name: subForm.collect_name,
            phone: subForm.phone,
            address: subForm.address,
            addressId: self.data.addressId
          }
          let params = { allPrice, chooseId, account_id, productList, form_id, ...address };
          api.post(`program/order`, params).then(res => {
            const { data, status } = res;
            if (status === 200) {
              wx.redirectTo({
                url: '../allorder/allorder?type=2'
              })
            }
          });
        }
      }
    })
  },
  
})