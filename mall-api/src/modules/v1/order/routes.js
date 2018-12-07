const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const { appVerifyToken } = require('../../../utils/appVerifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const program = express.Router();
const controller = require('./order.controller');
const wxpayController = require('./wxpay.controller');

program.post('/order', appVerifyToken, controller.insertOrder);
program.post('/order/pay', appVerifyToken, controller.payOrder);                      //小程序下单 获取支付签名
program.post('/order/payAction', appVerifyToken, controller.payAction);             //小程序发起支付
program.put('/order/:order_number/cancel', appVerifyToken, controller.cancelOrder);                 //小程序取消订单
program.get('/order/allInfo', appVerifyToken, controller.getAllOrderInfo);                //小程序获取所有订单

program.get('/order', appVerifyToken, controller.getProgramOrderList);                     //小程序获取订单列表

program.put('/order/collect/:order_number', appVerifyToken, controller.collectGoods);  //确认收货
// 手机端发货
program.put('/order/deliver/:order_number', appVerifyToken, controller.deliverGoods);
program.delete('/order/:order_number', appVerifyToken, controller.deleteOrder);               //小程序删除订单

// web端发货
admin.put('/order/deliver/:order_number', verifyToken, controller.deliverGoods);

admin.get('/order', verifyToken, controller.getOrderList);                      //电脑端获取支付列表
admin.get('/pay/record', verifyToken, controller.getPayRecord);                      //电脑端获取支付记录

web.get('/order/:order_number', controller.getOrderDetail);                      //电脑端获取订单详情

web.post('/wxpay/pay', wxpayController.payAction);                        //支付成功后微信回调接口
web.get('/pay/orderquery/:out_trade_no', wxpayController.orderquery);       //查询交易记录

web.get('/pay/test', controller.testApi);          //支付测试

router.use('/admin', admin);
router.use('/program', program);
router.use('/', web);

module.exports = router;
