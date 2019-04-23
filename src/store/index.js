import Vue from "vue";
import Vuex from "vuex";
import productModule from './productModule.js'
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    productModule
  }
});
