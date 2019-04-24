<template>
  <el-container>
    <el-header style="display:flex; font-size: 12px; justify-content: space-between;">
      <h1>管理门店</h1>
     <div>
        <span class="user">{{user.userName}}</span>
         <el-button type="primary" icon="el-icon-error"  style="margin-top:8px;margin-left:8px;"   circle @click="logout"></el-button>        
      </div>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="url" :default-openeds="[`${url}`]">
          <el-menu-item index="/shopManage/product">商品管理</el-menu-item>
          <el-submenu index="1">
            <template slot="title">服务管理</template>
            <el-menu-item-group>
              <el-menu-item index="/shopManage/service">服务列表</el-menu-item>
              <el-menu-item index="/shopManage/serviceType">服务类型</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              订单管理
            </template>
            <el-menu-item index="/shopManage/order/productOrder">商品订单</el-menu-item>
            <el-menu-item index="/shopManage/order/serveOrder">服务订单</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              统计
            </template>
            <el-menu-item index="/shopManage/statistics/manageCityServeTotal">城市服务</el-menu-item>
            <el-menu-item index="/shopManage/statistics/manageCityTradeTotal">城市商品</el-menu-item>
            <el-menu-item index="/shopManage/statistics/manageServeTotal">服务统计</el-menu-item>
            <el-menu-item index="/shopManage/statistics/manageTradeTotal">商品统计</el-menu-item>
            <el-menu-item index="/shopManage/statistics/mapCityShopStatistics">城市店铺分布</el-menu-item>
            <el-menu-item index="/shopManage/statistics/shopServeTotal">店铺服务</el-menu-item>
            <el-menu-item index="/shopManage/statistics/shopTradeTotal">店铺商品</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
   data() {
    return {
      user: {}
    };
  },
  computed: {},
  methods: {
    logout() {
      axios({
        method: "get",
        url: "/login/removeSession"
      }).then(() => {
        this.$router.replace("/login");
      });
    },
    getSession() {
      axios({
        method: "get",
        url: "/login/getSession"
      }).then(({ data }) => {
        if (!data.userName) {
          this.$router.replace("/login");
        } else {
          if (!this.user.userName) {
            this.user = data;
          }
        }
      });
    }
  },
  beforeupdate() {
    console.log("before");
    this.getSession();
  },
  created() {
    this.getSession();
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  color: #333;
}
</style>
