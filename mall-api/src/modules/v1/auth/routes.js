const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const { appVerifyToken } = require('../../../utils/appVerifyToken');
var express = require('express');
const admin = express.Router();
const web = express.Router();
const program = express.Router();
const controller = require('./auth.controller');
const programController = require('./program.controller');

// admin.post('/user',verifyToken, controller.createUser);   //创建用户
admin.get('/user/auth', controller.webLogin);   //邮箱登陆
admin.put('/user/password', verifyToken,controller.updatePassword);   //修改密码

program.get('/user/auth/:code',programController.programLogin);
program.put('/user/auth',appVerifyToken,programController.updateAccountInfo);

program.get('/user/address',appVerifyToken,programController.getAccountAddressList);   
program.get('/user/address/:id',appVerifyToken,programController.getAccountAddressDetail);   
program.post('/user/address',appVerifyToken,programController.insertAccountAddress);    //新增收货地址
program.put('/user/address/:id',appVerifyToken,programController.updateAccountAddress);    //修改收货地址
program.delete('/user/address/:id',appVerifyToken,programController.deleteAccountAddress);    //删除收货地址


router.use('/admin', admin); //后台接口

router.use('/', web);

router.use('/program', program);  //小程序专用接口
module.exports = router;
