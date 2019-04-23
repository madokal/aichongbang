<template>
  <el-container>
    <el-header style="display:flex; font-size: 12px; justify-content: space-between;">
      <h1>管理门店</h1>
      <div>
        <el-button type="primary">登出</el-button>
        <span>admin</span>
      </div>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="url" :default-openeds="[`${url}`]">
          <el-menu-item index="/shopManage/product">商品管理</el-menu-item>
          <el-menu-item index="/shopManage/service">服务管理</el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              订单管理
            </template>
            <el-menu-item index="/shopManage/order/productOrder">商品订单</el-menu-item>
            <el-menu-item index="/shopManage/order/serveOrder">服务订单</el-menu-item>
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
export default {
  data() {
    return {
      url: this.$router.history.current.path
    };
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
