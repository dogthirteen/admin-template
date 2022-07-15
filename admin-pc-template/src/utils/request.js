import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { system } from "@/utils/system";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_PHP_BASE_API,
  timeout: 20000
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers['Authorization'] = encodeURIComponent(getToken());
    }

    config.headers['appkey'] = process.env.VUE_APP_KEY;
    config.headers['version'] = process.env.VUE_APP_VERSION;
    config.headers['device'] = system();
    config.headers['P3P'] =
      "CP='IDC DSP COR CURa ADMa  OUR IND PHY ONL COM STA'";
    config.headers['platform'] = 1;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    console.log('response', response);
    const res = response.data
    if (res.code === 1) {
      return res
    } else if (res.code === 10003) {
      let token = getToken()
      if (token) {
        window.location.reload();
      } else {
        Message({
          message: res.msg || '请求失败了,请稍后重试!',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(res || '请求失败了,请稍后重试!')
      }
    } else {
      Message({
        message: res.msg || '请求失败了,请稍后重试!',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res || '请求失败了,请稍后重试!')
    }
  },
  error => {
    Message({
      message: '网络太慢了,请重试',
      type: 'warning',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service