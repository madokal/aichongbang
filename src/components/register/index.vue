<template>
  <el-card class="box-card">
    <h1>注册</h1>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="登录名" prop="loginName">
        <el-input type="text" v-model="ruleForm2.loginName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="ruleForm2.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm2.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm2.email"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="ruleForm2.realName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    let validateLoginName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("登录名不能为空"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        if (
          /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
            value
          )
        ) {
          callback();
        } else {
          callback(new Error("邮箱格式不正确"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm2.checkPass !== "") {
            this.$refs.ruleForm2.validateField("checkPass");
          }
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else {
          //手机号验重
          if (/^1\d{10}$/.test(value)) {
            axios({
              method: "get",
              url: "/register/login",
              params: {
                tel: value
              }
            }).then(res => {
              if (res.data.status == 0) {
                callback(new Error("该手机号已注册，请重新输入"));
              } else {
                callback();
              }
            });
          } else {
            callback(new Error("请输入11位手机号"));
          }
        }
      }
    };
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else {
        if (value === "") {
          callback(new Error("请输入真实姓名"));
        } else {
          if (/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
            callback();
          } else {
            callback(new Error("请输入2-4位中文姓名"));
          }
        }
      }
    };
    let validateRole = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("角色不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pwd: "",
        checkPass: "",
        email: "",
        phone: "",
        loginName: "",
        realName: "",
        role: ""
      },
      rules2: {
        pwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        loginName: [{ validator: validateLoginName, trigger: "blur" }],
        realName: [{ validator: validateName, trigger: "blur" }],
        role: [{ validator: validateRole, trigger: "blur" }]
      },
      options: [

      ],
      value: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.$refs[formName].model);
        if (valid) {
          axios({
            method: "post",
            url: "/register",
            data: {
              tel: this.$refs[formName].model.phone,
              pwd: this.$refs[formName].model.pwd,
              userName: this.$refs[formName].model.loginName,
              email: this.$refs[formName].model.email,
              trueName: this.$refs[formName].model.realName,
              role:"店铺管理员",
              storeStatus:"未开店"
            }
          }).then(res => {
            alert("恭喜注册成功！");
            this.$router.push("/login");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.box-card {
  width: 480px;
  margin: 50px auto;
}
h1 {
  text-align: center;
}
</style>

