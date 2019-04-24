<template>
  <div>
   <el-dialog title="修改" :visible.sync="setUpdateVisible" width="30%">
     <el-form ref="form" status-icon label-width="100px">
     <el-form-item label="姓名">
        <el-input type="text" v-model="supplier.name" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="地址">
        <el-input type="text" v-model="supplier.addr" autocomplete="off" ></el-input>
      </el-form-item>
       <el-form-item label="电话">
        <el-input type="text" v-model="supplier.tel" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品品牌">
        <el-input type="text" v-model="supplier.brand" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品种类">
        <el-input type="text" v-model="supplier.product" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="到货时间">
        <el-input type="text" v-model="supplier.time" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="价格">
        <el-input type="text" v-model="supplier.price" autocomplete="off"></el-input>
      </el-form-item>
       <!-- <el-form-item label="产地">
        <el-input type="text" v-model="supplier.produce" autocomplete="off"></el-input>
      </el-form-item> -->
          <el-form-item>
        <el-button @click="updateData(supplier._id)">确定</el-button>
        <el-button @click="setVisible(false)">取消</el-button>
    
  </el-form-item>
     </el-form>
   </el-dialog>
 </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState,mapActions,mapMutations}=createNamespacedHelpers("newModule")
import axios from "axios";
export default {
  computed: {
    ...mapState(["visible","supplier"]),
    name:{
        set(name){
        this.setSupplier({
            ...this.supplier,
            name
        })
        },
        get(){
            return this.supplier.name
        }
    },
   
    setUpdateVisible:{
        set(visible){
            this.setVisible(visible);
        },
        get(){
            return this.visible
        }
    }
  },
  methods: {
    ...mapMutations(["setSupplier","setVisible"]),
    ...mapActions(["getSuppliers"]),    
    updateData(id) {
      axios({
        method: "put",
        url: "/supplier/" + id,
        data: {
        name:this.supplier.name,
        addr:this.supplier.addr,
        tel:this.supplier.tel,
        brand:this.supplier.brand,
        product:this.supplier.product,
        time:this.supplier.time,
        price:this.supplier.price,
        produce:this.supplier.produce
        }
      }).then(res => {
          console.log(this.supplier)
        this.getSuppliers();
        this.setVisible(false);
      });
    }
  }
};
</script>

<style>
</style>