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
  const result = `<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
  </xml>`;
  res.type('application/xml');
  res.send(result);
  try {
    const { result_code,return_code,out_trade_no,total_fee,attach,transaction_id,openid } = req.body.xml;
    const wxpay_xml = JSON.stringify([req.body.xml]);
    const pay_price = total_fee/100;
    const date = new Date();
    //往支付记录表中插入一条记录 防止回调出错查询
    let sql = `insert into pay_order_info(transaction_id,order_number,out_trade_no,openid,wx_price,pay_price,pay_result,create_time) values(?,?,?,?,?,?,?,?)`;
    let params = [transaction_id,attach,out_trade_no,openid,total_fee,pay_price,wxpay_xml,date];
    sql = mysql.format(sql, params);
    log.info(sql);
    await pool.query(sql);
    if(result_code == 'SUCCESS' && return_code == 'SUCCESS'){
      log.info("try");
      //支付成功
      //查询应支付总价
      sql = `update account_order set pay_status = 2,wxpay_xml=?,pay_time = ?,pay_price=?,out_trade_no=? where order_number = ?`;
      params = [wxpay_xml,date,pay_price,out_trade_no,attach];
      sql = mysql.format(sql, params);
      log.info(sql);
      await pool.query(sql);
      global.websocket.clients.forEach(function (client) {
        client.send(
          JSON.stringify({
            text: '收到一笔订单,点击查看',
            data:attach
          }),
        );
      });
     
    }
  } catch (err) {
    log.error(err);
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

