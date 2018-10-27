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
  let _sql = `select a.*,b.nikename,b.city,b.provice,b.country,b.portrait from account_order a left join account b on a.account_id = b.id where 1 = 1`;
  const _countSql = `select count(*) as count from (${_sql}) a`;
  _sql = _sql + ` order by a.create_time desc limit ${start}, ${pageSize}`;
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
  const {allPrice,collect_name,address,phone,productList,chooseId} = req.body;
  // const {specifications_name,number,price} = productList;
  try {
    const orderNumberRows = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,8-1));
    console.log(orderNumberRows);
    _sql = `insert into account_order(account_id,order_number,should_price,
      collect_name,address,phone,create_time,pay_status)
      values(?,?,?,?,?,?,?,?)`;
    const params = [
      account_id,
      new Date().getTime()+''+orderNumberRows,
      allPrice,
      collect_name,
      address,
      phone,
      new Date(),
      1
    ]
    _sql = mysql.format(_sql, params);
    log.info(_sql);
    const orderRows = await pool.query(_sql);   //订单id
    console.log(orderRows);
    //批量新增商品订单表
    let values = [];
    let date = new Date();
    productList.map((item,index)=>{
      values.push([
        orderRows.insertId,
        item.product_id,
        item.name,
        item.number,
        item.current_price,
        date
      ]);
    })
    _sql = `insert into order_goods (order_id,product_id,specifications_name,number,price,create_time) values ?`;
    _sql = mysql.format(_sql, [values]);
    log.info(_sql);
    await pool.query(_sql);
   
    //更新购物车状态
    _sql = `update goods_shopcar set shopcar_status = 2 where id in (${chooseId.replace(/-/g,',')})`;
    log.info(_sql);
    await pool.query(_sql);
    res.status(status.OK).json(orderRows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

/**
 * 小程序获取所有订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getProgramOrderList = async (req, res, next)=> {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const {type} = req.query;
  const {account_id} = req;
  let _sql = `SELECT
                *
              FROM
                (
                  SELECT
                    a.*, GROUP_CONCAT(c.cover) AS cover,
                    count(order_number) AS count
                  FROM
                    account_order a
                  LEFT JOIN order_goods b ON a.id = b.order_id
                  LEFT JOIN product c ON c.id = b.product_id
                  GROUP BY
                    a.order_number
                ) a 
              where account_id = ${account_id}`;
  if(type ==1){
    //带付款
    _sql = _sql + ` and pay_status = 1`
  }else if(type ==2){
    //待发货
    _sql = _sql + ` and collect_status = 1`
  }
  else if(type ==3){
    //待收货
    _sql = _sql + ` and collect_status = 2`
  }
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

getOrderDetail =  async (req, res, next)=> {
  const {order_number} = req.params;  
  try {
    let sql =  `SELECT
                  a.*, 
                  d.nikename,
                  d.city,
                  d.provice,
                  d.country,
                  d.portrait
                FROM
                  account_order a
                LEFT JOIN account d ON d.id = a.account_id
                WHERE
                order_number = ?`;
    let params = [order_number];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    let orderObj = rows[0];
    let productIdArr = [];
 
    sql = `select 
      a.specifications_name,
      a.number,
      a.price,
      a.order_goods_status,
      a.product_id,
      b.title,
      b.cover,
      c.name as brand_name,
      d.name as type_name
      from order_goods a left join product b on a.product_id = b.id 
      left join goods_brand c on c.id = b.brand_id
      left join goods_type d on d.id = b.type_id
      where a.order_id = ${orderObj.id}`;
    const p_rows = await pool.query(sql);
    log.info(sql);
    orderObj.productInfo = p_rows;
    res.status(status.OK).json(orderObj);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

module.exports = {
  getOrderList,
  insertOrder,
  getProgramOrderList,
  getOrderDetail
};
