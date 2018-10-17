const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("commonController");
const qn = require('qn');
const multerHelper = require('../../../utils/multerHelper');
const config = require('../../../config/environment');
const qiniuConfig = config.qiniuConfig;


exports.uploadQiniu = function (req, res, next) {
  // 七牛相关配置信息
  let client = qn.create(qiniuConfig);
  // 上传单个文件
  multerHelper.qnMulterUpload().single('file')(req, res, function (err) {
    if (err) {
      log.error(err);
      return handleError(res, err);
    }
    let file = req.file;
    if (file && file.buffer) {
      //获取源文件后缀名
      var fileFormat = (file.originalname).split(".");
      //设置上传到七牛云的文件命名
      var filePath = file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1];
      log.info("文件为:" + filePath);
      // 上传到七牛 
      client.upload(req.file.buffer, {
        key: filePath
      }, function (err, result) {
        if (err) {
          log.error(err);
          return handleError(res, err);
        }
        res.status(status.OK).json(filePath);
      });
    }
  });

};


exports.uploadDisk = function (req, res, next) {
  // 上传单个文件
  multerHelper.multerUpload().single('file')(req, res, function (err) {
    if (err) {
      log.error(err);
      return handleError(res, err);
    }
    res.status(status.OK).json(req.file.filename);
  });
};
