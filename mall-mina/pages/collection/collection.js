import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:[],
    fileIp: Config.file_servier,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectionList();
  },

  getCollectionList:function(){
    api.get(`program/collection`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        this.setData({ collectionList: data });
      }
    });
  },
  toDetail:function(e){
    let product_id = e.currentTarget.dataset.product_id;
    wx.navigateTo({
      url: `../productDetail/productDetail?productId=${product_id}`
    })
  }
})