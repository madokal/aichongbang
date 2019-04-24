<template>
  <el-table :data="serviceTypes" style="margin-top:12px">
    <el-table-column label="服务类型" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="店铺名称" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.stores.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="黄金级" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">￥{{ scope.row.priceTypes.gold}}</span>
      </template>
    </el-table-column>
    <el-table-column label="白金级" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">￥{{ scope.row.priceTypes.platinum }}</span>
      </template>
    </el-table-column>
    <el-table-column label="钻石级" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">￥{{ scope.row.priceTypes.diamond }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "serviceTypeModule"
);
export default {
  computed: {
    ...mapState(["serviceTypes"])
  },
  methods: {
    ...mapMutations(["setVisible"]),
    ...mapActions(["setServiceTypes", "setServiceType"]),
    handleEdit(index, row) {
      this.setVisible(true);
      this.setServiceType(row._id);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let storeId="5cbaf6105caaca6f075a087e";
          axios({
            method: "delete",
            url: "/service/serviceType/"+row._id,
            data:{
              storeId
            }
          }).then(res => {
            if (res.data.status == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.setServiceTypes();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>
