<template>
  <el-container>
    <el-header style="display:flex; font-size: 12px; justify-content: space-between;">
      <h1>系统管理</h1>
      <div>
         <span class="user">{{user.tel}}</span>
         <el-button type="primary" icon="el-icon-error"  style="margin-top:8px;margin-left:8px;"   circle @click="logout"></el-button>
      </div>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="url" :default-openeds="[`${url}`]">
          <el-submenu index="/manage/userSys">
            <template slot="title">用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="/manage/userSys">平台管理员</el-menu-item>
              <el-menu-item index="/manage/shopManager">门店管理员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/manage/petMaster">宠主管理</el-menu-item>
          <el-menu-item index="/manage/shopSys">门店管理</el-menu-item>
          <el-menu-item index="/manage/supplier">供应商管理</el-menu-item>
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
      }).then((res) => {
        console.log(11,res.data.role)
        if (res.data.role !=="平台管理员") {
          this.$router.push("/login");
        } else{
          this.$router.push("/manage");
            this.user = res.data;
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
