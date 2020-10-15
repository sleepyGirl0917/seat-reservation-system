import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const service = axios.create({
  timeout: 5000,
  baseURL: '/api/private/v1/',
  withCredentials: true,
  validateStatus(status) {
    switch (status) {
      case 400:
        Message.error('请求出错')
        break
      case 401:
        Message.warning({
          message: '授权失败，请重新登录'
        })
        store.commit('LOGIN_OUT')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        return
      case 403:
        Message.warning({
          message: '拒绝访问'
        })
        break
      case 404:
        Message.warning({
          message: '请求错误,未找到该资源'
        })
        break
      case 500:
        Message.warning({
          message: '服务端错误'
        })
        break
    }
    return status >= 200 && status < 300
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    document.getElementById('ajaxLoading').style.display = 'block'
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['sessionToken'] = store.state.token;
      // config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  error => {
    return Promist.reject(error)
  },
)

// 响应拦截器即异常处理
service.interceptors.response.use(
  response => {
    document.getElementById('ajaxLoading').style.display = 'none'
    return response.data  // 拦截通过，响应传给axios
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 可能是token过期，清除token信息并跳转到登录页面
          store.commit(LOGIN_OUT)
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
      }
    } else {
      error.message = '连接服务器失败'
    }
    Message.error({
      message: error.message
    })
    return Promise.reject(error.response)
  }
)

export default service