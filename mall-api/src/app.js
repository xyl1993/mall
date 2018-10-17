require('dotenv').config();
var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var ejs = require('ejs');  //我是新引入的ejs插件
const log4js = require('log4js');
var logger = require('./log4js');

const routesV1 = require('./modules/v1');
const config = require('./config/environment');

var app = express();

var createFolder = function(folder){
  try{
      fs.accessSync(folder); 
  }catch(e){
      fs.mkdirSync(folder);
  }  
};

createFolder(config.uploadFolder);

app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url  :status  :response-time ms' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.use('/mall/api/v1', routesV1);

app.use('/mall/upload', express.static(config.uploadRoot))
app.use('/mall-admin', express.static(config.adminUI.root))
app.use('/mall-admin',(req, res)=>{res.sendFile(config.adminUI.index)});

app.use(function(req, res, next) {
  next(createError(404));
});
module.exports = app;
