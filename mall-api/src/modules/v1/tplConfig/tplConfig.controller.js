const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("orderController");
const mysql = require('mysql');
const programApi = require('../../../utils/programApi');
const pool = require('../../../utils/pool')

const insertTplConfig = async (req, res, next)=> {
  try {
    const {account_id,openid} = req;
    const {type,form_id} = req.body;
    let sql = `insert into tpl_config(openid,account_id,type,form_id,create_time,invalid_time) values(?,?,?,?,?,?)`;
    const create_time = new Date();
    var milliseconds=create_time.getTime()+1000*60*60*24*6;
    const invalid_time= new Date(milliseconds);
    let params = [
      openid,
      account_id,
      type,
      form_id,
      create_time,
      invalid_time
    ];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    return {
      code:status.OK,
      data:rows
    }
  } catch(err) {
    log.error(err);
    return {
      code:status.INTERNAL_SERVER_ERROR,
      data:err
    }
  }
};

const insertTpl = async (req, res, next)=> {
  insertTplConfig(req, res, next).then((v) => {
    const {data,code} = v;
    if(code===status.OK){
      res.status(status.OK).json(data.insertId);
    }else{
      return handleError(res, data);
    }
  });
};
const updateUsed = async (id)=> {
  try {
    _sql = `update tpl_config set used = 1 where id = ${id}`;
    await pool.query(_sql);
  } catch(err) {
    log.error(err);
  }
};

/**
 * 获取微信支付签名
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const payAction = async (req, res, next)=> {
  console.log("openid="+req.openid);
  programApi.payAction(req).then((payParamsObj)=>{
    console.log(payParamsObj);
    const { code,data } = payParamsObj;
    if(code===status.OK){
      res.status(status.OK).json(data);
    }else{
      return handleError(res, data);
    }
  })
};
module.exports = {
  insertTpl,
  updateUsed,
  payAction,
  insertTplConfig
};
