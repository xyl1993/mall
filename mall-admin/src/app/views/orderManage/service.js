import api from '../../utils/api.js';

/**
 * 获取订单列表
 * @param {*} data 
 */
export const getOrderList = (data) => { return api.get(`admin/order`,data).then(res => res.data); };

export const getOrderDetail = (data) => { return api.get(`order/${data}`).then(res => res.data); };

export const deliver = (order_number,data) => { return api.put(`admin/order/deliver/${order_number}`,data).then(res => res.data); };

/**
 * 获取支付记录
 * @param {*} data 
 */
export const getPayList = (data) => { return api.get(`admin/pay/record`,data).then(res => res.data); };
