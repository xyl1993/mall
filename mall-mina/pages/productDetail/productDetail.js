import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
import {shareData} from '../../config/share-data.js'
var WxParse = require('../../lib/wxParse/wxParse.js');

Page({

  data: {
    productId:'',
    buttonClicked: false,
    isCollection:false,
    buyCar:{
      product_id:'',
      specifications_id:''
    },
    dialogStatus:false,
    buyNum:1,
    fileIp: Config.file_servier,
    productDetail:{},
    specifications:[],
    carousel: [
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    shouldBuy:false,
    shareImageStatus:false,
    painting: {},
    paintingIndex:0,
    shareImage: '',
    mode: 'normal' // cry
  },
  onLoad: function (options) {
    if (options.productId) this.setData({ productId: options.productId });
    this.getProductDetail(options.productId);
    this.getCollectionStatus();
    this.updatereadNumber(options.productId);
  },
 
  updatereadNumber: function (productId){
    api.put(`product/${productId}/read_number`).then(res => {
    });
  },
  getProductDetail: function (productId) {
    let shareObj = shareData.views;
    api.get(`product/${productId}`).then(res => {
      const { data, status } = res;
      const { fileIp } = this.data;
      if (status === 200) {
        let carousel = [];
        if (data.carousel) {
          data.carousel.split(',').map((item, index) => {
            carousel.push(
              fileIp + item
            );
          });
          this.setData({ carousel: carousel});
        }
        const mall_user = wx.getStorageSync('mall_user');
        if(mall_user){
          const {nikename,portrait} = mall_user;
          if(portrait) shareObj[1].url = portrait;
          if(nikename) shareObj[3].content = `您的好友${nikename}`;
          shareObj[5].url = carousel[0];
          shareObj[7].content = data.title;
          shareObj[8].content = `￥${data.specifications[0].current_price}`;
          shareObj[9].content = `原价￥${data.specifications[0].original_price}`;
          console.log(shareObj);
          shareData.views = shareObj;
        }
        this.setData({ productDetail: data, specifications: data.specifications, painting:shareData});
        var that = this;
        let buyCar = {
          product_id: productId
        };
        initBuyCar(this, data.specification_id, buyCar);
        WxParse.wxParse('article', 'html', data.detail, that, 15);
      }
    });
  },
  getCollectionStatus(){
    let productId = this.data.productId;
    api.get(`program/product/${productId}/collection`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        this.setData({ isCollection: data.length > 0});
      }
    });
  },
  collection(e){
    ButtonClicked(this, e);
    let product_id = this.data.productId;
    let params = {
      product_id: product_id
    }
    api.post(`program/collection`, params).then(res => {
      const { data, status } = res;
      if (status === 200) {
        this.setData({ isCollection:true });
      }
    });
  },
  cancelCollection(e){
    ButtonClicked(this, e);
    let product_id = this.data.productId;
    api.delete(`program/product/${product_id}/collection`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        this.setData({ isCollection: false });
      }
    });
  },
  reduce(){
    let buyCar = this.data.buyCar;
    if (buyCar.number>1){
      buyCar.number = buyCar.number-1;
    }else{
      buyCar.number = 1;
    }
    this.setData({ buyCar: buyCar});
  },
  add(){
    let buyCar = this.data.buyCar;
    buyCar.number = buyCar.number+1;
    this.setData({ buyCar: buyCar });
  },
  closeDialog(){
    this.setData({ dialogStatus :false})
  },
  joinCar(e){
    let type = e.currentTarget.dataset.type;
    this.setData({ shouldBuy: type?true:false})
    this.setData({ dialogStatus: true});
  },
  choose(e){
    let id = e.currentTarget.dataset.id;//规格id
    let buyCar = this.data.buyCar;
    initBuyCar(this, id, buyCar);
  },
  joinCarSure(e){
    ButtonClicked(this, e);
    const params = this.data.buyCar;
    api.post("program/shopcar",params).then(res => {
      let { data, status } = res;
      if (status === 200) {
        if(this.data.shouldBuy){
          wx.switchTab({
            url: '/pages/shopcar/shopcar'
          })
        }else{
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({ dialogStatus: false })
        }
      }
    });
  },
  goShopcar(){
    wx.switchTab({
      url: '../shopcar/shopcar',
      success: function (e) {
        // var page = getCurrentPages().pop();
        // if (page == undefined || page == null) return;
        // page.onLoad();
      }
    })
  },
  eventDraw(){
    this.setData({
      shareImageStatus: true
    })
    if(!this.data.shareImage){

      wx.showLoading({
        title: '绘制分享图片中',
        mask: true
      })
      const { painting } = this.data;
      console.log(painting);
      this.setData({
        mode: 'normal',
        painting: painting,
        paintingIndex: 0
      })

    }
  },
  eventGetImage (event) {
    let self = this;
    setTimeout(function(){
      wx.hideLoading()
      const { tempFilePath } = event.detail
      self.setData({
        shareImage: tempFilePath,
        shareImageStatus: self.data.shareImageStatus
      })
      console.log()
    },2000)
  },
  saveShareImg(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  hideShareImage(){
    this.setData({
      shareImageStatus:false
    })
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: Config.share_name,
      path: 'pages/productDetail/productDetail?productId=' + this.data.productId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

function initBuyCar(self, id, buyCar){
  buyCar.specifications_id = id;
  let specifications = self.data.specifications;
  specifications.map((item, index) => {
    item.active = false;
    if (item.id === id) {
      item.active = true;
      buyCar.current_price = item.current_price;
      buyCar.original_price = item.original_price;
      buyCar.stock = item.stock;
      buyCar.number = 1;
    }
  })
  self.setData({ specifications: specifications, buyCar: buyCar })
}