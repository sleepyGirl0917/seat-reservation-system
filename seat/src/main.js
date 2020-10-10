import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'

import cookies from 'vue-cookies'
Vue.use(cookies)

import axios from './http'
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

//引入剪切板插件clipboard;
import Clipboard from 'clipboard'; 
Vue.prototype.Clipboard=Clipboard;

// import VueLazyLoad from 'vue-lazyload'
// Vue.use(VueLazyLoad, {
//   preLoad: 1.3,
//   error: require('./assets/img/error.jpg'),
//   loading: require('./assets/img/loading.gif'),
//   attempt: 1
// })

import './filters'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import './seat/seat.styl'
import './common/reset.styl'
import { Header, Swipe, SwipeItem, Popup, Picker, DatetimePicker, Loadmore, Lazyload } from "mint-ui"

Vue.use(Lazyload);

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Loadmore.name, Loadmore);

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(process.env)
console.log(axios.defaults.baseURL)