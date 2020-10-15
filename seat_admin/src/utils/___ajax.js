import axios from '@/config/httpConfig.js'
// import qs from 'qs'

export default function ajax(url = '', params = {}, type = 'GET') {
  let promise;
  return new Promise(((resolve, reject) => {
    //1.判断请求方式
    if ('GET' === type) {
      //1.1拼接字符串
      let str = '';
      Object.keys(params).forEach((value, index) => {
        if (index + 1 === Object.keys(params).length) {
          str += value + '=' + params[value];
        } else {
          str += value + '=' + params[value] + '&';
        }
      });
      //1.2完整路径
      url += '?' + str;
      //1.3发送get请求
      promise = axios.get(url);
    } else if ('POST' === type) {
      //1.3发送post请求
      // let postData = qs.stringify(params);
      // promise = axios.post(url, postData);
      promise = axios.post(url, params);
    }
    //2.返回请求结果
    promise.then((response) => {
      resolve(response.data); //返回一个resolved状态的 Promise 对象
    }).catch((error) => {
      reject(error); //Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数
    });
  }))
}

/* const http = {}

http.get = function (url, options) {
  let loading
  if (!options || options.isShowLoading !== false) {
    loading = document.getElementById('ajaxLoading')
    loading.style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    service
      .get(url, options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.code === 1) {
          resolve(response.data)
        } else {
          Message.error({
            message: response.msg
          })
          reject(response.msg)
        }
      })
      .catch(e => {
        console.log(e)
      })
  })
}

http.post = function (url, data, options) {
  let loading
  if (!options || options.isShowLoading !== false) {
    loading = document.getElementById('ajaxLoading')
    loading.style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    service
      .post(url, data, options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.code === 1) {
          resolve(response.data)
        } else {
          Message.error({
            message: response.msg
          })
          reject(response.message)
        }
      })
      .catch(e => {
        console.log(e)
      })
  })
}

export default http */
