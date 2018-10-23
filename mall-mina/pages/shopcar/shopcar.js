//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allChecked: false,
    editStatus: false,
    fileIp: Config.file_servier,
    carList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getShopcarList();
  },
  getShopcarList: function() {
    api.get("program/shopcar").then(res => {
      let { data,status} = res;
      if (status === 200) {
        this.setData({ carList:data})
      }
    });
  },
  editHandle:function(){
    console.log(1);
    this.setData({ editStatus: true })
  },
  cancelHandle(){
    this.setData({ editStatus:false})
  }
})