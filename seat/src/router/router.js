import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'

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
      needLogin: true,
    }
  },
  {
    path: '/OrderDetails',
    component: OrderDetails,
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
    path: '/*',
    component: Error,
    meta: {
      title: '众独自习室',
    }
  }
];

// 页面刷新时，重新赋值token
/* if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
} */

const router = new VueRouter({
  routes
});

// 配置路由守卫
router.beforeEach((to, from, next) => {
  let { title, needLogin } = to.meta;
  let { isLogin } = store.state;
  // 设置页面标题
  document.title = title;
  if (needLogin && !isLogin) {
    // 需要登录，但没有登录，跳转到登录页
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;