import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element.js'

import cookies from 'vue-cookies'
Vue.use(cookies);

import axios from '@/config/httpConfig.js'
Vue.prototype.$http = axios;

import '@/styles/index.scss'
// 导入字体图标
import '@assets/fonts/iconfont.css'
// 导入全局样式
import '@css/global.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
