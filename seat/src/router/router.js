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
import MyOrder from '../views/MyOrder/MyOrder'
import OrderDetails from '../views/OrderDetails/OrderDetails'
import User from '../views/User/User'
import Login from '../views/Login/Login'
import Logout from '../views/Logout/Logout'
import NotFound from '../views/NotFound/NotFound'
import Purchase from '../views/Purchase/Purchase'
import PurchaseDetails from '../views/PurchaseDetails/PurchaseDetails'
// import Experience from '../views/Experience/Experience'
import JoinMember from '../views/JoinMember/JoinMember'
import SelectShop from '../views/SelectShop/SelectShop'
import SelectSeat from '../views/SelectSeat/SelectSeat'
import OrderConfirm from '../views/OrderConfirm/OrderConfirm'
import MyPhone from '../views/MyPhone/MyPhone'
import MyMember from '../views/MyMember/MyMember'
import RechargeRecord from '../views/RechargeRecord/RechargeRecord'
import InviteNew from '../views/InviteNew/InviteNew'
import Contact from '../views/Contact/Contact'
import UpdateUserInfo from '../views/UpdateUserInfo/UpdateUserInfo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '众独自习室',
      showTabbar: true
    }
  },
  // {
  //   path:'/experience',
  //   name:'experience',
  //   component:Experience,
  //   meta:{
  //     title:'预约体验',
  //     showHeader: true,
  //     requireAuth: true
  //   }
  // },
  {
    path: '/my_order',
    name: 'my_order',
    component: MyOrder,
    meta: {
      title: '我的预定',
      showHeader: true,
      showTabbar: true,
      requireAuth: true
    }
  },
  {
    path: '/order_details/:order_id',
    name: 'order_details',
    component: OrderDetails,
    props: true,
    meta: {
      title: '预定详情',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      title: '个人中心',
      showTabbar: true
    }
  },
  {
    path:'/user/update_info',
    name:'update_info',
    component:UpdateUserInfo,
    meta:{
      title:'编辑资料',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/user/tel',
    name: 'my_telephone',
    component: MyPhone,
    meta: {
      title: '',
      showTabbar: false,
      requireAuth: true
    }
  },
  {
    path: '/user/member',
    name: 'my_member',
    component: MyMember,
    meta: {
      title: '我的会员',
      showHeader: true,
      showTabbar: false,
      requireAuth: true
    }
  },
  {
    path: '/user/record',
    name: 'my_record',
    component: RechargeRecord,
    meta: {
      title: '办卡记录',
      showHeader: true,
      showTabbar: false,
      requireAuth: true
    }
  },
  {
    path: '/user/invite',
    name: 'my_invite',
    component: InviteNew,
    meta: {
      title: '邀请有礼',
      showHeader: true,
      showTabbar: false,
      requireAuth: true
    }
  },
  {
    path: '/user/contact',
    name: 'my_cantact',
    component: Contact,
    meta: {
      title: '联系我们',
      showHeader: true,
      showTabbar: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '用户登录',
      showHeader: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      title: '退出登录',
      showHeader: true
    }
  },
  {
    path: '/join_member',
    name: 'join_member',
    component: JoinMember,
    meta: {
      title: '加入会员',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/select_shop',
    name:'select_shop',
    component: SelectShop,
    meta: {
      title: '选择店铺',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/select_seat',
    name:'select_seat',
    component: SelectSeat,
    meta: {
      title: '预定座位',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/order_confirm',
    name: 'order_confirm',
    component: OrderConfirm,
    meta: {
      title: '确认订单',
      showHeader: true,
      requireAuth: true
    }
  },
  // vue多个路由使用同一个页面,通过name判断参数,渲染页面数据
  {
    path: '/purchase',
    name: 'purchase-all',
    component: Purchase,
    meta: {
      title: '消费记录',
      showHeader: true,
      requireAuth: true
    },
  },
  {
    path: '/purchase/delay',
    name: 'purchase-delay',
    component: Purchase,
    meta: {
      title: '消费记录-延长时段',
      showHeader: true,
      requireAuth: true
    },
  },
  {
    path: '/purchase/cancel',
    name: 'purchase-cancel',
    component: Purchase,
    meta: {
      title: '消费记录-取消订单',
      showHeader: true,
      requireAuth: true
    },
  },
  {
    path: '/purchase/end',
    name: 'purchase-end',
    component: Purchase,
    meta: {
      title: '消费记录-结束',
      showHeader: true,
      requireAuth: true
    },
  },
  {
    path: '/purchase/overdue',
    name: 'purchase-overdue',
    component: Purchase,
    meta: {
      title: '消费记录-逾期',
      showHeader: true,
      requireAuth: true
    },
  },
  {
    path: '/purchase/details/:order_id',
    name: 'purchase-details-all',
    component: PurchaseDetails,
    props: true,
    meta: {
      title: '消费详情',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/purchase/delay/details/:order_id',
    name: 'purchase-details-delay',
    component: PurchaseDetails,
    props: true,
    meta: {
      title: '消费详情-延长时段',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/purchase/cancel/details/:order_id',
    name: 'purchase-details-cancel',
    component: PurchaseDetails,
    props: true,
    meta: {
      title: '消费详情-取消订单',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/purchase/end/details/:order_id',
    name: 'purchase-details-end',
    component: PurchaseDetails,
    props: true,
    meta: {
      title: '消费详情-结束',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/purchase/overdue/details/:order_id',
    name: 'purchase-details-overdue',
    component: PurchaseDetails,
    props: true,
    meta: {
      title: '消费详情-逾期',
      showHeader: true,
      requireAuth: true
    }
  },
  {
    path: '/*',
    name: '404',
    component: NotFound,
    meta: {
      title: '404-Not Found',
      showHeader: true
    }
  },
];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.UPDATE_TOKEN, window.localStorage.getItem('token'))
}

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