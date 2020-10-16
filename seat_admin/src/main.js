import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element.js'

import cookies from 'vue-cookies'
Vue.use(cookies)

import axios from '@/config'
Vue.prototype.$http = axios

// 导入字体图标
import '@/assets/fonts/iconfont.css'
// 导入全局样式
import '@/assets/css/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
