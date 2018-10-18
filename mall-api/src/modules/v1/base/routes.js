const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const controller = require('./base.controller');

web.get('/baseInfo/:code', controller.baseInfo);   //上传文件到七牛
web.get('/filePath', controller.filePath);   //获取文件路径

router.use('/', web);  //不需要token验证

module.exports = router;