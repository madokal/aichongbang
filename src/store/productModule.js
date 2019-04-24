import axios from "axios";
export default {
  namespaced: true,
  state: {
     products: [],
     product: {
      name: "",
      commodityType: "",
      textureOrMade: "",
      size: "",
      exclusiveSize: "",
      weight: "",
      taste: "",
      specialFunc: "",
      palce: "",
      madeDate: "",
      shelfLife: "",
      supplier: "",
      info: "",
      price: "",
      pictures: "",
      id: "",
      visible: false
    },
    searchRule: {
      type: "",
      value: ""
    },
    pagenation: {}
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setUpdateVis(state, visible) {
      state.product = { ...state.product, visible };
    },
    setProduct(state, product) {
      state.product = { ...product, visible: true };
    },
    setSearchRule(state, searchRule) {
      state.searchRule = searchRule;
    },
    setPagenation(state, pagenation) {
      state.pagenation = pagenation;
    },
    
  },
  actions: {
    getProducts({ commit }, rule = {}) {
      let page = rule.page || 1;
      let rows = rule.rows || 10;
      let type = rule.type || "";
      let value = rule.value || "";
      axios({
        method: "get",
        url: "/product",
        params: { page, rows, type, value }
      }).then(res => {
        commit("setProducts", res.data.rows);
        commit("setPagenation", res.data);
      });
    },
    addProduct({ commit }, addMess) {
      axios({
        method: "post",
        url: "/product",
        data: addMess
      }).then(res => {});
    },
    deleteProduct({ commit }, id) {
      axios({
        method: "delete",
        url: "/product/" + id
      }).then(res => {});
    },
    updateProduct({ commit }, data) {
      axios({
        method: "put",
        url: "/product/" + data._id,
        data: {
          name: data.name,
          commodityType: data.commodityType,
          textureOrMade:data.textureOrMade,
          size: data.size,
          exclusiveSize: data.exclusiveSize,
          weight:data.weight,
          taste: data.taste,
          specialFunc: data.specialFunc,
          palce: data.palce,
          madeDate: data.madeDate,
          shelfLife: data.shelfLife,
          supplier: data.supplier,
          info: data.info,
          price: data.price,
          pictures: data.pictures,
        }
      }).then(res => {});
    },
    getUpdateProduct({ commit }, id) {
      axios({
        method: "get",
        url: "/product/" + id
      }).then(res => {
        commit("setProduct", res.data);
      });
    },
   
  }
};
