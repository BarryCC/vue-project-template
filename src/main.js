// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

//请求二次封装
import Http from './utils/http'
Vue.prototype.$http = Http;

//引用一些常用的JavaScript API方法
import API from './utils/api'
Vue.prototype.$api = API;

import VueDragZone from 'vue-drag-zone'
Vue.use(VueDragZone)

import Vddl from 'vddl';
Vue.use(Vddl);

// 引入echarts,方法一，全局引用
// import echarts from 'echarts'
// 引入echarts,方法二，按需引用
Vue.prototype.$echarts = require('echarts/lib/echarts');

//bus总线
Vue.prototype.$bus = new Vue;

Vue.config.productionTip = false

//路由拦截，模式一
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
    next();
  } else {
    next();
  }
  
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})
//路由拦截，模式二
// router.beforeEach((to, from, next) => {
//   if (to.name === 'Login') {
//     // 当进入路由为login时,判断是否已经登录
//     if (store.getters.user.isLogin) {
//       // 如果已经登录,则进入功能页面
//       return next('/')
//     } else {
//       return next()
//     }
//   } else {
//     if (store.getters.user.isLogin) {
//       return next()
//     } else {
//       // 如果没有登录,则进入login路由
//       return next('/login')
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function (event) {
  let element = event.target;
  let tags = {
    'INPUT': 1,
    'TEXTAREA': 1,
  }
  if ((element.tagName in tags) ) {
    setTimeout(function(){
      element.scrollIntoView();
      element.scrollIntoViewIfNeeded();
    }, 400);
  }
}, false);