import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = require('./_import_' + process.env.NODE_ENV);

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
    { path: '/', component: _import('Home'),
      children:[
        {path: '', name: 'home', meta: {title:'主页', auth: false}, component: _import('Home')},
        /*** 公共组件 ***/
        {path: 'globalsComponentsShow1', name: 'GlobalsComponentsShow1', meta: {title:'公共组件展示1', auth: true},component: _import('globalsComponents/GlobalsComponentsShow1')},
        /*** 树Tree ***/
        {path: 'tree', name: 'tree', meta: {title:'树组件', auth: false}, component: _import('Tree/treeShow')},
        {path: 'drogTree', name: 'drogTree', meta: {title:'拖拽树组件', auth: true}, component: _import('drag-tree/treeShow')},
        /*** 地图示例 ***/
        {path: 'baiduMapOne', name: 'baiduMapOne', meta: {title:'百度地图示例1', auth: false}, component: _import('baiduMap/baiduMapOne')},
        {path: 'baiduMapTwo', name: 'baiduMapTwo', meta: {title:'百度地图示例2', auth: false}, component: _import('baiduMap/baiduMapTwo')},
        {path: 'mapboxOne', name: 'mapboxOne', meta: {title:'mapbox', auth: false}, component: _import('baiduMap/mapboxOne')},
        /*** 可视化 ***/
        {path: 'DataVisualization1', name: 'DataVisualization1', meta: {title:'可视化示例1', auth: false}, component: _import('dataVisualization/DataVisualization1')},
        {path: 'DataVisualization2', name: 'DataVisualization2', meta: {title:'可视化示例2', auth: false}, component: _import('dataVisualization/DataVisualization2')},
      ]
    },
    {path: '*', name: 'Error', meta: {title:'报错，找不到页面',auth: false}, component: _import('404')}
  ]
})
