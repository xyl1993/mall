const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("baseController");
const config = require('../../../config/environment');
/**
 * 获取基础信息
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.baseInfo = function (req, res, next) {
  const code = req.params.code;
  let _sql = `select * from base_data where 1 = 1`;
  if (code) _sql = _sql + ` and code = ${code}`;
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
exports.filePath = function (req, res, next) {
  res.status(status.OK).json({filePath:config.filePath});
};
