import { asyncRoutes, constantRoutes } from "@/router";

/**
 * Use meta.role to determine if the current user has permission
 * @param roleList
 * @param route
 */
function hasPermission(roleList, route) {
  if (route.meta && route.meta.roles) {
    return roleList.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roleList
 */
export function filterAsyncRoutes(routes, roleList) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roleList, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roleList);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, roleList) {
    return new Promise(resolve => {
      let accessedRoutes;
      if (roleList.includes("admin")) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roleList);
      }
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
