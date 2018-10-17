const ShopList = ()=> import('./shopList');
const ShopDetail = ()=> import('./shopDetail');
export default [{
  path: '/shopList',
  component: ShopList,
  name: '商品列表'
},{
  path: '/shopDetail',
  component: ShopDetail,
  name: '商品详情'
}]