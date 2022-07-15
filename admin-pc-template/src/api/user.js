import request from "@/utils/request";
import encrypt from "@/utils/encrypt";
import qs from "qs";

// 登录
export function login(data) {
  return request({
    url: `/api/login`,
    method: "POST",
    data: qs.stringify(encrypt(data))
  });
}

export function logOut(data) {
  return request({
    url: `/api/logout`,
    method: "POST",
    data: qs.stringify(encrypt(data))
  });
}

// 测试获取路由
export const getAuthority = data => {
  return request({
    url: `/api/v1/menu/getAuthority`,
    method: "POST",
    data: qs.stringify(encrypt(data))
  });
};

// 获取用户信息
export function getUinfo(data) {
  return request({
    url: "/api/user/getUinfo",
    method: "GET",
    params: encrypt(data)
  });
}

//获取权限用户后台系统
export const getUserSystem = (data = {}) => {
  return request({
    url: `/api/v1/system/sysurl`,
    method: "GET",
    data: qs.stringify(data)
  });
};
