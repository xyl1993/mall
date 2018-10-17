const status = require('http-status');
const { handleError } = require('../../../utils/handleUtilFun');
const mysql = require('mysql');
const config = require('../../../config/environment');
const log = require('log4js').getLogger("authController");
const bcrypt = require('bcryptjs');  //加密对象
const pool = mysql.createPool(config.mysql);
const jwt = require('jsonwebtoken');
const loginSuccess = function(res,user,connection){
  // 签发 Token
  const token = jwt.sign({ userId: user.id }, config.jwtEncryption);
  res.status(status.OK).json({ ...user, token: token });

  let updateLoginTime = `update sys_users set login_time = ? where id=?`;
  let params = [
    new Date(),
    user.id
  ];
  updateLoginTime = mysql.format(updateLoginTime, params);
  log.info(updateLoginTime);
  connection.query(updateLoginTime, function (err, rows, result) {

  });
}

exports.webLogin = function(req, res, next) {
  let _sql = `select * from sys_users where account = ?`;
  let params = [req.query.account];
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows, result) {
      if (err) {
        log.error(err);
        return handleError(res,err);
      } else {
        if (rows.length > 0) {
          const user = rows[0];
          if(user.account==='admin' && user.password === req.query.password){
            loginSuccess(res,user,connection);
          }else{
            bcrypt.compare(req.query.password, user.password, function (error, valid) {
              if (valid === true) {
                loginSuccess(res,user,connection);
              } else {
                res.status(status.UNAUTHORIZED).json('密码错误');
              }
            })
          }
        } else {
          res.status(status.UNAUTHORIZED).json('用户不存在');
        }
      }
      connection.release();
    });
  });
};

exports.updatePassword = function(req, res, next) {
  let _sql = `update sys_users set password = ? where id = ?`;
  let params = [
    req.body.password,
    req.userId
  ]
  _sql = mysql.format(_sql,params);
  log.info(_sql);
  pool.getConnection(function (err, connection) {
    connection.query(_sql, function (err, rows) {
      if (err) {
        log.error(err);
        return handleError(res, err);
      }
      res.status(status.OK).json('修改成功');
      connection.release();
    });
  })

};

exports.createUser = function(req, res, next) {};