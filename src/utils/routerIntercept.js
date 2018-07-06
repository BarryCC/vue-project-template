import Vue from 'vue'
import router from '../router'
import store from '../store/store'

// 路由拦截，模式一
router.beforeEach((to, from, next) => {
    /*** 路由发生变化修改页面title ***/
    if (to.meta.title) {
      document.title = to.meta.title;
      next();
    } else {
      next();
    }

    /*** 路由登录拦截 ***/
    // 判断该路由是否需要登录权限
    if (to.meta.auth) {
      // 通过vuex state获取当前的token,true用户已登录,false用户未登录
      // if (store.state.user.token) {
      //   next();
      // } else {
      //   next({path: '../views/login'})
      // }
      next();
    } else {
      next();
    }

  });