import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home/Home'
import Order from '../components/Order/Order'
import User from '../components/User/User'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { showTabbar: true }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: { showTabbar: true }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { showTabbar: true }
    }
  ]
})
