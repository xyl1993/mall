const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("goodsController");
const mysql = require('mysql');

const pool = require('../../../utils/pool')

const deleteCarousel = async (req, res, next)=> {
  const { url } = req.params;
  let _sql = `delete from carousel where url like '${url}%'`;
  log.info(_sql);
  try {
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const editCarousel = async (req, res, next)=> {
  const { id } = req.params;
  const { url } = req.body;
  let _sql = `update carousel set url=? where id = ?`;
  let params = [url,id];
  _sql = mysql.format(_sql,params);
  log.info(_sql);
  try {
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const addCarousel = async (req, res, next)=> {
  const { url } = req.body;
  let _sql = `insert into carousel (url) values (?)`;
  let params = [url];
  _sql = mysql.format(_sql,params);
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};


const carouselList = async (req, res, next)=> {
  let _sql = `select * from carousel order by id desc`;
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};


module.exports = {
  deleteCarousel,
  editCarousel,
  addCarousel,
  carouselList
};
