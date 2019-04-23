import axios from "axios";
export default {
    namespaced: true,
    state: {
        shops: [],
        shop: {
            VIPlevel: "",
            commission: ""
        },
        pagination: {},
        searchInfo: {
            type: "",
            value: ""
        },
        visible: false,
    },
    mutations: {
        setShops(state, shops) {
            state.shops = shops;
        },
        setShop(state, shop) {
            state.shop = shop;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setSearchInfo(state, searchInfo) {
            state.searchInfo = searchInfo;
        },
        setVisible(state, visible) {
            state.visible = visible;
        },
    },
    actions: {
        setShops({ commit }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = rule.type || "";
            let value = rule.value || "";
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                commit("setShops", res.data.rows);
                commit("setPagination", res.data);
            });
        },
        setShops1({ commit }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = rule.type || "";
            let value = rule.value || "";
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                let shops = res.data.rows;
                let newShops = [];
                for (let i of shops) {
                    if (i.storeStatus == 1) {
                        newShops.push(i)
                    }
                }
                commit("setShops", newShops);
                commit("setPagination", res.data);
            });
        },
        setShop2({ commit }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = rule.type || "";
            let value = rule.value || "";
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                let shops = res.data.rows;
                let newShops = [];
                for (let i of shops) {
                    if (i.storeStatus == 0) {
                        newStores.push(i)
                    }
                }
                commit("setShops", newShops);
                commit("setPagination", res.data);
            });
        }
    }
};
