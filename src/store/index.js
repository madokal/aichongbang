import Vue from "vue";
import Vuex from "vuex";
<<<<<<< HEAD
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
=======
import serviceModule from './serviceModule.js'
import serviceTypeModule from './serviceTypeModule.js'
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    serviceModule,
    serviceTypeModule
>>>>>>> mkx
  }
});
