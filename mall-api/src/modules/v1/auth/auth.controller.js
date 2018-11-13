const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const mysql = require('mysql');
const config = require('../../../config/environment');
const log = require('log4js').getLogger("authController");
const bcrypt = require('bcryptjs'); //加密对象
const jwt = require('jsonwebtoken');
const pool = require('../../../utils/pool');


const loginSuccess = async (res, user) => {
  // 签发 Token
  const token = jwt.sign({
    userId: user.id
  }, config.jwtEncryption);
  res.status(status.OK).json({ ...user,
    token: token,
    filePath: config.filePath
  });

  let updateLoginTime = `update sys_users set login_time = ? where id=?`;
  let params = [
    new Date(),
    user.id
  ];
  updateLoginTime = mysql.format(updateLoginTime, params);
  log.info(updateLoginTime);
  await pool.query(updateLoginTime);
}

const webLogin = async (req, res, next) => {
  let _sql = `select * from sys_users where account = ?`;
  let params = [req.query.account];
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    if (rows.length > 0) {
      const user = rows[0];
      if (user.account === 'admin' && user.password === req.query.password) {
        loginSuccess(res, user);
      } else {
        bcrypt.compare(req.query.password, user.password, function (error, valid) {
          if (valid === true) {
            loginSuccess(res, user);
          } else {
            res.status(status.UNAUTHORIZED).json('密码错误');
          }
        })
      }
    } else {
      res.status(status.UNAUTHORIZED).json('用户不存在');
    }
  } catch (err) {
    log.error(err);
    return handleError(res, err);
  }
};

const updatePassword = async (req, res, next)=>{
  let _sql = `update sys_users set password = ? where id = ?`;
  let params = [
    req.body.password,
    req.userId
  ]
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  try {
    await pool.query(_sql);
    res.status(status.OK).json('修改成功');
  } catch (err) {
    log.error(err);
    return handleError(res, err);
  }
};


module.exports = {
  webLogin,
  updatePassword
};