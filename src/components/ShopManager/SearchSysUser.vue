<template>

<div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择" class="select">
      <el-option label="真实姓名" value="trueName"></el-option>
      <el-option label="手机号" value="tel"></el-option>
      <el-option label="登录名" value="userName"></el-option>
      <!-- <el-option label="门店状态" value="status"></el-option> -->
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
</div>
     
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("shopManagerModule");
export default {
  data() {
    return {
      input5: "",
      select: ""
    };
  },
  methods: {
    ...mapActions(["setshopManagers"]),
    search() {
      this.setshopManagers({
        page: 1,
        rows: 5,
        type: this.select,
        value: this.input5
      });
    }
  }
};
</script>

<style scoped>
.input-with-select {
  background-color: #fff;
  width: 450px;

}
.select {
  width: 120px;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: #fff;
  outline: 0;

}
</style>