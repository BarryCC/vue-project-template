import Vue from 'vue'
import Router from 'vue-router'

//懒加载
const Error = resolve => require(['../components/404.vue'], resolve);
const Home = resolve => require(['../components/Home.vue'], resolve);

Vue.use(Router)

export default new Router({
  //对于所有路由导航，简单地让页面滚动到顶部，返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样；
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  //mode: 'history',//该模式下URL导航中没有#号
  routes: [
    { path: '/', name: 'Home', component: Home, meta: {title: '首页'}},
    { path: '*', name: 'Error', component: Error}
  ]
})
