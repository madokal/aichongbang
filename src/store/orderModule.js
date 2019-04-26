import axios from "axios";
export default {
    namespaced: true,
    state: {
        orders: [],
        dealSuccess: [],
        dealWait: [],
        pagenation: {},
        storeId: ""
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
<<<<<<< HEAD
=======
            // console.log(state.orders,"or")
>>>>>>> 8f333c82cc2d95403dc3762e1966b612f556b7d8
        },
        setDealSuccess(state, dealSuccess) {
            state.dealSuccess = dealSuccess;
        },
        setDealWait(state, dealWait) {
            state.dealWait = dealWait;
        },
        setPagenation(state, pagenation) {
            state.pagenation = pagenation;
        },
        setStoreId(state, storeId) {
            state.storeId = storeId;
            console.log(storeId,"storeId")
        }
    },
    actions: {
        getOrders({ commit }, rule = {}) {
            let storeId = rule.storeId || "";
            let orderStatus = rule.orderStatus || "";
            let orderDeal = rule.orderDeal || "";
            let type = rule.type || "";
            let value = rule.value || "";
            let page = rule.page || 1;
            let rows = rule.rows || 3;
            if (orderStatus) {
                axios({
                    method: "get",
                    url: "/order",
                    params: { page, rows, type, value, status: orderStatus,storeId }
                }).then(res => {
                    console.log(res.data, "orderStatus,修改")
                    commit("setOrders", res.data.rows);
                    commit("setPagenation", res.data);
                });
            } else if (orderDeal) {
                axios({
                    method: "get",
                    url: "/order",
                    params: { page, rows, type, value, deal: orderDeal,storeId }
                }).then(res => {
                    console.log(res.data, "orderDeal,修改")
                    commit("setOrders", res.data.rows);
                    commit("setPagenation", res.data);
                });
            }
        },
        getStoreId({ commit }) {
            axios({
                method: "get",
                url: "/order/getSession"
            }).then((res) => {
                let userId = res.data._id;
                axios({
                    method:"post",
                    url:"/order/"+userId,
                    data:{
                        id:userId
                    }
                }).then((res)=>{
                    console.log(res.data,"store")
                    let storesId = res.data[0]._id;
                    commit("setStoreId", storesId);
                });
            });
        }
    }
}