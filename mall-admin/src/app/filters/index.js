const moment = require("moment");
const filters = {

  dateFilter: function (value) {
    return value ? moment(value).format('YYYY-MM-DD') : ''
  }
};
export default filters