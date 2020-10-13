import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@views/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
  ]
})
