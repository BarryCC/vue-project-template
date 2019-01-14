import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Error = resolve => require(['../views/404.vue'], resolve);
const Home = resolve => require(['../views/Home.vue'], resolve);
/*** 公共组件 ***/
const GlobalsComponentsShow1 = resolve => require(['../views/globalsComponents/GlobalsComponentsShow1.vue'], resolve);

/*** 树Tree ***/
const Tree = resolve => require(['../views/Tree/treeShow.vue'], resolve);
const DrogTree = resolve => require(['../views/drag-tree/treeShow.vue'], resolve);

const Solider1 = resolve => require(['../views/solider/solider1.vue'], resolve);

/*** 地图示例 ***/
const BaiduMapOne = resolve => require(['../views/baiduMap/BaiduMapOne.vue'], resolve);
const MapboxOne = resolve => require(['../views/baiduMap/mapboxOne.vue'], resolve);
const BaiduMapTwo = resolve => require(['../views/baiduMap/baiduMapTwo.vue'], resolve);

//可视化
const DataVisualization1 = resolve => require(['../views/dataVisualization/DataVisualization1.vue'], resolve);
const DataVisualization2 = resolve => require(['../views/dataVisualization/DataVisualization2.vue'], resolve);

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
  // mode: 'history',//该模式下URL导航中没有#号
  // auth true登录才能访问，false不需要登录
  routes: [
    { path: '/', component: Home,
      children:[
        {path: '', name: 'home', meta: {title:'主页', auth: false}, component: DrogTree},
        {path: 'globalsComponentsShow1', name: 'GlobalsComponentsShow1', meta: {title:'公共组件展示1', auth: true},component: GlobalsComponentsShow1},

        {path: 'tree', name: 'tree', meta: {title:'树组件', auth: false}, component: Tree},
        {path: 'drogTree', name: 'drogTree', meta: {title:'拖拽树组件', auth: true}, component: DrogTree},
        {path: 'solider1', name: 'solider1', meta: {title:'滑块1', auth: false}, component: Solider1},

        {path: 'baiduMapOne', name: 'baiduMapOne', meta: {title:'百度地图示例1', auth: false}, component: BaiduMapOne},
        {path: 'baiduMapTwo', name: 'baiduMapTwo', meta: {title:'百度地图示例2', auth: false}, component: BaiduMapTwo},
        {path: 'mapboxOne', name: 'mapboxOne', meta: {title:'mapbox', auth: false}, component: MapboxOne},

        {path: 'DataVisualization1', name: 'DataVisualization1', meta: {title:'可视化示例1', auth: false}, component: DataVisualization1},
        {path: 'DataVisualization2', name: 'DataVisualization2', meta: {title:'可视化示例2', auth: false}, component: DataVisualization2},
      ]
    },
    {path: '*', name: 'Error', meta: {title:'报错，找不到页面',auth: false}, component: Error}
  ]
})
