const status = require('http-status');
exports.handleError = function (res, err) {
  return res.status(status.INTERNAL_SERVER_ERROR).send(err);
};
