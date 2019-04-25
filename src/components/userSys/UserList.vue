<template>
  <el-table :data="userSys" border style="width: 100%">
    <el-table-column prop="tel" label="电话" width="180">
    </el-table-column>
    <el-table-column prop="pwd" label="密码" width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" plain size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("userSysModule");
export default {
  data() {
    return {
      centerDialogVisible: false
    };
  },
  computed: {
    ...mapState(["userSys"])
  },
  methods: {
    ...mapActions(["setUserSys", "setVisible", "setOneUser"]),
    handleEdit(index, row) {
      // console.log(index, row);
      this.setVisible(true);
      this.setOneUser(row._id);
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
            url: "/users/" + id
          }).then(res => {
            this.setUserSys();
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

