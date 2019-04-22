<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>注册</span>
    </div>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="registerForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm2.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        phone: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "手机号格式不正确",
            trigger: "change"
          },
          { validator: this.validatePhone, trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
    validatePhone: (rule, value, callback) => {
      axios({
        method: "get",
        url: "/users/samePhone",
        params: {
          phone: value
        }
      }).then(res => {
        if (res.data.status == 0) {
          callback(new Error("账号已存在"));
        } else {
          callback();
        }
      });
    },
    submitForm(registerForm) {
      this.$refs[registerForm].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/users/register",
            data: {
              phone: this.ruleForm2.phone,
              pwd: this.ruleForm2.pass
            }
          }).then(res => {
            this.$router.push("/");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(registerForm) {
      this.$refs[registerForm].resetFields();
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
