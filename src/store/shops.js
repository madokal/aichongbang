import axios from "axios";
export default {
    namespaced: true,
    state: {
        shops: [],
        shop: {
            VIPlevel: "",
            commission: ""
        },
        tabName: "first",
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
        setTabName(state, tabName) {
            state.tabName = tabName;
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
        setShops({ commit ,state}, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = state.searchInfo.type;
            let value = state.searchInfo.value;
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                commit("setShops", res.data.rows);
                commit("setPagination", res.data);
            });
        },
        setShops1({ commit ,state}, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = state.searchInfo.type;
            let value = state.searchInfo.value;
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
        setShops2({ commit ,state}, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 5;
            let type = state.searchInfo.type;
            let value = state.searchInfo.value;
            axios({
                method: "get",
                url: "/shopSys",
                params: { page, rows, type, value }
            }).then(res => {
                let shops = res.data.rows;
                let newShops = [];
                for (let i of shops) {
                    if (i.storeStatus == 0) {
                        newShops.push(i)
                    }
                }
                commit("setShops", newShops);
                commit("setPagination", res.data);
            });
        }
    }
};
