import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import cookies from 'vue-cookies'
Vue.use(cookies);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
