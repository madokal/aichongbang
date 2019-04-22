import axios from "axios";
export default {
    namespaced: true,
    state: {
        stores: [],
        pagination: {},
        searchInfo: {
            type: "",
            value: ""
        },
    },
    mutations: {
        setStoresAsync(state, stores) {
            state.stores = stores;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setSearchInfo(state, searchInfo) {
            state.searchInfo = searchInfo;
        }
    },
    actions: {
        setStores({ commit }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = rule.type || "";
            let value = rule.value || "";
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                commit("setStoresAsync", res.data.rows);
                commit("setPagination", res.data);
            });
        },
        setStores1({ commit }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = rule.type || "";
            let value = rule.value || "";
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                let stores = res.data.rows;
                let newStores = [];
                for (let i of stores) {
                    if (i.storeStatus == 1) {
                        newStores.push(i)
                    }
                }
                commit("setStoresAsync", newStores);
                commit("setPagination", res.data);
            });
        },
        setStores2({ commit }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = rule.type || "";
            let value = rule.value || "";
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                let stores = res.data.rows;
                let newStores = [];
                for (let i of stores) {
                    if (i.storeStatus == 0) {
                        newStores.push(i)
                    }
                }
                commit("setStoresAsync", newStores);
                commit("setPagination", res.data);
            });
        }
    }
};
