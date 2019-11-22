import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home/Home'
import Order from '../views/Order/Order'
import User from '../views/User/User'

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
