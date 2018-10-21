const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const program = express.Router();
const controller = require('./order.controller');

web.get('/order',controller.getOrderList);
web.post('/order',controller.insertOrder);


router.use('/admin', admin); 

router.use('/', web); 

module.exports = router;