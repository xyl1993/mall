const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const program = express.Router();
const controller = require('./shopping.controller');
const { appVerifyToken } = require('../../../utils/appVerifyToken');


program.post('/shopcar',appVerifyToken,controller.insertShopcar);   //加入购物车

program.delete('/shopcar/:id',appVerifyToken,controller.deleteShopCar);   //删除购物车商品

program.get('/shopcar',appVerifyToken,controller.getShopcarList);   //获取我的购物车
program.put('/shopcar/:id',appVerifyToken,controller.updateShopCar);  

program.post('/collection',appVerifyToken,controller.insertCollection);   //加入收藏
program.get('/collection',appVerifyToken,controller.getCollectionList);   //获取收藏列表
program.delete('/product/:product_id/collection',appVerifyToken,controller.deleteCollection);   //删除收藏
program.get('/product/:product_id/collection',appVerifyToken,controller.getCollection);   //获取收藏详情

router.use('/program', program); 
module.exports = router;