import axios from "axios";
export default {
    namespaced: true,
    state: {
        noshops: [],
        shopsed: [],
        // shops: [],
        shop: {
            VIPlevel: "",
            commission: ""
        },
        auditShop: {},
        tabName: "first",
        pagination: {},
        searchInfo: {
            type: "",
            value: ""
        },
        visible: false,
        auditVisible: false,
    },
    mutations: {
        setNoshops(state, noshops) {
            state.noshops = noshops;
        },
        setShopsed(state, shopsed) {
            state.shopsed = shopsed;
        },
        setShop(state, shop) {
            state.shop = shop;
        },
        setAuditShop(state, auditShop) {
            state.auditShop = auditShop;
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
        setAuditVisible(state, auditVisible) {
            state.auditVisible = auditVisible;
        },
    },
    actions: {
        setShopsed({ commit, state }, rule = {}) {
            let page = rule.page || 1;
            axios({
                method: "get",
                url: "/shopSys/shopsed",
            }).then(res => {
                let total = res.data.length;
                let start = (page - 1) * 5;
                let end = page * 5;
                let newArr = res.data.slice(start, end);
                commit("setShopsed", newArr);
                commit("setPagination", { total });
            });
        },
        setNoshops({ commit, state }, rule = {}) {
            let page = rule.page || 1;
            axios({
                method: "get",
                url: "/shopSys/noshops",
            }).then(res => {
                let total = res.data.length;
                let start = (page - 1) * 5;
                let end = page * 5;
                let newArr = res.data.slice(start, end);
                commit("setNoshops", newArr);
                commit("setPagination", { total });
            });
        },
        setSearchShopsed({ commit, state }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 100;
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
                let page1 = rule.page1 || 1;
                let start = (page1 - 1) * 5;
                let end = page1 * 5;
                let newArr = newShops.slice(start, end);
                commit("setShopsed", newArr);
                let total = newShops.length || 0;
                commit("setPagination", { total });
            });
        },
        setSearchNoshops({ commit, state }, rule = {}) {
            let page = rule.page || 1;
            let rows = rule.rows || 100;
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
                let page1 = rule.page1 || 1;
                let start = (page1 - 1) * 5;
                let end = page1 * 5;
                let newArr = newShops.slice(start, end);
                commit("setNoshops", newArr);
                let total = newShops.length;
                commit("setPagination", { total });
            });
        },

    }
};
