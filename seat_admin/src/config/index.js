/**
 * 为axios增加loading效果
 */
import instance from './http.js'

const Axios = {}

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

// HEAD：获取资源的元数据
Axios.head = function(url, options) {
  if (!options || options.isShowLoading !== false) {
    document.getElementById('ajaxLoading').style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .head(url, options)
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

// GET（SELECT）：从服务器取出资源（一项或多项）
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

// POST（CREATE）：在服务器新建一个资源
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

// PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）
Axios.put = function(url, data, options) {
  if (!options || options.isShowLoading !== false) {
    document.getElementById('ajaxLoading').style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .put(url, data, options)
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

// PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）
Axios.patch = function(url, data, options) {
  if (!options || options.isShowLoading !== false) {
    document.getElementById('ajaxLoading').style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .patch(url, data, options)
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

// DELETE（DELETE）：从服务器删除资源
Axios.delete = function(url, options) {
  if (!options || options.isShowLoading !== false) {
    document.getElementById('ajaxLoading').style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance
      .delete(url, options)
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
