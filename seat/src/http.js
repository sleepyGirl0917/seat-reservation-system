/**
 * http配置
 */

import axios from 'axios'
import store from './store/store'
import router from './router/router'

// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'https://api.github.com'

// http request 拦截器
/* axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['sessionToken'] = store.state.token;
    }
    return config
  },
  error => {
    return Promist.reject(error);
  },
) */

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  },
)

export default axios;