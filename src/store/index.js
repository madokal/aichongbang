import Vue from "vue";
import Vuex from "vuex";
import orderModule from "./orderModule"
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    orderModule
  }
});
