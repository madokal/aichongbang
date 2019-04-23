import Vue from "vue";
import Vuex from "vuex";
import studentModule from './studentModule.js'
Vue.use(Vuex);
export default new Vuex.Store({
  strict:true,
  modules:{
    studentModule
  },
  state:{},
  mutations:{},
  actions:{}
});
