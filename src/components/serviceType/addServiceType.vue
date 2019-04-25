<template>
  <div style="display:inline">
    <el-button type="primary" @click="dialogVisible = true">增加</el-button>
    <el-dialog title="增加" :visible.sync="dialogVisible" width="30%">
      <el-form ref="addform" label-width="100px" :model="addform" :rules="addRules">
        <el-form-item label="服务名称:" prop="name">
          <el-input v-model="addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="黄金级:" prop="gold">
          <el-input v-model="addform.gold" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="白金级:" prop="platinum">
          <el-input v-model="addform.platinum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="钻石级:" prop="diamond">
          <el-input v-model="addform.diamond" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('addform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("serviceTypeModule");
import axios from "axios";
export default {
  computed: {
    ...mapState(["pagination"])
  },
  data() {
    return {
      dialogVisible: false,
      addform: {
        name: "",
        gold: "",
        platinum: "",
        diamond: ""
      },
      addRules: {
        name: [
          { required: true, message: "请输入服务名称", trigger: "change" }
        ],
        gold: [
          { required: true, message: "请输入黄金级的价格", trigger: "change" }
        ],
        platinum: [
          { required: true, message: "请输入白金级的价格", trigger: "change" }
        ],
        diamond: [
          { required: true, message: "请输入钻石级的价格", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["setServiceTypes"]),
    add(addform) {
      this.$refs[addform].validate(valid => {
        let { name, gold, platinum, diamond } = this.addform;
        if (valid) {
          axios({
            method: "get",
            url: "/service/getSession"
          }).then(res => {
            let storeId = res.data;
            axios({
              method: "post",
              url: "/service/serviceType",
              data: {
                name,
                gold,
                platinum,
                diamond,
                storeId
              }
            }).then(res => {
              if (res.data.status == 1) {
                this.$message.success("增加成功！");
                this.setServiceTypes();
                // this.setServiceTypes({ page: this.pagination.maxpage });
              }
            });
          });
          this.dialogVisible = false;
          this.$refs[addform].resetFields();
        } else {
          this.$message.error("请输入完整的信息");
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.addform.resetFields();
    }
  }
};
</script>

<style>
</style>
