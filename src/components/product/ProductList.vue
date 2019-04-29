<template>
  <el-table :data="products" style="width: 100%" border>
    <el-table-column label="名称" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="品类" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.commodityType }}</span>
      </template>
    </el-table-column>

    <el-table-column label="制作方法" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.textureOrMade }}</span>
      </template>
    </el-table-column>
    <el-table-column label="适用规格" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.size }}</span>
      </template>
    </el-table-column>

    <el-table-column label="包装规格" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.exclusiveSize }}</span>
      </template>
    </el-table-column>
 
    <el-table-column label="口味" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.weight }}</span>
      </template>
    </el-table-column>

    <el-table-column label="特殊功能" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.specialFunc }}</span>
      </template>
    </el-table-column>

    <el-table-column label="产地" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.palce }}</span>
      </template>
    </el-table-column>

    <el-table-column label="出厂日期" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.madeDate }}</span>
      </template>
    </el-table-column>

    <el-table-column label="保质期" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.shelfLife }}</span>
      </template>
    </el-table-column>

    <el-table-column label="供应商" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.supplier }}</span>
      </template>
    </el-table-column>

    <el-table-column label="特色说明" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.info }}</span>
      </template>
    </el-table-column>

    <el-table-column label="价格" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column label="图片" width="140" align="center">
      <template  slot-scope="scope">
        <img :src="url+scope.row.pictures" alt="" width="100px" height="60"/>
    </template>
    </el-table-column>
    <el-table-column label="操作"  width="180" align="center">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" label="修改" circle @click="handleEdit(scope.row._id)"></el-button>
        <el-button type="danger" icon="el-icon-delete" label="删除" circle @click="del(scope.row._id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("productModule");
export default {
     data(){
      return{
      loading2:true,
      url:"/upload/"
    }
  },
   computed: {
    ...mapState(["products","pagenation"])
  },
  //  created() {
  //  this.getProducts();
  // },
   methods: {
    ...mapActions(["deleteProduct", "getProducts", "getUpdateProduct"]),
    del(id) {
      this.$confirm("此操作将永久删除该商品信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.deleteProduct(id);
          this.getProducts({page:this.pagenation.curpage});
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(id) {
      // console.log(id)
      this.getUpdateProduct(id);
    }
  }

}
</script>

<style>

</style>
