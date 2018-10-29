
//index.js
//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js'

const getProgramOrderList = function (_this, callback) {
  let params = {
    current: _this.data.current,
    pageSize: _this.data.pageSize,
    type: _this.data.type
  };
  api.get("program/order", params).then(res => {
    let {data,status} = res;
    if (status === 200) {
      let orderList = _this.data.orderList;
      if (_this.data.current == 1) {
        orderList = []
      }
      let result = data.data;
      if (result.length !== 0) {
        result.map((item,index)=>{
          if (item.cover){
            item.cover = item.cover.split(',');
          }
        })
        orderList = orderList.concat(result);
        _this.setData({
          orderList: orderList
        })
      } else {
        _this.setData({
          orderList: orderList,
          noData: true
        })
      }
      if (typeof callback == 'function') callback();
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    isAdmin:0,
    pageSize: 10,
    fileIp: Config.file_servier,
    type:0,
    orderList:[],
    isHideLoadMore: true,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type);
    if (options.type) this.setData({ type: options.type });
    getProgramOrderList(this);
    this.getUserRole();
  },
  getUserRole: function () {
    api.get("program/user").then(res => {
      let {
        data,
        status
      } = res;
      if (status === 200) {
        console.log(data);
        this.setData({
          isAdmin: data.is_admin
        });
      }
    });
  },
  //删除订单
  deleteOrder:function(e){
    let order_number = e.currentTarget.dataset.order_number;
    api.delete("program/order/${order_number}").then(res => {
      let {
        data,
        status
      } = res;
      if (status === 200) {
        this.setData({ isHideLoadMore: true, current: 1, noData: false });
        getProgramOrderList(this);
      }
    });
  },
  //收货
  collectGoods:function(e){
    let order_number = e.currentTarget.dataset.order_number;
    api.put("program/collect/${order_number}").then(res => {
      let {
        data,
        status
      } = res;
      if (status === 200) {
        this.setData({ isHideLoadMore: true, current: 1, noData: false });
        getProgramOrderList(this);
      }
    });
  },
  //发货
  deliverGoods: function (e) {
    let order_number = e.currentTarget.dataset.order_number;
    wx.navigateTo({
      url: `../orderRecordDetail/orderRecordDetail?order_number=${order_number}&status=deliver` 
    })
  },
  choseType:function(e){
    let _this = this;
    let type = e.currentTarget.dataset.type;
    if (type == 0) {
      this.setData({ type: type })
    }else if(type==1){
      this.setData({type:type})
    }else if(type ==2){
      this.setData({ type: type })
    }else{
      this.setData({ type: type })
    }
    this.setData({ isHideLoadMore: true, current: 1, noData: false });
    getProgramOrderList(this, function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({ isHideLoadMore: true, current: 1, noData: false });
    getProgramOrderList(this, function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
  },
  //加载更多
  onReachBottom: function () {
    const _this = this;
    if (!this.data.noData) {
      let current = ++this.data.current;
      this.setData({ isHideLoadMore: false, current: current });
      getProgramOrderList(this, function () {
        _this.setData({
          isHideLoadMore: true,
        })
      });
    }
  },
  toOrderDetail:function(e){
    let order_number = e.currentTarget.dataset.order_number;
    wx.navigateTo({
      url: '../orderRecordDetail/orderRecordDetail?order_number=' + order_number
    })
  }
})