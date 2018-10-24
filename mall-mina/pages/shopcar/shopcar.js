//获取应用实例
import api from '../../utils/api.js';
import {
  Config
} from '../../config/index.js'
const sumPrice = function(item){
  let allPrice = 0;
  let allNum = 0;
  item.map((item,index)=>{
    if (item.checked){
      allPrice = allPrice + item.current_price * item.number;
      allNum++;
    }
  })
  return {
    allNum,
    allPrice
  };
}

Page({

  data: {
    allChecked: false,
    editStatus: false,
    fileIp: Config.file_servier,
    carList: [],
    allPrice:0.00,
    allNum:0
  },

  onShow:function(){
    this.getShopcarList();
  },
  onHide:function(){
    this.setData({
      allChecked: false,
      editStatus: false,
      carList: [],
      allPrice: 0.00,
      allNum:0
    })
  },
  getShopcarList: function() {
    api.get("program/shopcar").then(res => {
      let { data,status} = res;
      if (status === 200) {
        this.setData({ carList:data})
      }
    });
  },
  editHandle:function(){
    this.setData({ editStatus: true })
  },
  cancelHandle(){
    this.setData({ editStatus:false})
  },
  chooseItem(e){
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let carList = this.data.carList;
    let allChecked = true;
    if(item.checked){
      item.checked = false;
      allChecked = false;
      carList[index] = item;
    }else{
      item.checked = true;
      carList[index] = item;
      carList.map((item,index)=>{
        if (!item.checked){
          allChecked = false;
          return;
        }
      })
    }
    let allPrice = sumPrice(carList).allPrice;
    let allNum = sumPrice(carList).allNum;
    this.setData({ carList: carList, allChecked: allChecked, allPrice: allPrice, allNum: allNum})
  },
  checkedAll(){
    let allChecked = this.data.allChecked;
    let carList = this.data.carList;
    allChecked = !allChecked;
    carList.map((item, index) => {
      item.checked = allChecked
    });
    let allPrice = sumPrice(carList).allPrice;
    let allNum = sumPrice(carList).allNum;
    this.setData({ carList: carList, allChecked: allChecked, allPrice: allPrice, allNum: allNum})
  },
  deleteProduct(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let carList = this.data.carList;
    api.delete(`program/shopcar/${id}`).then(res => {
      let { data, status } = res;
      if (status === 200) {
        carList.splice(index,1);
        let allPrice = sumPrice(carList).allPrice;
        let allNum = sumPrice(carList).allNum;
        this.setData({ carList: carList, allPrice: allPrice, allNum: allNum});
      }
    });
  },
  reduce(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let carList = this.data.carList;
    if (item.number > 1) {
      item.number = item.number - 1;
      carList[index] = item;
      api.put(`program/shopcar/${item.id}`, { number: item.number}).then(res => {
        let { data, status } = res;
        if (status === 200) {
          if (item.checked){
            let allPrice = sumPrice(carList).allPrice;
            let allNum = sumPrice(carList).allNum;
            this.setData({ carList: carList, allPrice: allPrice, allNum: allNum });
          }else{
            this.setData({ carList: carList});
          }
        }
      });
    }
  },
  add(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let carList = this.data.carList;
    item.number++;
    api.put(`program/shopcar/${item.id}`, { number: item.number }).then(res => {
      let { data, status } = res;
      if (status === 200) {
        carList[index] = item;
        if (item.checked){
          let allPrice = sumPrice(carList).allPrice;
          let allNum = sumPrice(carList).allNum;
          this.setData({ carList: carList, allPrice: allPrice, allNum: allNum });
        }else{
          this.setData({ carList: carList});
        }
      }
    });
  },
})