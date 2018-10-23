const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("orderController");
const mysql = require('mysql');

const pool = require('../../../utils/pool')


const insertShopcar = async (req, res, next)=> {
  try {
    const {product_id,specifications_id,number} = req.body;
    const params = [
      req.openid,
      product_id,
      specifications_id,
      number,
      new Date()
    ]
    let sql = `insert into goods_shopcar (openid,product_id,specifications_id,number,create_time) values (?,?,?,?,?)`;
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const getShopcarList = async (req, res, next)=> {
  try {
    let sql = `select a.*,b.title,b.cover,c.current_price,c.name
    from goods_shopcar a 
    left join product b on a.product_id = b.id
    left join product_specifications c on a.specifications_id = c.id
    where openid = ? and shopcar_status = 1`;
    let params = [req.openid];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};


module.exports = {
  insertShopcar,
  getShopcarList
};
