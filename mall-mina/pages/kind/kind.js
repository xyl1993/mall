//index.js
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js';
const app = getApp();

const getBrandList = function(_this,callback){
  api.get("brand").then(res => {
    let { data, status } = res;
    if (status === 200) {
      if (data && data.length > 0) {
        if (!app.globalData.globalBrandId) {
          _this.setData({ brandId: data[0].id });
          data[0].active = true;
        } else {
          data.map((item, index) => {
            if (item.id === app.globalData.globalBrandId) {
              _this.setData({ brandId: item.id });
              item.active = true;
            }
          })
        }
        _this.setData({
          brandList: data
        });
        _this.loadType(_this.data.brandId);
      }
      if (typeof callback == 'function') callback();
    }
  });
}
Page({
  data: {
    fileIp: Config.file_servier,
    brandId:'',
    typelist:[],
    brandList:[],
  },
  onLoad: function () {
    this.loadBrand();
  },
  loadBrand: function() {
    getBrandList(this);
  },
  loadType: function (brand_id){
    let params = {
      brand_id: brand_id
    };
    api.get("goods-type", params).then(res => {
      let {
        data,
        status
      } = res;
      if (status === 200) {
        this.setData({
          typelist: data
        });
        app.globalData.globalBrandId = brand_id;
      }
    });
  },
  toDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../detail/detail?type_id=${id}`
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    getBrandList(this,function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  tabBrand:function(e){
    let _this = this;
    let brandList = this.data.brandList;
    let id = (e.currentTarget.dataset.id);
    brandList.map((item,index)=>{
      if(item.active && id === item.id){
        return
      }else{
        item.active = false;
        if (id === item.id){
          item.active = true;
          _this.loadType(id);
          return
        }
      }
    });
    this.setData({ brandList: brandList});
  }
})