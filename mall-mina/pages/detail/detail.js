// pages/detail/detail.js
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js'

const getProductList = function(_this,callback){
  let params = {
    current: _this.data.current,
    pageSize: _this.data.pageSize,
    type_id: _this.data.type_id,
    search: _this.data.search,
    sort_type: _this.data.sortType.type,
    sort_des: _this.data.sortType.value,
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
      } else {
        _this.setData({
          noData: true
        })
      }
      _this.setData({
        productList: productList
      })
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
    sortType:{
      type:1,      //1综合 2价格  3销量  4日期
      value:1     //1正序   2倒叙
    },
    type_id:'',
    isHideLoadMore:true,
    stopLoadRefresh:false,
    search:''
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
      let current = ++this.data.current;
      this.setData({ isHideLoadMore: false, current: current});
      getProductList(this, function () {
        _this.setData({
          isHideLoadMore: true,
        })
      });
    }
  },
  searchList:function(e){
    this.setData({ search: e.detail.value, current: 1});
    getProductList(this);
  },
  sortFunc:function(e){
    let type = Number(e.currentTarget.dataset.type);
    let sortType = this.data.sortType
    if (sortType.type!==type){
      sortType.type = type;
      sortType.value = 1;
    }else{
      if (sortType.value === 1) {
        sortType.value = 2
      } else if (sortType.value === 2){
        sortType.value = 1;
      }
    }
    this.setData({ sortType: sortType, current: 1 });
    getProductList(this);
  }
})