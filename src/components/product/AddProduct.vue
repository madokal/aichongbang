<template>
    <div class="div">
    <el-button type="primary" @click="dialogFormVisible = true">增加商品</el-button>
    <el-dialog title="增加" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="品类" :label-width="formLabelWidth">
          <el-input v-model="form.commodityType" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="制作方法" :label-width="formLabelWidth">
          <el-input v-model="form.textureOrMade" autocomplete="off"></el-input>
        </el-form-item>
          
        <el-form-item label="适用规格" :label-width="formLabelWidth">
          <el-input v-model="form.size" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="专属规格" :label-width="formLabelWidth">
          <el-input v-model="form.exclusiveSize" autocomplete="off"></el-input>
        </el-form-item>
         
        <el-form-item label="包装规格" :label-width="formLabelWidth">
          <el-input v-model="form.weight" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="口味" :label-width="formLabelWidth">
          <el-input v-model="form.taste" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="特殊功能" :label-width="formLabelWidth">
          <el-input v-model="form.specialFunc" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="产地" :label-width="formLabelWidth">
          <el-input v-model="form.place" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="出厂日期" :label-width="formLabelWidth">
          <el-input v-model="form.madeDate" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="保质期" :label-width="formLabelWidth">
          <el-input v-model="form.shelfLife" autocomplete="off"></el-input>
        </el-form-item>
        
        
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-input v-model="form.supplier" autocomplete="off"></el-input>
        </el-form-item>

        
        <el-form-item label="特色说明" :label-width="formLabelWidth">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>

        
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="form.pictures" autocomplete="off"></el-input>
        </el-form-item>


    <el-form-item class="btn">
          <el-button @click="addNo('addForm')">取 消</el-button>
          <el-button type="primary" @click="add('addForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
   </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("productModule");
export default {
  computed:{
    ...mapState(["pagenation"])
  },
    data() {
    return {
   
      dialogFormVisible: false,
      form: {
        name: "",
      },
      formLabelWidth: "120px"
    };
  },
    methods: {

    ...mapActions(["addProduct", "getProducts"]),
    addNo(form) {
      this.dialogFormVisible = false;
    },
    add(form) {
      let data = { ...this.form };
      this.addProduct(data);
      this.dialogFormVisible = false;
      let page=this.pagenation.curpage;
      this.getProducts({page});
    }
  }
}
</script>

<style>
.btn{
  text-align: center;
}
.div{
  display: inline-block;
  margin-right: 14px;
}
</style>
