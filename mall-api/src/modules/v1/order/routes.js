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
program.post('/order/pay', appVerifyToken, controller.payOrder);
program.post('/order/payAction', appVerifyToken, controller.payAction);
program.put('/order/:order_number/cancel', appVerifyToken, controller.cancelOrder);
program.get('/order/allInfo', appVerifyToken, controller.getAllOrderInfo);

program.get('/order', appVerifyToken, controller.getProgramOrderList);

program.put('/order/collect/:order_number', appVerifyToken, controller.collectGoods);
// 手机端发货
program.put('/order/deliver/:order_number', appVerifyToken, controller.deliverGoods);
program.delete('/order/:order_number', appVerifyToken, controller.deleteOrder);

// web端发货
admin.put('/order/deliver/:order_number', verifyToken, controller.deliverGoods);

admin.get('/order', verifyToken, controller.getOrderList);
admin.get('/pay/record', verifyToken, controller.getPayRecord);

web.get('/order/:order_number', controller.getOrderDetail);

web.post('/wxpay/pay', wxpayController.payAction);
web.get('/pay/orderquery/:out_trade_no', wxpayController.orderquery);

web.get('/pay/test', controller.testApi);

router.use('/admin', admin);
router.use('/program', program);
router.use('/', web);

module.exports = router;
