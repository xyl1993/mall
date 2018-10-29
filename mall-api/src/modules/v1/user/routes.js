const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const program = express.Router();
const controller = require('./user.controller');
const { appVerifyToken } = require('../../../utils/appVerifyToken');


admin.get('/user/program',verifyToken,controller.getProgramUserList);  //获取小程序用户列表
admin.put('/user/program/:id/is_admin',verifyToken,controller.updateProgramUserAdmin); //更新小程序用户角色

program.get('/user',appVerifyToken,controller.getProgramUserInfo); //查询用户信息

router.use('/admin', admin); 
router.use('/program', program); 
module.exports = router;