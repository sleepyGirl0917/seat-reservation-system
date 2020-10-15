import service from '@/config/httpConfig.js'
import qs from 'qs'

// 封装axios
const Axios = (url = '', params = {}, type = 'GET') => {
  let promise;
  return new Promise(((resolve, reject) => {
    if (type === 'GET') {
      let str = '';
      Object.keys(params).forEach((value, index) => {
        if (index + 1 === Object.keys(params).length) {
          str += value + '=' + params[value];
        } else {
          str += value + '=' + params[value] + '&';
        }
      });
      url += '?' + str;
      promise = service.get(url);
    } else if (type === 'POST') {
      promise = service.post(url, qs.stringify(params));
    }
    promise.then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  }))
}

export default Axios