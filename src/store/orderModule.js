import axios from "axios";
export default {
    namespaced: true,
    state: {
        orders: [],
        dealSuccess: [],
        dealWait: [],
        pagenation: {},
        session: {}
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
        },
        setSession(state, session) {
            state.session = session;
        }
    },
    actions: {
        getOrders({ commit }, rule = {}) {
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
                    params: { page, rows, type, value, status: orderStatus }
                }).then(res => {
                    console.log(res.data, "orderStatus,修改")
                    commit("setOrders", res.data.rows);
                    commit("setPagenation", res.data);
                });
            } else if (orderDeal) {
                axios({
                    method: "get",
                    url: "/order",
                    params: { page, rows, type, value, deal: orderDeal }
                }).then(res => {
                    console.log(res.data, "orderDeal,修改")
                    commit("setOrders", res.data.rows);
                    commit("setPagenation", res.data);
                });
            }
        },
        getSession({ commit }) {
            axios({
                method: "get",
                url: "/order/getSession"
            }).then((res) => {
                console.log(res.data, "session");
                commit("setSession", res.data);
            });
        }
    }
}