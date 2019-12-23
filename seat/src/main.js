import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'

// import cookies from 'vue-cookies'
// Vue.use(cookies)

import axios from './http'
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

import './filters'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import './seat/seat.styl'
import './common/reset.styl'
import { Header, Swipe, SwipeItem, Picker,DatetimePicker } from "mint-ui"
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

