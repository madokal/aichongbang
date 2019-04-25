import axios from "axios";
export default {
  namespaced: true,
  state: {
    serviceTypes: [],
    serviceType: {
      _id: "",
      name: "",
      priceTypes: {
        gold: "",
        platinum: "",
        diamond: ""
      }
    },
    pagination: {},
    visible: false,
    type: "name",
    value: ""
  },
  mutations: {
    setServiceTypes(state, serviceTypes) {
      state.serviceTypes = serviceTypes;
    },
    setServiceType(state, serviceType) {
      state.serviceType = serviceType;
    },
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
    setVisible(state, visible) {
      state.visible = visible
    },
    setType(state, type) {
      state.type = type
    },
    setValue(state, value) {
      state.value = value
    }

  },
  actions: {
    setServiceTypes({ commit }, rule = {}) {
      let page = rule.page || 1;
      let rows = rule.rows || 5;
      let type = rule.type || "";
      let value = rule.value || "";
      axios({
        method: "get",
        url: "/service/getSession",
      }).then(res => {
        let storeId = res.data;
        axios({
          method: "get",
          url: "/service/getServiceType",
          params: { page, rows, type, value, storeId }
        }).then(res => {
          commit("setServiceTypes", res.data.rows);
          commit("setPagination", res.data);
        });
      })
    },
    setServiceType({ commit }, id) {
      axios({
        method: "get",
        url: "/service/serviceType/" + id
      }).then(res => {
        commit("setServiceType", res.data);
      });
    }
  }
};
