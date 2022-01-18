import axios from 'axios'
import router from '@/router'
import { getToken } from '@/utils/auth'
import { Notify, Dialog } from 'vant'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = encodeURIComponent(getToken())
    }
    config.headers['platform'] = 2
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == 1) {
      return res
    } else if (res.code === 10003) {
      let token = getToken()
      console.log('token10003', token)
      if (token) {
        window.location.reload()
      } else {
        Dialog.alert({
          message: '登录已失效，请重新登录',
        }).then(() => {
          router.push({
            name: 'login',
          })
        })
        return Promise.reject(res || 'Error')
      }
    } else {
      console.log('调用接口失败了', res)
      Notify({
        type: 'warning',
        message: res.msg,
      })
    }
  },
  error => {
    console.log('调用接口失败了', error)
    Notify({
      type: 'warning',
      message: '网络太慢了，请重试',
    })
    return Promise.reject(error)
  }
)

export default service
