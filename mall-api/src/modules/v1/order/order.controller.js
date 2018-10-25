const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("orderController");
const mysql = require('mysql');

const pool = require('../../../utils/pool')

/**
 * 后台获取所有订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getOrderList = async (req, res, next)=> {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const {startTime,endTime} = req.query;
  let _sql = `select * from order a left join account b on a.account_id = b.id where 1 = 1`;
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

/**
 * 小程序用 生成订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const insertOrder = async (req, res, next)=> {
  const { account_id } = req;
  const {allPrice,collect_name,address,phone,productList} = req.body;
  // const {specifications_name,number,price} = productList;
  try {
    let _sql = `insert into order_number`;
    const orderNumber = await pool.query(_sql).insertId;
    _sql = `insert into order(account_id,order_number,should_price,
      collect_name,address,phone,create_time)
      values(?,?,?,?,?,?,?)`;
    const params = [
      account_id,
      orderNumber,
      allPrice,
      collect_name,
      address,
      phone,
      new Date()
    ]
    _sql = mysql.format(_sql, params);
    log.info(_sql);
    const orderId = await pool.query(_sql).insertId;   //订单id

    //批量新增商品订单表
    let values = [];
    let date = new Date();
    productList.map((item,index)=>{
      values.push([
        orderId,
        item.product_id,
        item.specifications_name,
        item.number,
        item.price,
        date
      ])
    })
    _sql = `insert into order_goods (order_id,product_id,specifications_name,number,price,create_time) values ?`;
    _sql = mysql.format(_sql, [values]);
    await pool.query(_sql);

    res.status(status.OK).json(orderId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

module.exports = {
  getOrderList,
  insertOrder
};
