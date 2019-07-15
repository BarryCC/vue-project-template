import Vue from 'vue'
import router from '../router'
import iView from 'iview'
import store from '../store/store'

iView.LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
});

router.beforeEach((to, from, next) => {
  /*** 路由发生变化修改页面title ***/
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  iView.LoadingBar.start();

  /*** 路由登录拦截 ***/
  // 获取登录状态，存储在cookie（重点或token），vuex和本地，
  // 判断该路由是否需要登录权限
  if (to.meta.auth) {
    // 通过vuex state获取当前的token,true用户已登录,false用户未登录
    // if (store.state.user.token) {
    //   next();
    // } else {
    //   next({path: '../views/login'})
    // }
    next();
  }

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }

  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
})