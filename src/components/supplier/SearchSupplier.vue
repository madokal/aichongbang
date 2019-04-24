<template>
 <div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
    <el-select v-model="type" slot="prepend" placeholder="请选择">
      <el-option label="姓名" value="name"></el-option>
      <el-option label="地址" value="addr"></el-option>
      <el-option label="电话" value="tel"></el-option>
      <el-option label="商品品牌" value="brand"></el-option>
      <el-option label="商品种类" value="product"></el-option>
      <el-option label="到货时间" value="time"></el-option>
      <el-option label="价格" value="price"></el-option>
      <!-- <el-option label="产地" value="produce"></el-option> -->
    </el-select>
    <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState,mapActions,mapMutations}=createNamespacedHelpers("newModule")
export default {
data(){
                return{
                  type:"",
                  value:""
                }
            },
            methods:{
                // btn(){
                //     axios({
                //         method:"get",
                //         url:"/students",
                //         params:{
                //             type:this.type,
                //             value:this.value
                //         }
                //     }).then((res)=>{
                //         console.log(this.type,this.value)
                //         this.$emit("show",1,5,this.type,this.value)
                //     })
                // },
                // change(e){
                //     this.type=e.target.value;
                // }
                ...mapActions(['getSuppliers']),
                search(){
                  console.log(this.type,this.value)
                  let type=this.type;
                  let value=this.value;
                    this.getSuppliers({type,value});
                }
            }
};
</script>

<style>
 .el-select .el-input {
    width: 100px;
  }
  .input-with-select{
    width: 300px;
  }
</style>