module.exports = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mall',
    port: 3306
  },
  notifyUrl:'https://billionsen.cn/mall-admin/#/login',   //付款成功给html推送消息
  jwtEncryption:
    'b166c7ddc842dc43dd08319d46252c9283061030c8e301874e96f167d1201d27ceeed59871f52d7e2a279131ece97969d8cc0c525b218751232c6afccd2c4d12',
  port: 8002,
  filePath:'http://172.16.6.190:8002/mall/upload/'
};
