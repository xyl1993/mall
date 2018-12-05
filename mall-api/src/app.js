require('dotenv').config();
const fs = require('fs');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
// var ejs = require('ejs');  //我是新引入的ejs插件
const log4js = require('log4js');
const logger = require('./log4js');

const routesV1 = require('./modules/v1');
const config = require('./config/environment');
const app = express();

const createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

const expressWs = require('express-ws')(app);

app.ws(config.wsUri, function (ws, req) {});

global.websocket = expressWs.getWss('/mall/websocket');

createFolder(config.uploadFolder);

app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url  :status  :response-time ms' }));
// 解决微信支付通知回调数据
app.use(bodyParser.xml({
  limit: '2MB',   // Reject payload bigger than 1 MB
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes
    normalizeTags: true, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/mall/api/v1', routesV1);

app.use('/mall/upload', express.static(config.uploadRoot));
app.use('/mall-admin', express.static(config.adminUI.root));
app.use('/mall-admin', (req, res) => {
  res.sendFile(config.adminUI.index);
});

app.use(function (req, res, next) {
  next(createError(404));
});




module.exports = app;
