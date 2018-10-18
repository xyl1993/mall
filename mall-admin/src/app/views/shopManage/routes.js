const shopList = ()=> import('./shop/shopList');
const shopDetail = ()=> import('./shop/shopDetail');
const goodsBrand = ()=> import('./brand/brand');
export default [{
  path: '/shopList',
  component: shopList,
  name: '商品列表'
},{
  path: '/shopDetail',
  component: shopDetail,
  name: '商品详情'
},{
  path: '/goodsBrand',
  component: goodsBrand,
  name: '品牌类型'
}]