//懒加载
const FullLayout = () => import('./containers/full-layout/full-layout');
const SimpleLayout = () => import('./containers/simple-layout/simple-layout');
import Cointer from './views/cointer/cointer';
/**
 * 工作台目录模块 start
 */
import ShopManage from './views/shopManage/routes';
import Dashboard from './views/dashboard/routes';
import HomeSetting from './views/homeSetting/routes';

/**
 * 工作台目录模块 end
 */

//pages模块
//登陆注册404等额外的页面
import PagesLayout from './views/pages/routes';


let routes = [{
    path: '/',
    component: FullLayout,
    name: 'dashboard',
    children: [
      ...Dashboard
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