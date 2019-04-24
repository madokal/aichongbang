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
            console.log(state.orders,"or")
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
            let allOrders = rule.allOrders || "";
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = rule.type || "";
            let value = rule.value || "";
            if (allOrders == "订单" || allOrders == "服务") {
                axios({
                    method: "get",
                    url: "/order",
                    params: { page, rows, type, value, allOrders }
                }).then(res => {
                    console.log(res.data, "ppp")
                    commit("setOrders", res.data);
                    commit("setPagenation", res.data);
                });
            } else {
                axios({
                    method: "get",
                    url: "/order/orders",
                    params: { page, rows, type, value, allOrders }
                }).then(res => {
                    console.log(res.data, "ssss")
                    commit("setOrders", res.data);
                    commit("setPagenation", res.data);
                });
            }
        }
    }
}