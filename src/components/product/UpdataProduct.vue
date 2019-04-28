<template>
  <el-dialog title="修改商品" :visible.sync="product.visible" >
    <el-form :model="product">
      <el-form-item label="名称" :label-width="formLabelWidth" >
        <el-input v-model="name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="品类" :label-width="formLabelWidth">
        <el-input v-model="commodityType " autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="制作方法" :label-width="formLabelWidth">
        <el-input v-model="textureOrMade" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="适用规格" :label-width="formLabelWidth">
        <el-input v-model="size" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="包装规格" :label-width="formLabelWidth">
        <el-input v-model="exclusiveSize" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="口味" :label-width="formLabelWidth">
        <el-input v-model="weight" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="特殊功能" :label-width="formLabelWidth">
        <el-input v-model="specialFunc" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="产地" :label-width="formLabelWidth">
        <el-input v-model="palce" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="出厂日期" :label-width="formLabelWidth">
        <el-input v-model="madeDate" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="保质期" :label-width="formLabelWidth">
        <el-input v-model="shelfLife" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="供应商" :label-width="formLabelWidth">
        <el-input v-model="supplier" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="特色说明" :label-width="formLabelWidth">
        <el-input v-model="info" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="price" autocomplete="off"></el-input>
      </el-form-item>

       <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="/product/upload"
          :on-success="handle"
         >
          <img v-if="picturesUrl" :src="picturesUrl+product.pictures" class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
       </el-upload>
      </el-form-item>
       

      </el-form>
 
    <div slot="footer" class="btn">
      <el-button @click="setUpdateVis(false)">取 消</el-button>
      <el-button type="primary" @click="update(product._id)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("productModule");
export default {
  computed: {
    ...mapState(["product"]),
    name: {
      set(name) {
        this.setProduct({
          ...this.product,
          name
        });
      },
      get() {
        return this.product.name;
      }
    },
    commodityType: {
      set(commodityType) {
        this.setProduct({
          ...this.product,
          commodityType
        });
      },
      get() {
        return this.product.commodityType;
      }
    },
    textureOrMade: {
      set(textureOrMade) {
        this.setProduct({
          ...this.product,
          textureOrMade
        });
      },
      get() {
        return this.product.textureOrMade;
      }
    },
    textureOrMade: {
      set(textureOrMade) {
        this.setProduct({
          ...this.product,
          textureOrMade
        });
      },
      get() {
        return this.product.textureOrMade;
      }
    },
    size: {
      set(size) {
        this.setProduct({
          ...this.product,
          size
        });
      },
      get() {
        return this.product.size;
      }
    },
    exclusiveSize: {
      set(exclusiveSize) {
        this.setProduct({
          ...this.product,
          exclusiveSize
        });
      },
      get() {
        return this.product.exclusiveSize;
      }
    },
    size: {
      set(size) {
        this.setProduct({
          ...this.product,
          size
        });
      },
      get() {
        return this.product.size;
      }
    },
    weight: {
      set(weight) {
        this.setProduct({
          ...this.product,
         weight
        });
      },
      get() {
        return this.product.weight;
      }
    },
    specialFunc: {
      set(specialFunc) {
        this.setProduct({
          ...this.product,
         specialFunc
        });
      },
      get() {
        return this.product.specialFunc;
      }
    },
    palce: {
      set(palce) {
        this.setProduct({
          ...this.product,
         palce
        });
      },
      get() {
        return this.product.palce;
      }
    },
    madeDate: {
      set(madeDate) {
        this.setProduct({
          ...this.product,
         madeDate
        });
      },
      get() {
        return this.product.madeDate;
      }
    },
    shelfLife: {
      set(shelfLife) {
        this.setProduct({
          ...this.product,
         shelfLife
        });
      },
      get() {
        return this.product.shelfLife;
      }
    },
    supplier: {
      set(supplier) {
        this.setProduct({
          ...this.product,
         supplier
        });
      },
      get() {
        return this.product.supplier;
      }
    },
    info: {
      set(info) {
        this.setProduct({
          ...this.product,
         info
        });
      },
      get() {
        return this.product.info;
      }
    },
    price: {
      set(price) {
        this.setProduct({
          ...this.product,
         price
        });
      },
      get() {
        return this.product.price;
      }
    },
    pictures: {
      set(pictures) {
        this.setProduct({
          ...this.product,
         pictures
        });
      },
      get() {
        return this.product.pictures;
      }
    },


  },
  methods: {
    ...mapMutations(["setProduct", "setUpdateVis"]),
    ...mapActions(["updateProduct", "getProducts"]),
    update(id) {
      this.updateProduct(this.product);
      this.setUpdateVis(false);
      this.getProducts();
    },
    handle(response, file, fileList){
      this.product.pictures=response
    }
 

  },
  data() {
    return {
      formLabelWidth: "120px",
      picturesUrl:"/upload/"
    };
  }
};
</script>

<style scoped>
.btn {
  text-align: center;
}
</style>
