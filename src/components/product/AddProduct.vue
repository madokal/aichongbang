<template>
    <div class="div">
    <el-button type="primary" @click="dialogFormVisible = true">增加商品</el-button>
    <el-dialog title="增加" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm" >
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="品类" :label-width="formLabelWidth"  prop="commodityType">
          <el-input v-model="form.commodityType" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="制作方法" :label-width="formLabelWidth"  prop="textureOrMade">
          <el-input v-model="form.textureOrMade" autocomplete="off"></el-input>
        </el-form-item>
          
        <el-form-item label="适用规格" :label-width="formLabelWidth"  prop="size">
          <el-input v-model="form.size" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="专属规格" :label-width="formLabelWidth"  prop="exclusiveSize">
          <el-input v-model="form.exclusiveSize" autocomplete="off"></el-input>
        </el-form-item>
         
        <el-form-item label="包装规格" :label-width="formLabelWidth"  prop="weight">
          <el-input v-model="form.weight" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="口味" :label-width="formLabelWidth"  prop="taste">
          <el-input v-model="form.taste" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="特殊功能" :label-width="formLabelWidth"  prop="specialFunc">
          <el-input v-model="form.specialFunc" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="产地" :label-width="formLabelWidth"  prop="palce">
          <el-input v-model="form.palce" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="出厂日期" :label-width="formLabelWidth"  prop="madeDate">
          <el-input v-model="form.madeDate" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="保质期" :label-width="formLabelWidth"  prop="shelfLife">
          <el-input v-model="form.shelfLife" autocomplete="off"></el-input>
        </el-form-item>
        
        
        <el-form-item label="供应商" :label-width="formLabelWidth"  prop="supplier">
          <el-input v-model="form.supplier" autocomplete="off"></el-input>
        </el-form-item>

        
        <el-form-item label="特色说明" :label-width="formLabelWidth"  prop="info">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>

        
        <el-form-item label="价格" :label-width="formLabelWidth"  prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

      
    <el-form-item  label="上传图片"  prop="pictures" style="width:100px;">
        <el-upload
          class="avatar-uploader"
          action="/product/upload"
          :on-success="handleSuccess"
          :limit="1"
         >
          <img v-if="pictures" :src="pictures" class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
       </el-upload>
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
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("productModule");
export default {
  computed: {
    ...mapState(["pagenation","shopId"])
  },
  data() {
    return {
      name: "",
      commodityType: "",
      textureOrMade: "",
      size: "",
      exclusiveSize: "",
      weight: "",
      taste: "",
      specialFunc: "",
      palce: "",
      madeDate: "",
      shelfLife: "",
      supplier: "",
      info: "",
      price: "",
      pictures: "",
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.pictures = "/upload/" + response;
      this.form.pictures = response;
     
    },

    ...mapActions(["addProduct", "getProducts"]),
    addNo(form) {
      this.dialogFormVisible = false;
       this.$refs.addForm.resetFields();
    },
    ...mapMutations(["setShopId"]),
    //添加功能按钮
    add(form) {
      // console.log(this.pagenation)
      if (!this.pictures) {
        alert("请选择图片");
      } else {
        axios({
          method: "get",
          url: "/login/getSession"
        }).then(res => {
          let id = res.data._id;
          axios({
            method: "get",
            url: "/product/shop",
            params: { id }
          }).then(res => {
            this.setShopId(res.data[0]._id);
            let data = { ...this.form };
            data.id =this.shopId;
            // console.log(this.shopId,"1111")




            
            this.addProduct(data);
            this.dialogFormVisible = false;
            let page = this.pagenation.curpage;
            this.getProducts({ page });
            this.$refs.addForm.resetFields();

            this.pictures = "";
          });
        });
      }
    }
  }
};
</script>

<style>
.btn {
  text-align: center;
}
.div {
  display: inline-block;
  margin-right: 14px;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
