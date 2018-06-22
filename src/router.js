import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Error = resolve => require(['./views/404.vue'], resolve);
const Home = resolve => require(['./views/Home.vue'], resolve);
/*** 公共组件 ***/
const GlobalsComponentsShow1 = resolve => require(['./views/globalsComponents/GlobalsComponentsShow1.vue'], resolve);
/*** 树Tree ***/
const Tree = resolve => require(['./views/Tree/treeShow.vue'], resolve);
const DrogTree = resolve => require(['./views/drag-tree/treeShow.vue'], resolve);
/*** 地图示例 ***/
const BaiduMapOne = resolve => require(['./views/baiduMap/BaiduMapOne.vue'], resolve);
const MapboxOne = resolve => require(['./views/baiduMap/mapboxOne.vue'], resolve);
const BaiduMapTwo = resolve => require(['./views/baiduMap/baiduMapTwo.vue'], resolve);

Vue.use(Router)

export default new Router({
  // 对于所有路由导航，简单地让页面滚动到顶部，返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样；
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  //mode: 'history',//该模式下URL导航中没有#号
  routes: [
    { path: '/', component: Home,
      children:[
        {path: '', name: 'home', component: DrogTree},
        {path: 'globalsComponentsShow1', name: 'GlobalsComponentsShow1', component: GlobalsComponentsShow1},
        {path: 'tree', name: 'tree', component: Tree},
        {path: 'drogTree', name: 'drogTree', component: DrogTree},
        {path: 'baiduMapOne', name: 'baiduMapOne', component: BaiduMapOne},
        {path: 'mapboxOne', name: 'mapboxOne', component: MapboxOne},
        {path: 'baiduMapTwo', name: 'baiduMapTwo', component: BaiduMapTwo},
      ]
    },
    { path: '*', name: 'Error', component: Error}
  ]
})
