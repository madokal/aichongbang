<template>
 <div>
   <el-button type="primary" @click="dialogVisible=true" round>增加</el-button>
   <el-dialog title="增加" :visible.sync="dialogVisible" width="30%">
     <el-form ref="form" status-icon label-width="100px">
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
       <el-form-item label="产地">
        <el-input type="text" v-model="produce" autocomplete="off"></el-input>
      </el-form-item>
          <el-form-item>
      <el-button @click="add">确定</el-button>
    <el-button @click="cancle">取消</el-button>
  </el-form-item>
     </el-form>
   </el-dialog>
 </div>
</template>

<script>
import {mapActions} from 'vuex'
import axios from "axios";
// const{mapActions}=createNamespacedHeloers("studentModule");
export default {
  data() {
    return {
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
    ...mapActions(["setSuppliers"]),
    cancle(){
      this.dialogVisible=false;
    },
    add() {
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
        this.setSuppliers();
        this.dialogVisible=false;
      });
    }
  }
};
</script>

<style>
</style>
