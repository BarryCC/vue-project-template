import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import 'babel-polyfill'

import '@/style/common.css'

// 路由拦截
import './util/routerIntercept'

// 全局组件注册方法引用
import './util/globalsComponents'

// http请求二次封装，处理token
import Http from './util/http'
Vue.prototype.$http = Http;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

// 引用一些常用的JavaScript function
import Functions from './util/functions'
Vue.prototype.$util = Functions;

// bus总线
Vue.prototype.$bus = new Vue;

// iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);

// 用于可拖拽树组件
import Vddl from 'vddl';
Vue.use(Vddl);

// 引入echarts,方法一，全局引用
// import echarts from 'echarts'
// 引入echarts,方法二，按需引用
Vue.prototype.$echarts = require('echarts/lib/echarts');

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')