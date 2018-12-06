const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("orderController");
const mysql = require('mysql');
const { insertTplConfig } = require("../tplConfig/tplConfig.controller");
const pool = require('../../../utils/pool')


const insertShopcar = async (req, res, next)=> {
  try {
    const {product_id,specifications_id,number,fomrId} = req.body;
    const params = [
      req.account_id,
      product_id,
      specifications_id,
      number,
      new Date()
    ]
    let sql = `insert into goods_shopcar (account_id,product_id,specifications_id,number,create_time) values (?,?,?,?,?)`;
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    insertTplConfig(req, res, next).then((v) => {
      res.status(status.OK).json(rows.insertId);
    });
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const getShopcarList = async (req, res, next)=> {
  try {
    const { account_id } = req;
    const { chooseId } = req.query;
    
    let sql = `select a.id,a.number,a.create_time,b.id as product_id,b.title,b.cover,c.current_price,c.name,c.id as specifications_id
    from goods_shopcar a 
    left join product b on a.product_id = b.id
    left join product_specifications c on a.specifications_id = c.id
    where shopcar_status = 1`;

    if(chooseId){
      let shopcarid = chooseId.replace(/-/g,',');
      sql = sql + ` and a.id in (${shopcarid})`;
    }else{
      sql = sql + ` and a.account_id = ${account_id}`;
    }
    sql = sql + ` order by a.create_time desc`;
    log.info(sql);
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const deleteShopCar = async (req, res, next)=> {
  try {
    let sql = `delete from goods_shopcar where id = ? and account_id=?`;
    let params = [req.params.id,req.account_id];
    sql = mysql.format(sql,params);
    log.info(sql);
    await pool.query(sql);
    res.status(status.OK).json({id:req.params.id});
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
const updateShopCar = async (req, res, next)=> {
  try {
    let sql = `update goods_shopcar set number = ? where id = ? and account_id=?`;
    let params = [req.body.number,req.params.id,req.account_id];
    sql = mysql.format(sql,params);
    await pool.query(sql);
    res.status(status.OK).json({id:req.params.id});
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const getCollectionList = async (req, res, next)=> {
  try {
    const { account_id } = req;
    let sql = `select a.*,b.cover,b.title,d.current_price from collections a 
      left join product b on a.product_id = b.id 
      left join (
        select id,product_id,name,min(current_price) current_price,stock,original_price from product_specifications GROUP BY product_id
      ) d on d.product_id = a.product_id
      where account_id = ?`;
    let params = [account_id];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};


const insertCollection = async (req, res, next)=> {
  try {
    const {account_id} = req;
    const {product_id} = req.body;
    let sql = `insert into collections (account_id,product_id,create_time) values (?,?,?)`;
    let params = [account_id,product_id,new Date()];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const deleteCollection = async (req, res, next)=> {
  try {
    const {account_id} = req;
    const {product_id} = req.params;
    let sql = `delete from collections where product_id = ? and account_id = ?`;
    let params = [product_id,account_id];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const getCollection = async (req, res, next)=> {
  try {
    const {account_id} = req;
    const {product_id} = req.params;
    let sql = `select * from collections where product_id = ? and account_id = ?`;
    let params = [product_id,account_id];
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
  getShopcarList,
  deleteShopCar,
  updateShopCar,
  getCollectionList,
  insertCollection,
  deleteCollection,
  getCollection
};
