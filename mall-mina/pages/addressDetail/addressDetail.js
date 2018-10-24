import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonClicked: false,
    default_status:false,
    loading:false,
    addressId:'',
    formData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.addressId) {
      this.setData({ addressId: options.addressId });
      this.getDetail(options.addressId);
    };
   
  },
  switchTab:function(){
    let default_status = this.data.default_status;
    this.setData({ default_status: !default_status});
  },
  formSubmit:function(e){
    ButtonClicked(this, e);
    let subForm = e.detail.value;
    let formData = this.data.formData;
    let addressId = this.data.addressId;
    formData.collect_name = subForm.collect_name;
    formData.address = subForm.address;
    formData.phone = subForm.phone;
    formData.default_status = this.data.default_status;
    
    if (validate(this, formData)) {
      wx.showLoading({
        title: '请求中',
        mask: true
      });
      if(addressId){
        //修改
        api.put(`program/user/address/${addressId}`, formData).then(res => {
          const { data, status } = res;
          if (status === 200) {
            wx.redirectTo({
              url: '../address/address'
            })
          }
        });
      }else{
        api.post(`program/user/address`, formData).then(res => {
          const { data, status } = res;
          if (status === 200) {
            wx.redirectTo({
              url: '../address/address'
            })
          }
        });
      }
    }
  },
  handleDelete:function(){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确认删除码?',
      success(res) {
        if (res.confirm) {
          let addressId = _this.data.addressId;
          api.delete(`program/user/address/${addressId}`).then(res => {
            const { data, status } = res;
            if (status === 200) {
              wx.redirectTo({
                url: '../address/address'
              })
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  getDetail: function (addressId){
    api.get(`program/user/address/${addressId}`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        let default_status = data.default_status===1?true:false;
        this.setData({ formData: data, default_status: default_status});
      }
    });
  }
})


function validate(_this, formData) {
  let showToast = text => {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 1000
    })
  }
  if (!formData.collect_name) {
    showToast('请输入收货人');
    return false;
  }
  if (!formData.address) {
    showToast('请输入收货地址');
    return false;
  }
  if (!formData.phone) {
    showToast('请输入联系方式');
    return false;
  }
  return true;
}