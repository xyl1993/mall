const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const controller = require('./common.controller');

admin.post('/uploadQiniu',verifyToken, controller.uploadQiniu);   //上传文件到七牛
admin.post('/uploadDisk',verifyToken, controller.uploadDisk);   //上传文件到本地

router.use('/admin', admin);

router.use('/', web); 
module.exports = router;