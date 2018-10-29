const moment = require("moment");
const filters = {

  dateFilter: function (value) {
    return value ? moment(value).format('YYYY-MM-DD') : ''
  },
  dateTimeFilter: function (value) {
    return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
  }
};
export default filters