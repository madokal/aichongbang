<template>
    <div>
        <!-- <el-button type="primary" @click="visible = true">修改</el-button> -->
        <el-dialog title="修改平台管理员" :visible.sync="editVisible" width="550px" style="font-weight:bold;">
            <el-form :model="oneUser">
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="oneUser.tel" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="oneUser.pwd" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="update(oneUser._id)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "userSysModule"
);
import axios from "axios";
export default {
  computed: {
    ...mapState(["updateVisible", "oneUser"]),
    editVisible: {
      set(updateVisible) {
        this.setVisible(updateVisible);
      },
      get() {
        return this.updateVisible;
      }
    }
  },
  data() {
    return {
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions(["setUserSys", "setVisible", "setOneUser"]),
    update(id) {
      this.setVisible(false);
      axios({
        method: "put",
        url: "/users/" + id,
        data: {
          name: this.oneUser.name,
          phone: this.oneUser.phone,
          pwd: this.oneUser.pwd
        }
      }).then(res => {
        this.setUserSys();
      });
    },
    cancle() {
      this.setVisible(false);
    }
  }
};
</script>

<style>
</style>



