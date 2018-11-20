const _ = require('lodash');
const path = require('path');
require('dotenv').config();

const config = {
  AppID: 'wx87c34fd85a33c2b7',
  AppSecret: '905ad38103df1953b57050dcf9b85af8',
  mchId:'',  //商户号
  AppjwtEncryption: 'gaochengyouhui',
  //微信模板id组
  programTemplate: {
    //消息模板id
    deliverTemplateId: 'xR6tz0vnrrL0hUVIBnV-Ea3oBVNlPXnLnFXynvSrRfA',    //发货成功
    orderSuccessTemplateId:'_WQqRn3hJEPR_PSWtRCyRsHiHqcGQ0MlEKZJTkopB0o'   //确认下单成功
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
