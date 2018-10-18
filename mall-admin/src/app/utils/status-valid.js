import { timeoutText } from '../global/base.config';
const httpStatus = require('http-status');
/**
 * 
 * @param {*} that 
 * @param {*} status 
 * @param {*} message 
 */
export const statusValid = (that, status, data) => {
  if (that.actionStatus)  that.actionStatus = false;
  if(status === httpStatus.OK){
    return true
  }
  if (status === httpStatus.NOT_FOUND) {
    that.$message({
      message: '请求不存在',
      type: 'error'
    });
    return false
  }
  if (status === httpStatus.UNAUTHORIZED) {
    that.$message({
      message: data,
      type: 'error'
    });
    return false
  }
  if (status === httpStatus.FORBIDDEN) {
    that.$message({
      message: timeoutText,
      type: 'warning',
      duration: 2000,
      onClose: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        that.$router.replace({ path: '/login' });
      }
    });
    return false
  }
  that.$message({
    message: '服务器出错',
    type: 'error'
  });
  return false
}