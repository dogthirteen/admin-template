import phpHttp from "@/utils/phpHttp";
import encrypt from "@/utils/encrypt";
import qs from "qs";

// 登录
export function login(data) {
  return phpHttp({
    url: `/api/login`,
    method: "POST",
    data: qs.stringify(encrypt(data))
  });
}

export function logOut(data) {
  return phpHttp({
    url: `/api/logout`,
    method: "POST",
    data: qs.stringify(encrypt(data))
  });
}

// 测试获取路由
export const getAuthority = data => {
  return phpHttp({
    url: `/api/v1/menu/getAuthority`,
    method: "POST",
    data: qs.stringify(encrypt(data))
  });
};

// 获取用户信息
export function getUinfo(data) {
  return phpHttp({
    url: "/api/user/getUinfo",
    method: "GET",
    params: encrypt(data)
  });
}

//获取权限用户后台系统
export const getUserSystem = (data = {}) => {
  return phpHttp({
    url: `/api/v1/system/sysurl`,
    method: "GET",
    data: qs.stringify(data)
  });
};
