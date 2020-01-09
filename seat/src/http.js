/**
 * http配置
 */

import axios from 'axios'
import store from './store/store'
import * as types from './store/mutation-types'
import router from './router/router'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.NODE_ENV==="production"?"http://127.0.0.1:3001/api":"/api"

// request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['sessionToken'] = store.state.token;
    }
    return config
  },
  error => {
    return Promist.reject(error);
  },
)

// response 拦截器
axios.interceptors.response.use(
  response => { 
    return response  // 响应传给axios
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 可能是token过期，清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response)
  },
)

export default axios;