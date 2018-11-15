//懒加载
const FullLayout = () => import('./containers/full-layout/full-layout');
const SimpleLayout = () => import('./containers/simple-layout/simple-layout');
/**
 * 工作台目录模块 start
 */
import ShopManage from './views/shopManage/routes';
import HomeSetting from './views/homeSetting/routes';
import OrderManage from './views/orderManage/routes';
import userManage from './views/userManage/routes';
/**
 * 工作台目录模块 end
 */

//pages模块
//登陆注册404等额外的页面
import PagesLayout from './views/pages/routes';


let routes = [{
    path: '/',
    component: FullLayout,
    name: '订单管理',
    redirect:'/orderList',
    children: [
      ...OrderManage
    ]
  }, {
    path: '/',
    component: FullLayout,
    name: '首页设置',
    children: [
      ...HomeSetting
    ]
  }, {
    path: '/',
    component: FullLayout,
    name: '商品管理',
    children: [
      ...ShopManage
    ]
  }, {
    path: '/',
    component: FullLayout,
    name: '用户管理',
    children: [
      ...userManage
    ]
  },
  {
    path: '/pages',
    component: SimpleLayout,
    children: [
      ...PagesLayout
    ]
  }
]
export default routes