const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const productController = require('./product.controller');
const goodsController = require('./goods.controller');

admin.post('/product',verifyToken, productController.addProduct);   //新增商品
admin.put('/product/:id',verifyToken, productController.editProduct);   //修改商品
admin.delete('/product/:id',verifyToken, productController.deleteProduct);   //删除商品
admin.delete('/specifications/:id',verifyToken, productController.deleteSpecifications);   //删除规格

admin.put('/product/:id/updateRecommend',verifyToken, productController.updateRecommend);   //更新推荐状态

admin.post('/brand',verifyToken, goodsController.addBrand);   //新增品牌
admin.put('/brand/:id',verifyToken, goodsController.editBrand);   //修改品牌
admin.delete('/brand/:id',verifyToken, goodsController.deleteBrand);   //删除品牌
web.get('/brand',goodsController.getBrandList)  //获取商品列表

admin.post('/goods-type',verifyToken, goodsController.addType);   //新增类型
admin.put('/goods-type/:id',verifyToken, goodsController.editType);   //修改类型
admin.delete('/goods-type/:id',verifyToken, goodsController.deleteType);   //删除类型
web.get('/goods-type',goodsController.getTypeList)  //获取类型列表

router.use('/admin', admin); 

web.put('/product/:id/read_number',productController.updatereadNumber);   //更新浏览次数
web.get('/product',productController.getProductList)  //获取商品列表
web.get('/product/:id', productController.getProductDetail);   //后台获取商品详情

router.use('/', web);  

module.exports = router;