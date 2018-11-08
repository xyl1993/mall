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
    api.get("program/shopcar", { chooseId: this.data.chooseId }).then(res => {
      let { data, status } = res;
      console.log(data);
      if (status === 200) {
        if(data && data.length>0){
          let allPrice = sumPrice(data);
          this.setData({ productList: data, allPrice: allPrice })
        } else {
          wx.redirectTo({
            url: '../orderSuccess/orderSuccess'
          })
        }
      }
    });
  },

  replay: function (e) {
    ButtonClicked(this, e);
    wx.showLoading({
      title: '正在提交',
      mask: true
    });
    const form_id = e.detail.formId;
    let subForm = e.detail.value;
    let productList = this.data.productList;
    let allPrice = this.data.allPrice;
    let chooseId = this.data.chooseId;
    let address = {
      collect_name: subForm.collect_name,
      phone: subForm.phone,
      address: subForm.address,
      addressId: this.data.addressId
    }
    let params = { allPrice, chooseId, productList, form_id, ...address };
    api.post(`program/order`, params).then(res => {
      const { data, status } = res;
      if (status === 200) {
        wx.redirectTo({
          url: '../orderSuccess/orderSuccess'
        })
      }
    });
  },
  
})