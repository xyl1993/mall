const _ = require('lodash');
const path = require('path');
require('dotenv').config();

const config = {
  AppID: 'wxe797f4238bafb0f4',
  AppSecret: '80a7fc258b74bcbd8ae103482524d81c',
  AppjwtEncryption: 'gaochengyouhui',
  //微信模板id组
  programTemplate: {
    //消息模板id
    deliverTemplateId: 'd_7n4WWnfeUp1pN7gg6uvnlWVEHJ9GD6XQhZ6R6T3pY',
  },
  // MongoDB connection options
  uploadRoot: path.normalize(__dirname + '/../../../../upload'),
  adminUI: {
    root: path.normalize(__dirname + '/../../../../admin/dist'),
    index: path.normalize(__dirname + '/../../../../admin/dist/index.html')
  },
  uploadFolder: path.normalize(__dirname + '/../../../../upload/'),
  serverDataFolder: path.normalize(__dirname + '/../data/'),
  QNdomain: 'http://oq4pg1mfz.bkt.clouddn.com/',
  //七牛云 配置
  qiniuConfig: {
    //需要填写你的 Access Key 和 Secret Key
    accessKey: 'uT6LleER80-2JATrId1mzcoR_i6XanKvrpzDUaX-',
    secretKey: '5VxbwMa7Pb5Pe2euYjvQhhybrkQe_yHnuSXCeQZZ',
    bucket: 'summerlog',
    origin: 'http://oq4pg1mfz.bkt.clouddn.com',
    uploadURL: 'http://up-z2.qiniup.com/',
    /**
     * 华东的存储空间 使用 up-z0.qiniu.com 或者 up.qiniu.com
      华北的存储空间 使用 up-z1.qiniu.com
      华南的存储空间 使用 up-z2.qiniu.com
     */
  },
};
const env = process.env.NODE_ENV || 'production';
module.exports = _.merge(config, require(`./${env}.js`) || {});
