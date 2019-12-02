import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import cookies from 'vue-cookies'
Vue.use(cookies)

// 引入mint-ui 样式文件
import 'mint-ui/lib/style.css'
// 引入mui库样式文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 引入mint-ui 组件
import { Header,Swipe, SwipeItem } from "mint-ui"
// 注册组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import axios from "axios"
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

import qs from "qs";
Vue.prototype.qs = qs;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
