<template>
  <el-table :data="shopManagers" border style="width: 100%">
    <el-table-column prop="trueName" label="真实姓名" width="130">
    </el-table-column>
    <el-table-column prop="userName" label="登录名" width="130">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="180">
    </el-table-column>
    <el-table-column prop="pwd" label="密码" width="150">
    </el-table-column>
    <el-table-column prop="tel" label="手机号" width="150">
    </el-table-column>
     <el-table-column prop="storeStatus" label="门店状态" width="150">
    </el-table-column>
    <!-- <el-table-column label="门店状态" width="130">
      <template slot-scope="scope">
        <span>{{ scope.row.status=="未开店"?"未开店":scope.row.status=="已开店"?"已开店":scope.row.status=="待审核"?"待审核":scope.row.status=="已封店"?"已封店":"" }}</span>
      </template>
    </el-table-column> -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("shopManagerModule");
export default {
  data() {
    return {
      centerDialogVisible: false
    };
  },
  computed: {
    ...mapState(["shopManagers"])
  },
  methods: {
    ...mapActions(["setshopManagers", "setVisible", "setoneShopManager"]),
    handleEdit(index, row) {
      // console.log(index, row);
      this.setVisible(true);
      this.setoneShopManager(row._id);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.centerDialogVisible = true;
      let id = row._id;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "delete",
            url: "/userSys/" + id
          }).then(res => {
            this.setshopManagers();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
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

