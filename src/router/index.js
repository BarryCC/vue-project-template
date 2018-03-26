import Vue from 'vue'
import Router from 'vue-router'

import Error from '../components/404.vue'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home},
    { path: '*', name: 'Error', component: Error }
  ]
})
