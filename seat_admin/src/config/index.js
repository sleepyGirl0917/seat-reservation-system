/**
 * 为axios增加loading效果
 */
import instance from './http.js'

const Axios = {}

Axios.get = function(url, options) {
  if (!options || options.isShowLoading !== false) {
    document.getElementById('ajaxLoading').style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          document.getElementById('ajaxLoading').style.display = 'none'
        }
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

Axios.post = function(url, data, options) {
  if (!options || options.isShowLoading !== false) {
    document.getElementById('ajaxLoading').style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          document.getElementById('ajaxLoading').style.display = 'none'
        }
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

Axios.request = function(options) {
  if (!options || options.isShowLoading !== false) {
    document.getElementById('ajaxLoading').style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .request(options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          document.getElementById('ajaxLoading').style.display = 'none'
        }
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default Axios
