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
    fileIp: Config.file_servier,
    buttonClicked: false,
    orderInfo:{
      should_price:''
    },
    status:'',
    loading:false,
    formData:{}
  },

  onLoad: function (options) {
    if (options.order_number) {
      this.setData({ order_number: options.order_number });
      this.getOrderDetail(options.order_number);
    };
    if (options.status){
      this.setData({ status: options.status });
    }
  },

  getOrderDetail: function (order_number){
    api.get(`order/${order_number}`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        this.setData({ orderInfo: data})
      }
    });
  },
  toDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDetail/productDetail?productId=' + id
    })
  },
  formSubmit: function (e) {
    ButtonClicked(this, e);
    let subForm = e.detail.value;
    let formData = this.data.formData;
    let order_number = this.data.order_number;
    formData.logistics_name = subForm.logistics_name;
    formData.logistics_number = subForm.logistics_number;
    formData.form_id = e.detail.formId;
    if (validate(this, formData)) {
      wx.showLoading({
        title: '请求中',
        mask: true
      });
      api.put(`program/order/deliver/${order_number}`, formData).then(res => {
        const { data, status } = res;
        if (status === 200) {
          wx.navigateBack({
            delta: 1
          })
        }
      });
    }
  },
})

function validate(_this, formData) {
  let showToast = text => {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 1000
    })
  }
  if (!formData.logistics_name) {
    showToast('请输入物流名称');
    return false;
  }
  if (!formData.logistics_number) {
    showToast('请输入物流单号');
    return false;
  }
  return true;
}