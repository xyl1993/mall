export const asideTree = {
  roleFun: [{
    "name": "订单管理",
    "alienName": '订单管理',
    "iconCls": "iconfont icon-dingdan",
    "path": "",
    "children": [
      {path: '/orderList', name: '订单列表' },
    ]
  },{
    "name": "首页设置",
    "alienName": 'homeSetting',
    "iconCls": "iconfont icon-shouye-copy-copy",
    "path": "",
    "children": [
      {path: '/carousel', name: '轮播图' }
    ]
  },{
    "name": "商品管理",
    "alienName": '商品管理',
    "iconCls": "iconfont icon-shangpin",
    "path": "",
    "children": [
      {path: '/shopList', name: '商品列表' },
      {path: '/goodsBrand', name: '品牌类型' },
    ]
  },{
    "name": "用户管理",
    "alienName": '用户管理',
    "iconCls": "iconfont icon-yonghu",
    "path": "",
    "children": [
      {path: '/programUser', name: '小程序用户' },
    ]
  }]
};