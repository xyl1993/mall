const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("goodsController");
const async = require("async");
const mysql = require('mysql');
const config = require('../../../config/environment');
const pool = mysql.createPool(config.mysql);
/**
 * 新增品牌返回id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addBrand = function (req, res, next) {
  const {
    name
  } = req.body;
  let _sql = `insert into goods_brand(name) values(?)`;
  const params = [
    name
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

/**
 * 修改品牌
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.editBrand = function (req, res, next) {
  const id = req.params.id;
  let _sql = `update goods_brand set name=? where id= ?`;
  const params = [
    req.body.name,
    id
  ];
  _sql = mysql.format(_sql, params);
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

/**
 * 删除品牌
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteBrand = function (req, res, next) {
  const id = req.params.id;
  pool.getConnection(function (err, connection) {
    var tasks = [function (callback) {
      // 开启事务
      connection.beginTransaction(function (err) {
        callback(err);
      });
    }, function (callback) {
      //商品商品
      let _sql = `update product set status = 0 where brand_id=${id}`;
      log.info(_sql);
      connection.query(_sql, function (err, rows, result) {
        callback(err);
      });
    }, function (callback) {
      //删除类型
      let _sql = `update goods_type set status = 0 where brand_id=${id}`;
      log.info(_sql);
      connection.query(_sql, function (err, rows, result) {
        callback(err);
      });
    }, function (callback) {
      //删除品牌
      let _sql = `update goods_brand set status = 0 where id=${id}`;
      log.info(_sql);
      connection.query(_sql, function (err, rows, result) {
        callback(err);
      });
    }, function (callback) {
      // 提交事务
      connection.commit(function (err) {
        callback(err);
      });
    }]
    async.waterfall(tasks, function (err) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json('删除成功');
      connection.release();
    });
  })
};

//查询品牌
exports.getBrandList = function (req, res, next) {
  let _sql = `select * from goods_brand where status = 1`;
  _sql = _sql + ` order by id desc`;
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json(rows);
      connection.release();
    });
  })
};


/**
 * 新增类型返回id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addType = function (req, res, next) {
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


/**
 * 修改品类型
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.editType = function (req, res, next) {
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

/**
 * 删除类型
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteType = function (req, res, next) {
  const id = req.params.id;
  pool.getConnection(function (err, connection) {
    var tasks = [function (callback) {
      // 开启事务
      connection.beginTransaction(function (err) {
        callback(err);
      });
    }, function (callback) {
      //删除商品
      let _sql = `update product set status = 0 where type_id=${id}`;
      log.info(_sql);
      connection.query(_sql, function (err, rows, result) {
        callback(err);
      });
    }, function (callback) {
      //删除类型
      let _sql = `update goods_type set status = 0 where id=${id}`;
      log.info(_sql);
      connection.query(_sql, function (err, rows, result) {
        callback(err);
      });
    }, function (callback) {
      // 提交事务
      connection.commit(function (err) {
        callback(err);
      });
    }]
    async.waterfall(tasks, function (err) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json('删除成功');
      connection.release();
    });
  })
};
//查询类型
exports.getTypeList = function (req, res, next) {
  const {
    brand_id
  } = req.query;
  let _sql = `select * from goods_type where status = 1`;
  if (brand_id) _sql = _sql + ` and brand_id = ?`;
  _sql = _sql + ` order by id desc`;
  _sql = mysql.format(_sql, [brand_id]);
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json(rows);
      connection.release();
    });
  })
};
