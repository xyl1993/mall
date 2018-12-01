const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("wxpayController");
const mysql = require('mysql');
const config = require('../../../config/environment');
const pool = require('../../../utils/pool');
const programApi = require('../../../utils/programApi');
const updateUsed = require('../tplConfig/tplConfig.controller').updateUsed;
const moment = require('moment');

const payAction = function (req, res, next) {
  log.info(req);
  return res.status(status.OK).json({});
};

module.exports = {
  payAction,
};

