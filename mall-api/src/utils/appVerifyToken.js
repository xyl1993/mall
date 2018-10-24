const jwt = require('jsonwebtoken');
const status = require('http-status');
const config = require('../config/environment');
function handleError(res) {
  return res.status(status.FORBIDDEN).json('授权失败');
}

exports.appVerifyToken = function (req, res, next) {
  const { sessionid } = req.headers;
  if (sessionid) {
    jwt.verify(sessionid, config.AppjwtEncryption, function (jwtErr, decoded) {
      if (jwtErr) return handleError(res);
      req.openid = decoded.openid;
      req.session_key = decoded.session_key;
      req.account_id = decoded.account_id
      next();
    });
  } else {
    return handleError(res);
  }
};
