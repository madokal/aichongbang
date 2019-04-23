import axios from 'axios'

export default ({
  namespaced:true,
  state:{
    supplier:{},
    suppliers:[],
    pagination:{},
    visible:false,
    searchRule:{
      type: '',
    value:''
    }
  },
  mutations:{
      setSupplier(state,supplier){
        state.supplier=supplier;
      },
      setSuppliers(state,suppliers){
        state.suppliers=suppliers;
      },
      setPagination(state,pagination){
        state.pagination=pagination;
    },
      setVisible(state,flag){
        state.visible =flag;
    },
  },
  actions: {
    //渲染=show函数
    getSuppliers({commit}, payload = {}) {
        let page = payload.page || 1;
        let rows = payload.rows || 5;
        let type = payload.type || '';
        let value = payload.value || '';
        axios({
            method: 'get',
            url: '/supplier',
            params: {
                page,
                rows,
                type,
                value
            }
        }).then((res) => {
            commit("setSuppliers", res.data.rows);
            commit("setPagination", res.data);
        })
    },
    getSupplier({commit}, id){
        axios({
            method: 'get',
            url: '/supplier/' + id,
        }).then((res) => {
            commit("setSupplier", res.data);
        })
    }
}
});