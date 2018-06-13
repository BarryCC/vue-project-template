// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

import Http from './utils/http'
//一些常用的JavaScript API方法引用
import API from './utils/api'

Vue.prototype.$http = Http;
Vue.prototype.$api = API;

Vue.config.productionTip = false

//路由拦截，模式一
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
    next();
  } else{
    next();
  }
  
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
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
  components: { App },
  template: '<App/>'
})
