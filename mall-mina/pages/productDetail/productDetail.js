import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
var WxParse = require('../../lib/wxParse/wxParse.js');

Page({

  data: {
    productId:'',
    fileIp: Config.file_servier,
    productDetail:{
      
    },
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
        this.setData({ productDetail: data });
        var that = this;
        WxParse.wxParse('article', 'html', data.detail, that, 5);
      }
    });
  },
})