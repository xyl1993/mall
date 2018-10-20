const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("goodsController");
const async = require("async");
const mysql = require('mysql');

const pool = require('../../../utils/pool')
/**
 * 新增品牌返回id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addBrand = async (req, res, next)=> {
  const { name,cover } = req.body;
  let _sql = `insert into goods_brand(name,cover) values(?,?)`;
  const params = [
    name,
    cover
  ]
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

/**
 * 修改品牌
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const editBrand = async (req, res, next)=> {
  const id = req.params.id;
  const{name,cover} = req.body;
  let _sql = `update goods_brand set name=?,cover=? where id= ?`;
  const params = [
    name,
    cover,
    id
  ];
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  try {
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
}

/**
 * 删除品牌
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteBrand = async (req, res, next)=> {
  const id = req.params.id;
  try {
    let _sql = `delete from product where brand_id=${id}`;
    log.info(_sql);
    await pool.query(_sql);
    _sql = `delete from goods_type where brand_id=${id}`;
    log.info(_sql);
    await pool.query(_sql);
    _sql = `delete from goods_type where brand_id=${id}`;
    log.info(_sql);
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

//查询品牌
const getBrandList = async (req, res, next)=> {
  let _sql = `select * from goods_brand`;
  _sql = _sql + ` order by id desc`;
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};


/**
 * 新增类型返回id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addType = async (req, res, next) =>{
  const {
    brand_id,
    name,
    cover
  } = req.body;
  let _sql = `insert into goods_type(brand_id,name,cover) values(?,?,?)`;
  const params = [
    brand_id,
    name,
    cover
  ]
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};


/**
 * 修改品类型
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const editType = async (req, res, next)=> {
  const id = req.params.id;
  const {
    brand_id,
    name,
    cover
  } = req.body;
  let _sql = `update goods_type set brand_id=?,name=?,cover=? where id= ?`;
  const params = [
    brand_id,
    name,
    cover,
    id
  ];
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  try {
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
}

/**
 * 删除类型
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteType = async (req, res, next)=> {
  const id = req.params.id;
  try {
    let _sql = `delete from product where type_id=${id}`;
    log.info(_sql);
    await pool.query(_sql);
    _sql = `delete from goods_type where id=${id}`;
    log.info(_sql);
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
//查询类型
const getTypeList = async (req, res, next)=> {
  const {
    brand_id
  } = req.query;
  let _sql = `select * from goods_type where 1 = 1`;
  if (brand_id) _sql = _sql + ` and brand_id = ?`;
  _sql = _sql + ` order by id desc`;
  _sql = mysql.format(_sql, [brand_id]);
  log.debug(_sql);
  try {
    const rows = await pool.query(_sql);
    log.debug(_sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};




module.exports = {
  addBrand,
  editBrand,
  deleteBrand,
  getBrandList,
  addType,
  editType,
  deleteType,
  getTypeList,
};
