import axios from 'axios'
import qs from 'qs'
import getUrl from './baseUrl'

// 配置axios的config
const config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: getUrl(),
  // `withCredentials` 表示跨域请求时是否需要使用凭证（登陆的时候会有cookie这个时候要用到）
  withCredentials: true,
  headers: {
    // 设置
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    // 处理发送前的数据
    data = qs.stringify(data)
    return data
  }],
  data: {
    // 全局参数
    channelType: 1,
    channelTag: '1'
  }
}
const get = (url, params) => {
  url = urlEncode(url, params)
  return axios.get(url, config)
}

const post = (url, params) => {
  return axios.post(url, params, config)
}

// 用来拼接get请求的时候的参数
let urlEncode = (url, data) => {
  if (typeof (url) === 'undefined' || url === null || url === '') return ''
  if (typeof (data) === 'undefined' || data === null || typeof (data) !== 'object') return url
  url += (url.indexOf('?') !== -1) ? '' : '?'
  for (let k in data) {
    url += ((url.indexOf('=') !== -1) ? '&' : '') + k + '=' + encodeURI(data[k])
  }
  return url
}

export {
  get,
  post
}
