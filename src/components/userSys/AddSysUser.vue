<template>
    <div>
        <el-button type="primary" plain @click="dialogFormVisible = true">增加管理员</el-button>
        <el-dialog title="增加平台管理员" :visible.sync="dialogFormVisible" width="550px">
            <el-form :model="form">
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                     <el-input v-model="form.pwd" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("userSysModule");
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        tel: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        pwd:""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions(["setUserSys"]),
    add() {
      this.dialogFormVisible = false;
      axios({
        method: "post",
        url: "/users",
        data: {
          tel: this.form.phone,
          pwd: this.form.pwd,
          role:"平台管理员"
        }
      }).then(res => {
        // this.$emit("show");
        this.setUserSys();
        this.form.tel = "";
        this.form.pwd = "";
      });
    }
  }
};
</script>

<style>
</style>

