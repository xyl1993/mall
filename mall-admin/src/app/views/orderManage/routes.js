const orderList = ()=> import('./orderList');
const orderDetail = ()=> import('./orderDetail');
const payInfo = ()=> import('./payInfo');
export default [{
  path: '/orderList',
  component: orderList,
  name: '订单列表'
},{
  path: '/orderDetail',
  component: orderDetail,
  name: '订单详情'
},{
  path: '/payInfo',
  component: payInfo,
  name: '支付记录'
}]