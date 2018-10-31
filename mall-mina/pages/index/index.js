//index.js
//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js'
//获取应用实例
const app = getApp();
const getBrandList = function (_this, callback){
  let params = {
    current: _this.data.current,
    pageSize: _this.data.pageSize,
    recommendStatus: 1
  };
  api.get("product", params).then(res => {
    let {
      data,
      status
    } = res;
    if (status === 200) {
      let productList = _this.data.productList;
      if (_this.data.current == 1) {
        productList = []
      }
      if(data.data.length !== 0){
        productList = productList.concat(data.data);
        _this.setData({
          productList: productList
        })
      }else{
        _this.setData({
          productList: productList,
          noData: true
        })
      }
      if (typeof callback == 'function') callback();
    }
  });
}
Page({
  data: {
    current: 1,
    pageSize: 10,
    fileIp: Config.file_servier,
    productList: [],
    carouselList: [],
    brandList: [],
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    isHideLoadMore:true,
    noData:false
  },
  onLoad: function() {
    this.loadCarousel();
    this.loadBrand();
    this.loadData();

    
  },
  loadCarousel: function() {
    api.get("carousel").then(res => {
      let {
        data,
        status
      } = res;
      if (status === 200) {
        this.setData({
          carouselList: data
        });
      }
    });
  },
  loadBrand: function() {
    api.get("brand").then(res => {
      let {
        data,
        status
      } = res;
      if (status === 200) {
        this.setData({
          brandList: data
        });
      }
    });
  },
  loadData: function(e) {
    getBrandList(this);
  },
  detail: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDetail/productDetail?productId=' + id
    })
  },
  brandDetail:function(e){
    let id = e.currentTarget.dataset.id;
    app.globalData.globalBrandId = id;
    wx.switchTab({
      url: '../kind/kind',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    })
  },
  //下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadBrand();
    this.setData({ isHideLoadMore: true, current: 1,noData:false });
    getBrandList(this,function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
  },
  //加载更多
  onReachBottom: function() {
    const _this = this;
    if (!this.data.noData){
      let current = ++this.data.current;
      this.setData({ isHideLoadMore: false, current: current });
      getBrandList(this, function () {
        _this.setData({
          isHideLoadMore: true,
        })
      });
    }
  },
  search:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  toroductList:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})