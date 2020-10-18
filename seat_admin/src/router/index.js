import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const page = name => () => import('@/views/' + name)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: page('Login') },
    {
      path: '/home',
      component: page('Home'),
      redirect: '/Welcome',
      children: [
        { path: '/welcome', component: page('Welcome') },
        { path: '/users', component: page('User') }
      ]
    }
  ]
})

// 配置路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
