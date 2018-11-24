const router = require('express').Router();
const express = require('express');
const program = express.Router();
const controller = require('./tplConfig.controller');
const { appVerifyToken } = require('../../../utils/appVerifyToken');


program.post('/tpl',appVerifyToken,controller.insertTpl);   //加入模板id
program.post('/payAction',appVerifyToken,controller.payAction);   //获取支付码


router.use('/program', program); 
module.exports = router;