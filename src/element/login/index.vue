<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>登陆</span>
    </div>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm2.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        phone: "",
        pass: ""
      },
      rules2: {
        phone: [
          { validator: validatePhone, trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "手机号格式不正确",
            trigger: "change"
          }
        ],
        pass: [
          { validator: validatePass, trigger: "blur" },

          {
            pattern: /^[\D\d]{6,}$/,
            message: "密码格式不正确(6位以上任意字符)",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/users/login",
            data: {
              phone: this.ruleForm2.phone,
              pwd: this.ruleForm2.pass
            }
          }).then(res => {
            if (res.data.status == 1) {
              this.$router.push("/manage");
            } else {
              alert("账号/密码有误");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    }
  }
};
</script>

<style scoped>
.box-card {
  width: 480px;
  margin: auto;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
