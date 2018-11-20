const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("orderController");
const mysql = require('mysql');
const programApi = require('../../../utils/programApi');
const pool = require('../../../utils/pool')

const insertTpl = async (req, res, next)=> {
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
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
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
  programApi.payAction(req,req.openid).then((payParamsObj)=>{
    if(payParamsObj !== 500){
      res.status(status.OK).json(payParamsObj);
    }
  })
};
module.exports = {
  insertTpl,
  updateUsed,
  payAction
};
