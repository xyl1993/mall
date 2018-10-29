import api from '../../utils/api.js';

/**
 * 获取订单列表
 * @param {*} data 
 */
export const getOrderList = (data) => { return api.get(`admin/order`,data).then(res => res.data); };

export const getOrderDetail = (data) => { return api.get(`order/${data}`).then(res => res.data); };

