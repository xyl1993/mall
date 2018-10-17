const jwt = require('jsonwebtoken');
const status = require('http-status');
const config = require('../config/environment');
function handleError(res) {
  return res.status(status.FORBIDDEN).json('授权失败');
}

exports.verifyToken = function (req, res, next) {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, config.jwtEncryption, function (jwtErr, decoded) {
      if (jwtErr) return handleError(res);
      req.userId = decoded.userId;
      next();
    });
  } else {
    return handleError(res);
  }
};
