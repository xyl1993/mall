const orderList = ()=> import('./orderList');
const orderDetail = ()=> import('./orderDetail');
export default [{
  path: '/orderList',
  component: orderList,
  name: '订单列表'
},{
  path: '/orderDetail',
  component: orderDetail,
  name: '订单详情'
}]