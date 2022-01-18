import Cookies from 'js-cookie'

const TokenKey = 'mobile_user'

// 获取移动端token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置移动端token
export function setToken(token) {
  // return Cookies.set(TokenKey, token, { expires: 1 / 3600 * process.env.VUE_APP_BASE_TIME })
  // return Cookies.set(TokenKey, token, { expires: 2 })
  return Cookies.set(TokenKey, token)
}


// 移除移动端token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

