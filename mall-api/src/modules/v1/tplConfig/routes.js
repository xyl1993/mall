const router = require('express').Router();
const express = require('express');
const program = express.Router();
const controller = require('./tplConfig.controller');
const { appVerifyToken } = require('../../../utils/appVerifyToken');


program.post('/tpl',appVerifyToken,controller.insertTpl);   //加入模板id

router.use('/program', program); 
module.exports = router;