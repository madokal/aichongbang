import Vue from "vue";
import Vuex from "vuex";
import productModule from './productModule.js'
import newModule from './newModule.js'
import studentModule from './studentModule.js'
import shops from './shops.js'

Vue.use(Vuex);
export default new Vuex.Store({
  strict:true,
  modules:{
    productModule,
    newModule,
    studentModule,
    shops
  }
});
