<template>
 <div>
   <el-button type="primary" @click="dialogVisible=true" round>增加</el-button>
   <el-dialog title="增加" :visible.sync="dialogVisible" width="30%">
     <el-form ref="form" status-icon label-width="100px" >
      <el-form-item label="姓名">
        <el-input type="text" v-model="name" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="地址">
        <el-input type="text" v-model="addr" autocomplete="off" ></el-input>
      </el-form-item>
       <el-form-item label="电话">
        <el-input type="text" v-model="tel" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品品牌">
        <el-input type="text" v-model="brand" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品种类">
        <el-input type="text" v-model="product" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="到货时间">
        <el-input type="text" v-model="time" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="价格">
        <el-input type="text" v-model="price" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="上传营业执照" >
        <el-upload
        action="/supplier/upload"
        list-type="picture-card"
        :on-success="handIeAvatarSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        >
        <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
      </el-form-item> -->
       <!-- <el-form-item label="产地">
        <el-input type="text" v-model="produce" autocomplete="off"></el-input>
      </el-form-item> -->
          <el-form-item>
      <el-button @click="add">确定</el-button>
    <el-button @click="cancle">取消</el-button>
  </el-form-item>
     </el-form>
   </el-dialog>
 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState,mapActions,mapMutations}=createNamespacedHelpers("newModule");
import axios from "axios";
export default {
  data() {
    return {
      // dialogImageUrl:"",
      // dialogVisible:false,
      name: "",
      addr:"",
      tel:"",
      brand:"",
      product:"",
      time:"",
      price:"",
      produce:"",
      dialogVisible:false
    };
  },
  methods: {
    // handIeAvatarSuccess(response,file,fileList){
    //   this.dialogImageUrl="/upload"+response;
    //   this.form.img=response;
    // },
    // handleRemove(file,fileList){
    //   console.log(file,fileList);
    // },
    // handlePictureCardPreview(file){
    //   this.dialogImageUrl=file.url;
    //   this.dialogVisible=true;
    // },
    ...mapActions(["getSuppliers"]),
    cancle(){
      this.dialogVisible=false;
      this.name="";
      this.addr="";
      this.tel="";
      this.brand="";
      this.product="";
      this.time="";
      this.price="";
    },
    add() {
      if(this.name&&this.addr&&this.tel&&this.brand&&this.product&&this.time&&this.price){
        axios({
        method: "post",
        url: "/supplier",
        data: {
          name: this.name,
          addr: this.addr,
          tel: this.tel,
          brand: this.brand,
          product: this.product,
          time: this.time,
          price: this.price,
          produce: this.produce
        }
      }).then(res => {
        this.getSuppliers();
        this.dialogVisible=false;
         this.name="";
         this.addr="";
         this.tel="";
         this.brand="";
         this.product="";
         this.time="";
         this.price="";
      });
      }else{
        alert("请输入完整信息！");
      }
      
    },
    
  }
};
</script>

<style>
</style>
