//index.js
//获取应用实例
import api from '../../utils/api.js';
Page({
  data: {
    current:1,
    pageSize:10,
    productList: [],
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
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.loadData();
  },
  loadData: function (e) {
    let params = {
      current: this.data.current,
      pageSize: this.data.pageSize
    };
    api.get("product", params).then(res => {
      let { data, status } = res;
      if (status === 200){
        let productList = this.data.productList;
        if (data.totalItems == 1) {
          productList = []
        }
        productList = productList.concat(data.data);
        this.setData({ productList: productList})
      }
    });
  },
})