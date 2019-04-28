import axios from "axios";
export default {
    namespaced: true,
    state: {
        orders: [],
        dealSuccess: [],
        dealWait: [],
        pagenation: {}
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
            // console.log(state.orders,"or")
        },
        setDealSuccess(state, dealSuccess) {
            state.dealSuccess = dealSuccess;
        },
        setDealWait(state, dealWait) {
            state.dealWait = dealWait;
        },
        setPagenation(state, pagenation) {
            state.pagenation = pagenation;
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
        }
    }
}