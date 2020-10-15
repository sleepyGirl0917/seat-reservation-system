import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { reject, resolve } from 'core-js/fn/promise'

const baseURL = process.env.NODE_ENV === 'production' ? '/' : '/api'

const service = axios.create({
  timeout: 5000,
  baseURL: baseURL,
  withCredentials:true,
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
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['sessionToken'] = store.state.token;
      // config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
    /**
     * vue-admin request.js 的写法
     * config.headers['Tokey'] = getToKen()
     * config.headers['UserName'] = getUserName()
     * return config;
     */
  },
  error => {
    return Promist.reject(error);
  },
)

// 响应拦截器即异常处理
service.interceptors.response.use(
  response => {
    return response  // 拦截通过，响应传给axios
  },
  error => {
    if (error && error.response) {
      /* switch (error.response.status) {
        case 401:
          // 返回 401 可能是token过期，清除token信息并跳转到登录页面
          store.commit(LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
      } */
    } else {
      err.message = '连接服务器失败'
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402

    // Message.error({
    //   message: err.message
    // })

    return Promise.reject(error.response)
  },
)

export default service