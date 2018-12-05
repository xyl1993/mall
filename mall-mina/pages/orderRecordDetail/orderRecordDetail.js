//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
import { toFix } from '../../utils/util.js';
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
    this.setData({ order_number: options.order_number, collect_status: options.collect_status, pay_status: options.pay_status,isAdmin:options.isAdmin });
    this.getOrderDetail(options.order_number);
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
    console.log(123);
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
  payAction: function (e) {
    ButtonClicked(this, e);
    let self = this;
    let orderNumber = this.data.order_number;
    let allPrice = toFix(self.data.orderInfo.should_price);
    let productInfo = self.data.orderInfo.productInfo;
    let productInfoArr = [];
    for (let item of productInfo){
      productInfoArr.push(item.title + '-' + item.specifications_name);
    }
    productInfo = productInfoArr.join();
    let formId = e.detail.formId;
    let address = this.data.orderInfo.address;
    wx.showLoading({
      title: '正在提交',
      mask: true
    });
    let params = { orderNumber, allPrice, formId, address, productInfo};
    api.post(`program/order/payAction`, params).then(res => {
      const { data, status } = res;
      if (status === 200) {
        const { timeStamp, nonceStr, paySign, tradeId } = data;
        params.tradeId = tradeId;
        wx.requestPayment({
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: paySign,
          success(res) {
            wx.hideLoading();
            wx.redirectTo({
              url: '../allorder/allorder?type=2'
            })
            // api.post(`program/order/pay`, params).then(res => {
            //   const { data, status } = res;
            //   if (status === 200) {
            //     wx.hideLoading();
            //     wx.redirectTo({
            //       url: '../allorder/allorder?type=2'
            //     })
            //   }
            // });
          },
          fail(res) {
            wx.hideLoading();
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 3000,
            })
          }
        })
      }else{
        wx.hideLoading();
      }
    });
  },
  //收货
  collectGoods: function (e) {
    const self = this;
    wx.showModal({
      title: '提示',
      content: '确认收货吗？',
      success(res) {
        if (res.confirm) {
          let order_number = this.data.order_number;
          api.put(`program/order/collect/${order_number}`).then(res => {
            let {
              data,
              status
            } = res;
            if (status === 200) {
              wx.redirectTo({
                url: '../allorder/allorder?type=1'
              })
            }
          });
        } else if (res.cancel) {
        }
      }
    })
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