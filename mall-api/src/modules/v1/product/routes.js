const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const controller = require('./product.controller');


admin.post('/product',verifyToken, controller.addProduct);   //新增商品
admin.put('/product/:id',verifyToken, controller.editProduct);   //修改商品
admin.delete('/product/:id',verifyToken, controller.deleteProduct);   //删除商品

router.use('/admin', admin); //后台接口(需要token验证)

web.get('/product',controller.getProductList)  //获取商品列表
web.get('/product/:id',verifyToken, controller.getProductDetail);   //后台获取商品详情
router.use('/', web);  //小程序接口

module.exports = router;