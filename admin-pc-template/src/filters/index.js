import Vue from "vue";
import * as filters from "@/utils";

// 注册全局实用程序筛选器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
