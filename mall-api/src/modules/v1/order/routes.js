const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const { appVerifyToken } = require('../../../utils/appVerifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const program = express.Router();
const controller = require('./order.controller');

web.get('/order',controller.getOrderList);

program.post('/order',appVerifyToken,controller.insertOrder);

program.get('/order',appVerifyToken,controller.getProgramOrderList);


router.use('/admin', admin); 
router.use('/program', program); 
router.use('/', web); 

module.exports = router;