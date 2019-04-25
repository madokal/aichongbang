<template>
 <el-card class="box-card">
   <h2>登录</h2>
  <el-tabs type="border-card" class="box" :stretch="true">
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-date"></i>商家登录
      </span>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="tel" style="margin-right:60px">
          <el-input type="text" v-model="ruleForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" style="margin-right:60px">
          <el-input type="telword" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:130px">提交</el-button>
          <el-button @click="resetForm('ruleForm')" style="width:130px">重置</el-button>
        </el-form-item>
        <a href="/register" ><h5 style="margin-left:100px">无账号？前往注册</h5></a>
      </el-form>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-goods"></i> 管理登录
      </span>

       <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="tel2" style="margin-right:60px">
          <el-input type="text" v-model="ruleForm2.tel2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd2" style="margin-right:60px">
          <el-input type="telword" v-model="ruleForm2.pwd2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm2('ruleForm2')"  style="width:130px">提交</el-button>
          <el-button @click="resetForm2('ruleForm2')"  style="width:130px">重置</el-button>
        </el-form-item>
      </el-form>
      
    </el-tab-pane>
  </el-tabs>
   </el-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // 商家登录验证
    var checktel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (value.toString().length != 11) {
          callback(new Error("账号格式不正确"));
        } else {
          callback();
        }
      });
    };
    var validatetel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        if (value.toString().length < 6) {
          callback(new Error("密码不少于6位"));
        } else {
          callback();
        }
      });
    };
    //管理员登录验证
    var checktel2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (value.toString().length != 11) {
          callback(new Error("账号格式不正确"));
        } else {
          callback();
        }
      });
    };
    var validatetel2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        if (value.toString().length < 6) {
          callback(new Error("密码不少于6位"));
        } else {
          callback();
        }
      });
    };

    return {
      ruleForm: {
        tel: "",
        pwd: ""
      },
      ruleForm2: {
        tel2: "",
        pwd2: ""
      },
      rules: {
        tel: [{ validator: checktel, trigger: "blur" }],
        pwd: [{ validator: validatetel, trigger: "blur" }],

      },
       rules2: {
        tel2: [{ validator: checktel2, trigger: "blur" }],
        pwd2: [{ validator: validatetel2, trigger: "blur" }]
      }
    };
  },
  methods: {
    //商家登录判断
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        axios({
              method: "post",
              url: "/login/dengs",
              data: {
                tel: this.$refs[formName].model.tel,
                pwd: this.$refs[formName].model.pwd
              }
            }).then(res => {
                 console.log(11);
              console.log(res.data);
              if (res.data.status == 1) {
                // 未开店  跳转店铺申请页面
                alert("无店铺信息!点击确定跳转申请店铺！");
                this.$router.push({path:"/shopApply",query:{id:res.data.id}});
              } else if(res.data.status == 2){
                //已开店   跳转店铺管理页面               
                 this.$router.push({path:"/shopManage",query:{id:res.data.id}});
              }else if(res.data.status == 3){
                //待审核    跳转店铺审核状态页面
                this.$router.push({path:"/shopApplying",query:{id:res.data.id}});             
              }else if(res.data.status == 4){
                //已封店   跳转店铺封店状态告知页面

                 this.$router.push({path:"/shopApplyed",query:{id:res.data.id}});       
              }else {
                alert("账号或密码错误，请重新输入");
              }
            });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
      //管理员登录
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
           axios({
              method: "post",
              url: "/login/deng",
              data: {
                tel: this.$refs[formName].model.tel2,
                pwd: this.$refs[formName].model.pwd2
              }
            }).then(res => {
              console.log(res.data);
              if (res.data.status == 1) {
                alert("恭喜登录成功!进入系统管理界面");
                this.$router.push("manage");
              } else {
                alert("你不是管理员或账号密码错误，请重新输入");
              }
            });
      });
    },
    resetForm2(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.box-card {
  width: 500px;
  margin: 50px auto;
}
h2{
  color:rgb(77, 212, 230);
}
</style>
