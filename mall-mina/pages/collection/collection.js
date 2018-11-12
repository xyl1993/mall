import api from '../../utils/api.js';
import { Config } from '../../config/index.js';
import { ButtonClicked } from '../../utils/esUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:[],
    delBtnWidth:140,
    fileIp: Config.file_servier,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
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
  },
  touchS:function(e){
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.collectionList;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        collectionList: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.collectionList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        collectionList: list
      });
    }
  },
  delCollect:function(e){
    let product_id = e.currentTarget.dataset.product_id;
    let index = e.currentTarget.dataset.index;
    let collectionList = this.data.collectionList;
    api.delete(`program/product/${product_id}/collection`).then(res => {
      const { data, status } = res;
      if (status === 200) {
        collectionList.splice(index,1);
      }
      this.setData({ collectionList: collectionList})
    });
  }
})