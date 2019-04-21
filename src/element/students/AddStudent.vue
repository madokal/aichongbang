<template>
  <div class="div">
    <el-button type="primary" @click="dialogFormVisible = true">增加学生</el-button>
    <el-dialog title="增加" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.gender" label="男">男</el-radio>
          <el-radio v-model="form.gender" label="女">女</el-radio>
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
const { mapActions, mapState } = createNamespacedHelpers("studentModule");
export default {
  computed:{
    ...mapState(["pagenation"])
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        age: "",
        gender: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions(["addStudent", "getStudents"]),
    addNo(form) {
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    add(form) {
      let data = { ...this.form };
      this.addStudent(data);
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
      let page=this.pagenation.curpage;
      this.getStudents({page});
    }
  }
};
</script>

<style scoped>
.btn{
  text-align: center;
}
.div{
  display: inline-block;
  margin-right: 14px;
}
</style>
