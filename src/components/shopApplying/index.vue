<template>
  <div>
    <h1 class="title">门店申请</h1>
   
    <el-card class="box-card">
        <div slot="header" class="head">
            <el-steps :active="2" align-center>
                <el-step title="step1" description="基本信息填写"></el-step>
                <el-step title="step2" description="门店审核中..."></el-step>
                <el-step title="step3" description="审核完成"></el-step>
            </el-steps>
        </div>
        <div class="main">
            <p>门店审核中...</p>
        </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.title {
  text-align: center;
  letter-spacing: 1rem;

}
.bottom {
  text-align: center;
}
.box-card {
  width: 80%;
  margin: auto;
  text-align: center;
}
.head {
  font-size: 24px;
}
.main{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    letter-spacing: 1rem;
    color: darkgrey
}
</style>
