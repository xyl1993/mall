const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("goodsController");
const mysql = require('mysql');

const pool = require('../../../utils/pool')

const getOrderList = async (req, res, next)=> {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const {startTime,endTime} = req.query;
  let _sql = `select * from order a left join sys_users b on a.account_id = b.id where 1 = 1`;
  const _countSql = `select count(*) as count from (${_sql}) a`;
  _sql = _sql + ` order by create_time desc limit ${start}, ${pageSize}`;
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    const counts = await pool.query(_countSql);
    res.status(status.OK).json({ data:rows,
      totalItems: counts[0].count
    });
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const insertOrder = async (req, res, next)=> {
  const {account_id,collect_name,address,phone,name,brand,type,number,money} = req.body;
  try {
    let _sql = `insert into order_number`;
    const orderNumber = await pool.query(_sql).insertId;
    _sql = `insert into order(account_id,order_number,collect_name,
      address,phone,name,title,brand,type,number,money,create_time)
      values(?,?,?,?,?,?,?,?,?,?,?,?)`;
    const params = [
      account_id,
      orderNumber,
      collect_name,
      address,
      phone,
      name,
      brand,
      type,
      number,
      money,
      new Date()
    ]
    _sql = mysql.format(_sql, params);
    log.info(_sql);
    const rows = await pool.query(_sql);
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
const Order = async (req, res, next)=> {
  const {account_id,collect_name,address,phone,name,brand,type,number,money} = req.body;
  try {
    let _sql = `insert into order_number`;
    const orderNumber = await pool.query(_sql).insertId;
    _sql = `insert into order(account_id,order_number,collect_name,
      address,phone,name,title,brand,type,number,money,create_time)
      values(?,?,?,?,?,?,?,?,?,?,?,?)`;
    const params = [
      account_id,
      orderNumber,
      collect_name,
      address,
      phone,
      name,
      brand,
      type,
      number,
      money,
      new Date()
    ]
    _sql = mysql.format(_sql, params);
    log.info(_sql);
    const rows = await pool.query(_sql);
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

module.exports = {
  getOrderList,
  insertOrder
};
