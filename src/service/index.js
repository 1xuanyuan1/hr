import axios from 'axios'
import qs from 'qs'
import config from './config.js'
// import store from '../store'
import LRU from 'lru-cache'
import md5 from 'md5'
// import NProgress from 'nprogress'

const cached = LRU({max: 1000, maxAge: 1000 * 60 * 15})
const port = process.env.PORT || 8080
const isSer = process.env.VUE_ENV === 'server'
if (isSer) {
  config.baseURL = `http://localhost:${port}/api`
}
var api = axios.create(config)
// if (store && store.state.user.userinfo && store.state.user.userinfo.token != null) {
//   api.defaults.headers.common['x-auth-token'] = store.state.user.userinfo.token
// }

api.interceptors.request.use(config => {
  // NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  // NProgress.done()
  return response.data
}, error => {
  // NProgress.done()
  // let err = error.response.errorMessage
  return Promise.reject(error)
})

export default {
  post (url, params) {
    return api({
      method: 'post',
      url,
      data: params
    })
  },
  postText (url, params) {
    return api({
      method: 'post',
      url,
      data: params,
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      }
    })
  },
  postForm (url, params) {
    return api({
      method: 'post',
      url,
      data: qs.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  download (url, params, fileName) {
    return api({
      method: 'post',
      url,
      data: params,
      responseType: 'blob'
    }).then(result => {
      var a = document.createElement('a')
      a.href = URL.createObjectURL(result)
      a.download = fileName
      a.click()
    })
  },
  get (url, params) {
    const key = md5(url + JSON.stringify(params))
    if (cached.has(key)) {
      return Promise.resolve(cached.get(key))
    }
    return api({
      method: 'get',
      url,
      params
    }).then(res => {
      cached.set(key, res)
      return res
    })
  }
}
