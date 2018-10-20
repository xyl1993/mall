// pages/detail/detail.js
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js'

const getProductList = function(_this,callback){
  let params = {
    current: _this.data.current,
    pageSize: _this.data.pageSize,
    type_id: _this.data.type_id
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
      if (data.data.length !== 0) {
        productList = productList.concat(data.data);
        _this.setData({
          productList: productList
        })
      } else {
        _this.setData({
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
    type_id:'',
    isHideLoadMore:true,
     stopLoadRefresh:false
  },

  onLoad: function (options) {
    if (options.type_id) this.setData({ type_id: options.type_id });
    this.loadData();
  },
  loadData: function (e) {
    getProductList(this);
  },
  toDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDetail/productDetail?productId=' + id
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    const _this = this;
    if (!this.data.stopLoadRefresh) {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.setData({ isHideLoadMore: true, current: 1, noData: false, stopLoadRefresh: true });
      getProductList(this, function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        setTimeout(() => {
          _this.setData({
            stopLoadRefresh: false
          })
        }, 2500)
      });
    }else{
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  },
  //加载更多
  onReachBottom: function () {
    const _this = this;
    if (!this.data.noData) {
      console.log('加载更多')
      let current = ++this.data.current;
      this.setData({ isHideLoadMore: false, current: current});
      getProductList(this, function () {
        _this.setData({
          isHideLoadMore: true,
        })
      });
    }
  }
})