const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const { appVerifyToken } = require('../../../utils/appVerifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const program = express.Router();
const controller = require('./order.controller');

program.post('/order',appVerifyToken,controller.insertOrder);
program.post('/order/pay',appVerifyToken,controller.payOrder);
program.post('/order/payAction',appVerifyToken,controller.payAction);
program.put('/order/:order_number/cancel',appVerifyToken,controller.cancelOrder);
program.get('/order/allInfo',appVerifyToken,controller.getAllOrderInfo);


program.get('/order',appVerifyToken,controller.getProgramOrderList);

program.put('/order/collect/:order_number',appVerifyToken,controller.collectGoods);
program.put('/order/deliver/:order_number',appVerifyToken,controller.deliverGoods);
program.delete('/order/:order_number',appVerifyToken,controller.deleteOrder);



admin.get('/order',verifyToken,controller.getOrderList);
admin.get('/pay/record',verifyToken,controller.getPayRecord);
web.get('/order/:order_number',controller.getOrderDetail);


router.use('/admin', admin); 
router.use('/program', program); 
router.use('/', web); 

module.exports = router;