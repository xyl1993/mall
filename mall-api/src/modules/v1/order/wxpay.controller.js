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

const payAction = async (req, res, next) => {
  log.info("请求进来了");
  log.info(req.body.xml);
  const { result_code,return_code,out_trade_no,total_fee } = req.body.xml;
  console.log(result_code == 'SUCCESS' && return_code == 'success');
  if(result_code == 'SUCCESS' && return_code == 'success'){
    log.info("try");
    //支付成功
    try {
      const wxpay_xml = JSON.stringify([req.body.xml]);
      //查询应支付总价
      let sql = `update account_order set wxpay_xml = ? and pay_price = ? where out_trade_no = ?`;
      let params = [wxpay_xml,total_fee/100,out_trade_no];
      sql = mysql.format(sql, params);
      log.info(sql);
      await pool.query(sql);
      global.websocket.clients.forEach(function (client) {
        client.send(
          JSON.stringify({
            text: '收到一笔订单,点击查看'
          }),
        );
      });
      const result = `<xml>
        <return_code><![CDATA[SUCCESS]]></return_code>
        <return_msg><![CDATA[OK]]></return_msg>
      </xml>`;
      res.type('application/xml');
      res.send(result);
    } catch (err) {
      log.error(err);
    }
  }
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

