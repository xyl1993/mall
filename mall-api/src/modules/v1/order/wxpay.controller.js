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
  log.info("请求进来了");
  log.info(req.body);
  return res.status(status.OK).json({});
};

const orderquery = function (req, res, next) {
  log.info("请求进来了");
  
  try {
    const { out_trade_no } = req.params; 
    console.log(out_trade_no);
    //获取支付签名
    programApi.orderquery(out_trade_no).then((payParamsObj)=>{
      const { code,data } = payParamsObj;
      if(code===status.OK){
        const resultData = programApi.getPayParams(data.prepayId,data.tradeId);
        console.log("====================");
        console.log(resultData);
        res.status(status.OK).json(resultData);
      }else{
        return handleError(res, data);
      }
    })
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }

};

module.exports = {
  payAction,
  orderquery
};

