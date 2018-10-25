import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
Page({

  data: {
    addressList:[]
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
  }
})