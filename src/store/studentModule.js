import axios from "axios";
export default {
  namespaced: true,
  state: {
    petMaster: [],
    pagination:{},
    petMasterinfor:{},
    // visible:false
  },
  mutations: {
    setPetMaster(state, petMaster) {
      state.petMaster = petMaster;
    },
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
    setPetMasterinfor(state,petMasterinfor){
      state.petMasterinfor = petMasterinfor;
    },
    // setVisible(state,boolean){
    //   state.visible = boolean;
    // }
  },
  actions: {
    setPetMaster({
      commit
    },payload = {}){
        let page = payload.page || 1;
        let rows = payload.rows || 5;
        let type = payload.type || 'name';
        let value = payload.value || '';
        axios({
          method: "get",
          url: "/petMaster",
          params: { page, rows ,type,value}
        }).then((res) => {
             commit('setPetMaster',res.data.rows);
             commit('setPagination',res.data);
        });
    },
    setPetMasterinfor({
      commit
    },id){
      axios({
           method:'get',
           url:'/petMaster/'+id
      }).then((res) =>{
         commit('setPetMasterinfor',res.data)
      })
    }
  }
};
