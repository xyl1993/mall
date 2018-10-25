//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js';
const sumPrice = function (item) {
  let allPrice = 0;
  item.map((item, index) => {
    allPrice = allPrice + item.current_price * item.number;
  })
  console.log(allPrice);
  return allPrice;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    address:[],
    allPrice: 0.00,
    fileIp: Config.file_servier,
    chooseId:''
  },

  onLoad: function (options) {
    if (options.chooseId) {
      this.setData({ chooseId: options.chooseId });
      this.getShopcarList();
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  getShopcarList: function () {
    api.get("program/shopcar", { chooseId: this.data.chooseId}).then(res => {
      let { data, status } = res;
      if (status === 200) {
        let allPrice = sumPrice(data);
        this.setData({ productList: data, allPrice: allPrice})
      }
    });
  },

  getAddress:function(){
    api.get(`program/user/address`, { address_status:1}).then(res => {
      const { data, status } = res;
      if (status === 200) {
        this.setData({ address: data });
      }
    });
  },

  replay:function(){
    let productList = this.data.productList;
    let allPrice = this.data.allPrice;
  }
})