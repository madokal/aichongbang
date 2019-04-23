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
        setNoshopsAy(state, noshops) {
            state.noshops = noshops;
        },
        setShopsedAy(state, shopsed) {
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
            axios({
                method: "get",
                url: "/shopSys/shopsed",
            }).then(res => {
                commit("setShopsedAy", res.data);
                let total = res.data.length;
                commit("setPagination", {total});
            });
        },
        setNoshops({ commit, state }, rule = {}) {
            axios({
                method: "get",
                url: "/shopSys/noshops",
            }).then(res => {
                commit("setNoshopsAy", res.data);
                let total = res.data.length;
                commit("setPagination", {total});
            });
        },
        setSearchShopsed({ commit, state }, rule = {}) {
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
                commit("setShopsed", newShops);
                let total = newShops.length;
                commit("setPagination", {total});
            });
        },
        setSearchNoshops({ commit, state }, rule = {}) {
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
                commit("setNoshops", newShops);
                let total = newShops.length;
                commit("setPagination", {total});
            });
        },

    }
};
