import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
// import cookies from 'vue-cookies'
// Vue.use(cookies)

import axios from './http'
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import { Header,Swipe, SwipeItem } from "mint-ui"
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 创建日期过滤器
Vue.filter("dateTimeFilter", (val, type) => {
  // 创建日期对象
  let date = new Date(val);
  // 获取年 月 日 时 分 秒
  let y = date.getFullYear();
  let m = date.getMonth() + 1;  // getMouth()的返回值从0开始，即0-11，所以需要+1
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  // 月份和日期补0
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  // 返回字符串
  if (type == 'dateOnly') {
    return `${y}-${m}-${d}`;
  } else if (type == 'timeOnly') {
    return `${h}:${min}`;
  } else {
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  }
})

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

