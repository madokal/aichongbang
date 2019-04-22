<template>
  <el-container>
    <el-header style="display:flex; font-size: 12px; justify-content: space-between;">
      <h1>学生管理系统</h1>
      <div>
        <el-button type="primary" @click="outLogin">退出</el-button>
        <span>{{userName}}</span>
      </div>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="url" :default-openeds="[`${url}`]">
          <el-menu-item index="/manage/students">学生管理</el-menu-item>
          <el-menu-item index="/manage/teachers">老师管理</el-menu-item>
          <el-menu-item index="/manage/classes">班级管理</el-menu-item>
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
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "studentModule"
);
export default {
  data() {
    return {
      url: this.$router.history.current.path
    };
  },
  computed: {
    ...mapState(["userName"])
  },
  created() {
    this.getSession();
  },
  beforeUpdate() {
    this.getSession();
  },
  methods: {
    ...mapMutations(["setUserName"]),
    ...mapActions(["getSession", "removeSession"]),
    outLogin() {
      this.removeSession();
      this.$router.push("/");
    },
    getSession() {
      axios({
        method: "get",
        url: "/getSession"
      }).then(res => {
        if (res.data) {
          if (!this.userName) {
            this.setUserName(res.data);
          }
        } else {
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
