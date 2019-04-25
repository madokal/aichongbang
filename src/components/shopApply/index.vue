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
      <el-form-item label="联系电话：" prop="tel" >
          <el-input v-model="ruleForm2.tel" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label="营业地址：" prop="permitAddr" >
        <el-input v-model="ruleForm2.permitAddr" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label="定位：" prop="location">

       <el-button type="primary" @click="openMap" style="width:250px">点我获取定位</el-button>
       <template>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="800px"
          >
          <div>
            <!--地图模块-->
            <label>地址：<input v-model="keyword"></label>
            <br>    
            <!-- getPoint方法，给地图加点击事件，点击地图获取所需要的信息，-->
            <!--scroll-wheel-zoom属性是否可以用鼠标滚轮控制地图缩放-->
            <baidu-map class="map" id="mapID" center="杭州市" :zoom="zoom" :scroll-wheel-zoom="true" @click="getPoint" >
              <!--地图类型，两种：一种是路线一种是绿的那种-->
              <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
              <!--地图搜索功能，绑定上面的input，-->
              <!--display: none样式很关键，因为下面默认会有地址提示信息很长，很烦，这样搜索会很舒服，-->
              <!--zoom是搜索结果的视图比例，个人觉得12.8很舒服显示-->
              <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" zoom="12.8" style="display: none"></bm-local-search>
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <!--信息窗口，show属性是控制显示隐藏，infoWindowClose和infoWindowOpen是控制信息窗口关闭隐藏的方法-->
            <bm-marker :position="postionMap" >
              <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="font-size: 14px">
                <p>站点地址：{{ add.site }}</p>
              </bm-info-window>
            </bm-marker>
          </baidu-map>
          </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
       </template>
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
    
      <el-form-item label="特色：" prop="special" >
          <el-input v-model="ruleForm2.special" style="width:680px" type="textarea"></el-input>
      </el-form-item>

    
     
        <!-- <el-form-item label="定位：" prop="location" style="visibility: hidden;">
          <el-input type="password" v-model="ruleForm2.confirm" style="width:250px"></el-input>
        </el-form-item> -->
    
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
import {
  BaiduMap,
  BmScale,
  BmNavigation,
  BmOverviewMap,
  BmCityList
} from "vue-baidu-map";
export default {
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmOverviewMap,
    BmCityList
  },
  data() {
    return {
      keyword: "成都",
      zoom: 3,
      show: false,
      dialogVisible: false,
      postionMap: {
        lng: "",
        lat: ""
      },
      add: {
        jd: "",
        wd: "",
        site: ""
      },
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
        logo: "",
        address: ""
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
    openMap() {
      this.dialogVisible = true;
    },
    getPoint(e) {
      //点击地图获取一些信息，
      this.show = true;
      this.postionMap.lng = e.point.lng; //通过  e.point.lng获取经度
      this.postionMap.lat = e.point.lat; //通过  e.point.lat获取纬度
      this.add.jd = e.point.lng;
      this.add.wd = e.point.lat;
      this.zoom = e.target.getZoom();
      console.log(this.postionMap.lng, "经纬度");
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      geocoder.getLocation(e.point, rs => {
        this.add.site = rs.address;
        this.ruleForm2.permitAddr = rs.address
        // console.log(this.add.site, "位置信息");
      });
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      //这里有个问题纠结了很久，百度的信息窗口默认有个点击其他地方就消失的事件，我没有找到
      //并且信息窗口点击一次显示，一次消失
      //于是我加了一个100毫秒的定时器，保证每次点击地图都可以展示信息窗口
      setInterval(() => {
        this.show = true;
      }, 100);
    },

    handlePermitImageSuccess(res, file) {
      this.permitImageUrl = URL.createObjectURL(file.raw);
      this.ruleForm2.permitImage = res;
    },
    handleLogoImageSuccess(res, file) {
      this.logoImageUrl = URL.createObjectURL(file.raw);
      this.ruleForm2.logo = res;
    },
    submitForm(formName) {
      let userId = this.$route.query.id;
      // console.log(this.postionMap,"提交的经纬度")
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
              VIPlevel: "0",
              commission: "1%",
              workers: [],
              permitImage: this.ruleForm2.permitImage,
              logo: this.ruleForm2.logo,
              id: userId,
              location: this.postionMap
            }
          }).then(res => {
            this.$router.push("/shopApplying");
            axios({
              url: "/userSys/" + userId,
              method: "put",
              data: { storeStatus: "待审核" }
            }).then(res => {
              console.log(res);
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      console.log(this.$route.query);
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.map {
  width: 600px;
  height: 400px;
  margin: auto;
}
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
              workers: [],
