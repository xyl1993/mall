const bytes = require('bytes');
const multer = require('multer');
const config = require('../config/environment');
const log = require('log4js').getLogger("commonController");
module.exports = {

  qnMulterUpload: function () {
    const storage = multer.memoryStorage()
    return multer({
      // dest: 'uploads/',
      storage: storage,
      limits: {
        fileSize: bytes('4MB') // 限制文件在4MB以内
      },
      // fileFilter: function (req, files, callback) {
      //   // 只允许上传jpg|png|jpeg|gif格式的文件
      //   var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|';
      //   var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
      //   callback(null, !!fileTypeValid);
      // }
    });
  },

  multerUpload: function () {
    // 通过 filename 属性定制
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, config.uploadFolder); // 保存的路径，备注：需要自己创建
      },
      filename: function (req, file, cb) {
        log.info(file);
        const fileFormat = (file.originalname).split(".");
        const filePath =String(Math.floor(Math.random()*(9999-1000))+1000)+Date.now() + '.' + fileFormat[fileFormat.length - 1];
        cb(null, filePath);
      }
    });
    return multer({
      // dest: 'uploads/',
      storage: storage,
      limits: {
        fileSize: bytes('4MB') // 限制文件在4MB以内
      },
      // fileFilter: function (req, files, callback) {
      //   // 只允许上传jpg|png|jpeg|gif格式的文件
      //   var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|';
      //   var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
      //   callback(null, !!fileTypeValid);
      // }
    });
  }
}
