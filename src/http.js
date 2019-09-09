import Axios from 'axios'
Axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'api/' : ''
// Axios.defaults.headers.post['Content-Type'] = 'application/json'
// 对所有 axios 请求做处理
Axios.defaults.withCredentials = true;

export default class Http {
  static get (url, params) {
    return new Promise((resolve, reject) => {
      return Axios.get(url, {
        params: params
      }).then(res => resolve(res)).catch(err => reject(err))
    })
  }
  static post (url, params) {
    return new Promise((resolve, reject) => {
      return Axios.post(url, params).then(res => resolve(res)).catch(err => reject(err))
    })
  }
  static put (url, params) {
    return new Promise((resolve, reject) => {
      return Axios.put(url, params).then(res => resolve(res)).catch(err => reject(err))
    })
  }
}
