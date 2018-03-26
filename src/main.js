// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

import Http from './utils/http'
//一些常用的JavaScript API方法引用
import API from './utils/api'

import Iview from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(Iview);

Vue.prototype.$http = Http;
Vue.prototype.$api = API;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
