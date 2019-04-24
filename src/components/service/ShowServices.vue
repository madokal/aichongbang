<template>
  <el-table :data="services" style="margin-top:12px">
    <el-table-column label="服务类型" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.serviceType.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="服务名称" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="服务时间" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.scheduling}}</span>
      </template>
    </el-table-column>
    <el-table-column label="适用规格" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.weight }}</span>
      </template>
    </el-table-column>
    <el-table-column label="大概耗时" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="服务等级" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.level }}</span>
      </template>
    </el-table-column>
    <el-table-column label="基础价格" width="140" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">￥{{ scope.row.price }}</span>
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
  "serviceModule"
);
export default {
  computed: {
    ...mapState(["services"])
  },
  methods: {
    ...mapMutations(["setVisible"]),
    ...mapActions(["setServices", "setService"]),
    handleEdit(index, row) {
      this.setVisible(true);
      this.setService(row._id);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "delete",
            url: "/service/" + row._id
          }).then(res => {
            if (res.data.status == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.setServices();
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
