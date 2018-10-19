//index.js
//获取应用实例
import api from '../../utils/api.js';
import { Config } from '../../config/index.js'
Page({
  data: {
    current:1,
    pageSize:10,
    fileIp: Config.file_servier,
    productList: [],
    carouselList:[],
    brandList:[],
    testImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    this.loadBrand();
    this.loadData();
    this.loadCarousel();
  },
  loadCarousel:function(){
    api.get("carousel").then(res => {
      let { data, status } = res;
      if (status === 200) {
        this.setData({ carouselList: data });
      }
    });
  },
  loadBrand:function(){
    api.get("brand").then(res => {
      let { data, status } = res;
      if (status === 200) {
        this.setData({ brandList: data });
        console.log(data);
      }
    });
  },
  loadData: function (e) {
    let params = {
      current: this.data.current,
      pageSize: this.data.pageSize
    };
    api.get("product", params).then(res => {
      console.log(res);
      let { data, status } = res;
      if (status === 200){
        let productList = this.data.productList;
        if (data.totalItems == 1) {
          productList = []
        }
        productList = productList.concat(data.data);
        this.setData({ productList: productList})
        console.log(this.data.productList);
      }
    });
  },
  detail:function(e){
    let id = (e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + id
    })
  }
})