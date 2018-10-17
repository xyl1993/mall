import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';
import 'element-ui/lib/theme-chalk/index';
import VueRouter from 'vue-router';
import routes from './app-routes';
import Vuex from 'vuex'
import store from './vuex/index';

import 'quill/dist/quill.core.css'
import "./jsplug/SimpleTree/css/SimpleTree.css";
import "nprogress/nprogress.css";


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes:routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '后台管理系统';
  next()
})
var app =new Vue({
  router,
  store,
  render: h => h(App),
  data:{
    eventHub: new Vue()    //空的vue对象，用来组件间传递事件
  }
}).$mount('#app')