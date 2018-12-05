const nodeSchedule = require('node-schedule');
const controller = require('../modules/v1/order/order.controller');

/**
 * 每天的1点执行
 * 更新发货大于7天的收货数据
 */
const scheduleSetup = () => {
  nodeSchedule.scheduleJob('0 0 1 * * *', function () {
    console.log('task invoked at 1:00 every day.');
    controller.updateReceiptStatus();
  });
};

module.exports = {
  scheduleSetup
};
