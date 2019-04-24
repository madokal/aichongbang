<template>
  <div style="width:1400px; margin:auto">
    <h1 class="title">门店申请</h1>
   
<el-card class="box-card">
  <div slot="header" class="head">
      <el-steps :active="1" align-center>
        <el-step title="step1" description="基本信息填写"></el-step>
        <el-step title="step2" description="门店审核中..."></el-step>
        <el-step title="step3" description="审核完成"></el-step>
      </el-steps>
  </div>
<el-form :model="ruleForm2" :inline="true" :rules="rules2"  size="small" label-width="160px" ref="ruleForm2" class="el-form">
      <el-form-item label="店名：" prop="name" >
          <el-input v-model="ruleForm2.name" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label="营业地址：" prop="permitAddr" >
        <el-input v-model="ruleForm2.permitAddr" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label="营业执照号码：" prop="permitNum">
          <el-input v-model="ruleForm2.permitNum" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label="法人：" prop="legalPerson" >
          <el-input v-model="ruleForm2.legalPerson" style="width:250px"></el-input>
      </el-form-item>
           <el-form-item label="营业执照图片：" prop="permitImage" >
        <div style="width:250px;border:1px solid #e5e5e5;padding:10px;box-sizing:border-box">
          <el-upload
            class="avatar-uploader"
            action="/shopApply/upload"
            :limit="1"
            :on-success="handlePermitImageSuccess">
            <img v-if="permitImageUrl" :src="permitImageUrl" style="width:100%" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="头图：" prop="logo" >
        <div style="width:250px;border:1px solid #e5e5e5;padding:10px;box-sizing:border-box" >
          <el-upload
            class="avatar-uploader"
            action="/shopApply/upload"
            :limit="1"
            :on-success="handleLogoImageSuccess">
            <img v-if="logoImageUrl" :src="logoImageUrl" style="width:100%" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
       <el-form-item label="联系电话：" prop="tel" >
          <el-input v-model="ruleForm2.tel" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label="特色：" prop="special" >
          <el-input v-model="ruleForm2.special" style="width:250px"></el-input>
      </el-form-item>
 
      <el-form-item label="定位：" prop="location">
          <el-input type="password" v-model="ruleForm2.confirm" style="width:250px"></el-input>
      </el-form-item>
     
        <el-form-item label="定位：" prop="location" style="visibility: hidden;">
          <el-input type="password" v-model="ruleForm2.confirm" style="width:250px"></el-input>
        </el-form-item>
    
      <div>
      <el-form-item class="bottom">
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
      </div>
</el-form>
</el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      permitImageUrl: "",
      logoImageUrl: "",
      ruleForm2: {
        name: "",
        permitNum: "",
        permitAddr: "",
        tel: "",
        legalPerson: "",
        special: "",
        permitImage: "",
        logo: ""
      },
      rules2: {
        name: [
          {
            required: true,
            message: "请输入店名",
            trigger: "blur"
          }
        ],
        permitNum: [
          {
            required: true,
            message: "请输入营业执照号",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          },
          {
            pattern: /^1\d{10}$/,
            message: "手机号格式不正确",
            trigger: "change"
          }
          // {
          //   validator: this.validateTel,
          //   trigger: "blur"
          // }
        ],
        legalPerson: [
          {
            required: true,
            message: "请输入法人姓名",
            trigger: "blur"
          }
        ],
        permitAddr: [
          {
            required: true,
            message: "请输入营业地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handlePermitImageSuccess(res, file) {
      this.permitImageUrl = URL.createObjectURL(file.raw);
      this.ruleForm2.permitImage = res;
    },
    handleLogoImageSuccess(res, file) {
      this.logoImageUrl = URL.createObjectURL(file.raw);
      this.ruleForm2.logo = res;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/shopApply",
            data: {
              name: this.ruleForm2.name,
              permitNum: this.ruleForm2.permitNum,
              permitAddr: this.ruleForm2.permitAddr,
              tel: this.ruleForm2.tel,
              legalPerson: this.ruleForm2.legalPerson,
              special: this.ruleForm2.special,
              storeStatus: "0",
              workers: [],
              VIPlevel: "0",
              commission: "1%",
              permitImage: this.ruleForm2.permitImage,
              logo: this.ruleForm2.logo
            }
          }).then(res => {
            this.$router.push("/shopApplying");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.upload-demo {
  width: "250px";
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
