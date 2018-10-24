import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
var WxParse = require('../../lib/wxParse/wxParse.js');

Page({

  data: {
    productId:'',
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
    duration: 1000
  },
  onLoad: function (options) {
    if (options.productId) this.setData({ productId: options.productId });
    this.getProductDetail(options.productId);
  },
  getProductDetail: function (productId) {
    
    api.get(`product/${productId}`).then(res => {
      const { data, status } = res;
      const { fileIp } = this.data;
      if (status === 200) {
        if (data.carousel) {
          let carousel = [];
          data.carousel.split(',').map((item, index) => {
            carousel.push(
              fileIp + item
            );
          });
          this.setData({ carousel: carousel});
        }
        this.setData({ productDetail: data, specifications: data.specifications });
        var that = this;
        console.log(data.detail);
        WxParse.wxParse('article', 'html', data.detail, that, 15);
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
  joinCar(){
    let productDetail = this.data.productDetail;
    let specifications = this.data.specifications;
    let id = productDetail.specifications[0].id;//规格id
    let buyCar = {
      product_id: this.data.productId,
      specifications_id: id,
      number:1,
      current_price: specifications[0].current_price,
      stock: specifications[0].stock
    }
    specifications[0].active = true;
    this.setData({ dialogStatus: true, buyCar: buyCar, specifications: specifications});
  },
  choose(e){
    let id = e.currentTarget.dataset.id;//规格id
    let buyCar = this.data.buyCar;
    buyCar.specifications_id = id;
    let specifications = this.data.specifications;
    specifications.map((item,index)=>{
      item.active = false;
      if (item.id === id){
        item.active = true;
        buyCar.current_price = item.current_price;
        buyCar.stock = item.stock;
      }
    })
    this.setData({ specifications: specifications, buyCar: buyCar})
  },
  joinCarSure(){
    const params = this.data.buyCar;
    api.post("program/shopcar",params).then(res => {
      let { data, status } = res;
      if (status === 200) {
        wx.showToast({
          title: '加入成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({ dialogStatus:false})
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
  }
})