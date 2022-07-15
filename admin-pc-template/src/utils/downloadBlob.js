import axios from "axios";
import {
  system
} from "@/utils/system";
import {
  getToken
} from '@/utils/auth'


export function downLoadBlob(url, param = '') {
  return axios({
    url: process.env.VUE_APP_PHP_BASE_API + url,
    timeout: 10000, // 请求超时时间10s
    headers: {
      //'Content-Type': 'application/x-zip-compressed',
      'Authorization': encodeURIComponent(getToken()),
      'version': process.env.VUE_APP_VERSION,
      'device': system(),
      'appkey': process.env.VUE_APP_KEY,
      'P3P': "CP='IDC DSP COR CURa ADMa  OUR IND PHY ONL COM STA'",
      'platform': 1,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    xhrFields: {
      withCredentials: true
    },
    method: 'POST',
    data: param,
    responseType: 'arraybuffer',
  });
}