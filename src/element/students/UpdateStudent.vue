<template>
  <el-dialog title="修改学生" :visible.sync="student.visible">
    <el-form>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model="age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio v-model="gender" label="男">男</el-radio>
        <el-radio v-model="gender" label="女">女</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btn">
      <el-button @click="setUpdateStuVis(false)">取 消</el-button>
      <el-button type="primary" @click="update(student._id)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "studentModule"
);
export default {
  computed: {
    ...mapState(["student"]),
    name: {
      set(name) {
        this.setStudent({
          ...this.student,
          name
        });
      },
      get() {
        return this.student.name;
      }
    },
    age: {
      set(age) {
        this.setStudent({
          ...this.student,
          age
        });
      },
      get() {
        return this.student.age;
      }
    },
    gender: {
      set(gender) {
        this.setStudent({
          ...this.student,
          gender
        });
      },
      get() {
        return this.student.gender;
      }
    }
  },
  methods: {
    ...mapMutations(["setStudent", "setUpdateStuVis"]),
    ...mapActions(["updateStudent", "getStudents"]),
    update(id) {
      this.updateStudent(this.student);
      this.setUpdateStuVis(false);
      this.getStudents();
    }
  },
  data() {
    return {
      formLabelWidth: "120px"
    };
  }
};
</script>

<style scoped>
.btn {
  text-align: center;
}
</style>
