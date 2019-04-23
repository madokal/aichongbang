import Vue from "vue";
import Vuex from "vuex";
import studentModule from './studentModule.js'
import shops from './shops.js'

Vue.use(Vuex);
export default new Vuex.Store({
  strict:true,
  modules:{
    studentModule,
    shops
  }
});
