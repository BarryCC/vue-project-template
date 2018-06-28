// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

// 路由拦截
import './utils/routerIntercept'

// 全局组件注册方法引用
//import './utils/globalsComponents'

// http请求二次封装
import Http from './utils/http'
Vue.prototype.$http = Http;

// 引用一些常用的JavaScript API方法
import API from './utils/api'
Vue.prototype.$api = API;

// 可拖拽布局
import VueDragZone from 'vue-drag-zone'
Vue.use(VueDragZone)

// 用于可拖拽树组件
import Vddl from 'vddl';
Vue.use(Vddl);

// 引入echarts,方法一，全局引用
// import echarts from 'echarts'
// 引入echarts,方法二，按需引用
Vue.prototype.$echarts = require('echarts/lib/echarts');

// bus总线
Vue.prototype.$bus = new Vue;

Vue.config.productionTip = false;

let requireComponent = require.context("./components", true, /^Base[A-Z]/)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  let baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})

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