import Vue from "vue";
import Vuex from "vuex";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import productModule from './productModule.js'
import newModule from './newModule.js'
import studentModule from './studentModule.js'
import shops from './shops.js'

import orderModule from "./orderModule"
>>>>>>> 52935476ca36312b4d45ecc9cc75fad28bf40fbb
Vue.use(Vuex);
export default new Vuex.Store({
  strict:true,
  modules:{
<<<<<<< HEAD
=======
import serviceModule from './serviceModule.js'
import serviceTypeModule from './serviceTypeModule.js'
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    serviceModule,
    serviceTypeModule
>>>>>>> mkx
=======
    productModule,
    newModule,
    studentModule,
    shops,
    orderModule
>>>>>>> 52935476ca36312b4d45ecc9cc75fad28bf40fbb
  }
});
