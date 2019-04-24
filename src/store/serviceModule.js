import axios from "axios";
export default {
  namespaced: true,
  state: {
    services: [],
    service:{serviceType:{name:""}},
    pagination: {},
    visible:false,
    type: "name",
    value: ""
  },
  mutations: {
    setServices(state, services) {
      state.services = services;
    },
    setService(state, service) {
      state.service = service;
    },
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
    setVisible(state,visible){
      state.visible=visible
    },
    setType(state,type){
      state.type=type
    },
    setValue(state,value){
      state.value=value
    }

  },
  actions: {
    setServices({ commit }, rule = {}) {
      let page = rule.page || 1;
      let rows = rule.rows || 5;
      let type = rule.type || "";
      let value = rule.value || "";
      let storeId="5cbaf6105caaca6f075a087e";
      axios({
        method: "get",
        url: "/service",
        params: {page, rows, type, value,storeId }
      }).then(res => {
        commit("setServices", res.data.rows);
        commit("setPagination", res.data);
      });
    },
    setService({ commit }, id) {
      axios({
        method: "get",
        url: "/service/" + id
      }).then(res => {
        commit("setService", res.data);
      });
    }
  }
};
