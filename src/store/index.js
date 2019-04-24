import Vue from "vue";
import Vuex from "vuex";
import productModule from './productModule.js'
import newModule from './newModule.js'
import studentModule from './studentModule.js'
import shops from './shops.js'
import serviceModule from './serviceModule.js'
import serviceTypeModule from './serviceTypeModule.js'
import orderModule from "./orderModule"
Vue.use(Vuex);
export default new Vuex.Store({
  strict:true,
  modules:{
    serviceModule,
    serviceTypeModule,
    productModule,
    newModule,
    studentModule,
    shops,
    orderModule
  }
});
