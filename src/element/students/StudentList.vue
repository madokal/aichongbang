<template>
  <el-table :data="students" style="width: 100%" >
    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="年龄" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.age }}</span>
      </template>
    </el-table-column>
    <el-table-column label="性别" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.gender }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row._id)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="open2(scope.row._id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("studentModule");
export default {
  data(){
    return{
      loading2:true
    }
  },
  computed: {
    ...mapState(["students","pagenation"])
  },
  created() {
    this.getStudents();
  },
  methods: {
    ...mapActions(["deleteStudent", "getStudents", "getUpdateStudent"]),
    open2(id) {
      this.$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteStudent(id);
          this.getStudents({page:this.pagenation.curpage});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(id) {
      this.getUpdateStudent(id);
    }
  }
};
</script>

<style scoped>
</style>
