const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const mysql = require('mysql');
const config = require('../../../config/environment');
const log = require('log4js').getLogger("productController");
const pool = mysql.createPool(config.mysql);
const async = require("async");


exports.getProductList = function (req, res, next) {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const search = req.query.search;
  let _sql = `select * from product where 1 = 1`;
  if (search) _sql = _sql + ` and title like '%${search}%'`;
  const _countSql = `select count(*) as count from (${_sql}) a`;
  _sql = _sql + ` order by create_time desc limit ${start}, ${pageSize}`;
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      connection.query(_countSql, function (err, counts) {
        if (err) {
          log.error(err);
          return handleError(res, err);
        }
        res.status(status.OK).json({ data:rows,
          totalItems: counts[0].count
        });
      });
      connection.release();
    });
  })
};

exports.addProduct = function (req, res, next) {
  const body = req.body;
  let _sql = `insert into product(title,original_price,current_price,stock,classification,carousel,detail,read_number,create_time,create_id)
    values(?,?,?,?,?,?,?,?,?,?)`;
  const params = [
    body.title,
    body.original_price,
    body.current_price,
    body.stock,
    body.classification,
    body.carousel,
    body.detail,
    body.read_number,
    new Date(),
    req.userId
  ]
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json(rows.insertId);
      connection.release();
    });
  })
};

exports.deleteProduct = function (req, res, next) {
  const productId = req.params.id;
  let _sql = `delete from product where id=${productId}`;
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json('删除成功');
      connection.release();
    });
  })
};
exports.getProductDetail = function(req, res, next){
  const productId = req.params.id;
  let _sql = `select * from product where id=${productId}`;
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      if(rows && rows.length>0){
        res.status(status.OK).json({...rows[0],filePath:config.filePath});
      }else{
        res.status(status.GONE).json('资源不存在');
      }
      connection.release();
    });
  })
};
exports.editProduct = function(req, res, next){
  const productId = req.params.id;
  let _sql = `update product set title=?,original_price=?,current_price=?,stock=?,classification=?,carousel=?,detail=?,modify_time=? where id= ?`;
  const params = [
    req.body.title,
    req.body.original_price,
    req.body.current_price,
    req.body.stock,
    req.body.classification,
    req.body.carousel,
    req.body.detail,
    new Date(),
    productId
  ];
  _sql = mysql.format(_sql,params);
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json('操作成功');
      connection.release();
    });
  })
}