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
import NotFound from '../views/NotFound/NotFound'
import Purchase from '../views/Purchase/Purchase'
import PurchaseDetails from '../views/PurchaseDetails/PurchaseDetails'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name:'home',
    component: Home,
    meta: {
      title: '众独自习室',
      showTabbar: true
    }
  },
  {
    path: '/order',
    name:'order',
    component: Order,
    meta: {
      title: '我的预定',
      showTabbar: true,
      requireAuth: true,
    }
  },
  {
    path: '/OrderDetails/:order_id',
    name:'orderDetails',
    component: OrderDetails,
    props: true,
    meta: {
      title: '预定详情',
    }
  },
  {
    path: '/user',
    name:'user',
    component: User,
    meta: {
      title: '个人中心',
      showTabbar: true
    }
  },
  {
    path: '/login',
    name:'login',
    component: Login,
    meta: {
      title: '用户登录',
    }
  },
  {
    path: '/logout',
    name:'logout',
    component: Logout,
    meta: {
      title: '退出登录',
    }
  },
  // vue多个路由使用同一个页面,通过name判断参数,渲染页面数据
  {
    path: '/purchase',
    name: 'purchase-all',
    component: Purchase,
    meta: {
      title: '消费记录',
      requireAuth: true,
    },
  },
  {
    path: '/purchase/delay',
    name: 'purchase-delay',
    component: Purchase,
    meta: { title: '消费记录-延长时段' },
  },
  {
    path: '/purchase/cancel',
    name: 'purchase-cancel',
    component: Purchase,
    meta: {
      title: '消费记录-取消订单',
      requireAuth: true,
    },
  },
  {
    path: '/purchase/end',
    name: 'purchase-end',
    component: Purchase,
    meta: {
      title: '消费记录-结束',
      requireAuth: true,
    },
  },
  {
    path: '/purchase/overdue',
    name: 'purchase-overdue',
    component: Purchase,
    meta: {
      title: '消费记录-逾期',
      requireAuth: true,
    },
  },
  {
    path: '/purchase/details/:order_id',
    name: 'purchaseDetails-all',
    component:PurchaseDetails,
    meta:{
      title:'消费详情'
    }
  },
  {
    path: '/purchase/delay/details/:order_id',
    name: 'purchaseDetails-delay',
    component: PurchaseDetails,
    meta: {
      title: '消费详情-延长时段'
    }
  },
  {
    path: '/purchase/cancel/details/:order_id',
    name: 'purchaseDetails-cancel',
    component: PurchaseDetails,
    meta: {
      title: '消费详情-取消订单'
    }
  },
  {
    path: '/purchase/end/details/:order_id',
    name: 'purchaseDetails-end',
    component: PurchaseDetails,
    meta: {
      title: '消费详情-结束'
    }
  },
  {
    path: '/purchase/overdue/details/:order_id',
    name: 'purchaseDetails-overdue',
    component: PurchaseDetails,
    meta: {
      title: '消费详情-逾期'
    }
  },
  {
    path: '/*',
    name:'404',
    component: NotFound,
    meta: {
      title: '404-Not Found',
    }
  },
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