import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import * as types from '../store/mutation-types'

// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Home from '../views/Home/Home'
import Order from '../views/Order/Order'
import OrderDetails from '../views/OrderDetails/OrderDetails'
import User from '../views/User/User'
import Login from '../views/Login/Login'
import Logout from '../views/Logout/Logout'
import Error from '../views/Error/Error'
import Purchase from '../views/Purchase/Purchase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '众独自习室',
      showTabbar: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      title: '我的预定',
      showTabbar: true,
      requireAuth: true,
    }
  },
  {
    path: '/OrderDetails/:order_id',
    component: OrderDetails,
    props: true,
    meta: {
      title: '预定详情',
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '个人中心',
      showTabbar: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '用户登录',
    }
  },
  {
    path: '/logout',
    component: Logout,
    meta: {
      title: '退出登录',
    }
  },
  {
    path:'/purchase',
    component:Purchase,
    meta:{
      title:'消费记录'
    }
  },
  {
    path: '/*',
    component: Error,
    meta: {
      title: '众独自习室',
    }
  }
];

// 页面刷新时，重新赋值token
/* if (window.localStorage.getItem('token')) {
  store.commit(types.UPDATE_TOKEN, window.localStorage.getItem('token'))
} */

const router = new VueRouter({
  routes
});

// 配置路由守卫
router.beforeEach((to, from, next) => {
  let { title, requireAuth } = to.meta;
  document.title = title; // 设置页面标题
  if (requireAuth) { // // 判断该路由是否需要登录权限
    if (store.state.token) { // 判断当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;