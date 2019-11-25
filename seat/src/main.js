import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

// 引入Vuex
import Vuex from "vuex"
// 注册Vuex组件
Vue.use(Vuex)
// 创建store
var store = new Vuex.Store({
  state: {
    
  },
  mutations: {

  },
  getters: {

  }
})
// 将store对象添加到Vue实例中成为一个属性

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

// 引入axios库
import axios from "axios"
// 配置跨域访问保存session
axios.defaults.withCredentials = true;
// 将axios库配置Vue实例对象中
Vue.prototype.axios = axios;

// 加载第三方模块qs
import qs from "qs";
// 配置qs模块，使qs成为Vue属性
Vue.prototype.qs = qs;

Vue.config.productionTip = false;

// 引入cookies
import cookies from 'vue-cookies'
Vue.use(cookies);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
