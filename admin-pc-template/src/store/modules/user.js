import { login, getUinfo, logOut } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    roleList: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roleList) => {
    state.roleList = roleList;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.access_token);
          setToken(data.access_token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getUinfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUinfo({})
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { roleList, name, avatar } = data;

          if (!roleList || roleList.length <= 0) {
            reject("getUinfo: roleList must be a non-null array!");
          }

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_ROLES", roleList);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logOut().then((result) => {
        removeToken();
        resolve()
        resetRouter();
        commit("RESET_STATE");
      }).catch((err) => {
        reject(err);
      });
    })

  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
