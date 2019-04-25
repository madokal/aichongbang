<template>
  <el-table
    :data="suppliers"
    border
    style="width: 100%">
    <el-table-column
      fixed
      label="姓名"
      width="150"
      align="center">
      <template slot-scope="scope">
          <span> {{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      width="150"  align="center">
       <template slot-scope="scope">
          <span> {{scope.row.addr}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      width="120" align="center">
       <template slot-scope="scope">
          <span> {{scope.row.tel}}</span>
      </template>
    </el-table-column>
     <el-table-column
      fixed
      label="商品品牌"
      width="180" align="center">
       <template slot-scope="scope">
          <span> {{scope.row.brand}}</span>
      </template>
    </el-table-column>
     <el-table-column
      fixed
      label="商品种类"
      width="150" align="center">
       <template slot-scope="scope">
          <span> {{scope.row.product}}</span>
      </template>
    </el-table-column>
     <el-table-column
      fixed
      label="到货时间"
      width="100" align="center">
       <template slot-scope="scope">
          <span> {{scope.row.time}}</span>
      </template>
    </el-table-column>
     <el-table-column
      fixed
      label="价格"
      width="100" align="center">
      <template slot-scope="scope">
          <span> {{scope.row.price}}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column
      fixed
      label="营业执照"
      width="100" align="center">
      <template slot-scope="scope">
          <img :src="url+scope.row.img" style="width:70px; " >
      </template>
    </el-table-column> -->
     <!-- <el-table-column
      fixed
      prop="produce"
      label="产地"
      width="100" align="center">
       <template slot-scope="scope">
          <span> {{scope.row.produce}}</span>
      </template>
    </el-table-column> -->
    <el-table-column label="操作" width="140" align="center"> 
      <template slot-scope="scope">
        <el-button
          size="mini" type="primary" icon="el-icon-edit" label="修改"
          @click="handleEdit(scope.row._id)"></el-button>
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete" label="删除"
          @click="handleDelete(scope.row._id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
import {createNamespacedHelpers} from 'vuex';
const {mapState,mapActions,mapMutations}=createNamespacedHelpers("newModule")
export default {
  // data(){
  //   return{
  //     loading2:true,
  //     url:"/upload/"
  //   };
  // },
created(){
    this.getSuppliers();
}, 
computed:{
    ...mapState(["suppliers"])
},
methods:{
    ...mapActions(['getSuppliers']),
    ...mapMutations(['setVisible','setSupplier']),
    handleEdit(id){
      axios({
        method:"get",
        url:"/supplier/"+id
      }).then((res)=>{
      this.setVisible(true);
      this.setSupplier(res.data);
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
          method: "delete",
          url: "/supplier/" + id
        }).then(res => {
          this.getSuppliers();
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
},
components:{
  
}
}
</script>

<style>

</style>
