import axios from "axios";
export default {
  namespaced: true,
  state: {
    userSys: [], //  所有平台管理员数据
    pagation: {},
    oneUser: {}, //一条数据
    updateVisible: false
  },
  mutations: {
    setUserSys(state, userSys) {
      state.userSys = userSys;
    },
    setOneUser(state, oneUser) {
      state.oneUser = oneUser;
    },
    setPagation(state, pagation) {
      state.pagation = pagation;
    },
    setVisible(state, updateVisible) {
      state.updateVisible = updateVisible;
    }
  },
  getters: {},
  actions: {
    setUserSys({ commit }, payload = {}) {
      let page = payload.page || 1;
      let rows = payload.rows || 5;
      let type = payload.type;
      let value = payload.value;
      axios({
        method: "get",
        url: "/users",
        params: { page, rows, type, value }
      }).then(res => {
        console.log(res);
        commit("setUserSys", res.data.rows);
        commit("setPagation", res.data);
      });
    },
    setOneUser({ commit }, id) {
      console.log(id)
      axios({
        method: "get",
        url: "/users/" + id
      }).then(res => {
        commit("setOneUser", res.data);
      });
    },
    setVisible({ commit }, isTrue) {
      commit("setVisible", isTrue);
    }
  }
};
