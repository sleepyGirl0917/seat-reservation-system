import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Home from '../views/Home/Home'
import Order from '../views/Order/Order'
import User from '../views/User/User'
import Login from '../views/Login/Login'
import Logout from '../views/Logout/Logout'
import OrderDetails from '../views/OrderDetails/OrderDetails'
import Error from '../views/Error/Error'

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
      meta: { showTabbar: true}
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: { showTabbar: true}
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { showTabbar: true}
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/logout',
      component: Logout
    },
    {
      path: '/OrderDetails',
      component: OrderDetails
    },
    {
      path:'/*',
      component:Error
    }
  ]
})
