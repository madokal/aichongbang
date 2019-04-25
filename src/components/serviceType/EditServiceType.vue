<template>
  <div>
    <el-dialog title="修改服务" :visible.sync="visible" width="30%" :before-close="close">
      <el-form ref="editForm" label-width="100px" :model="serviceType" :rules="editRules">
        <el-form-item label="服务名称:" prop="name">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="黄金级:" prop="priceTypes.gold">
          <el-input v-model="gold" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="白金级:" prop="priceTypes.platinum">
          <el-input v-model="platinum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="钻石级:" prop="priceTypes.diamond">
          <el-input v-model="diamond" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setVisible(false)">取 消</el-button>
        <el-button type="primary" @click="edit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "serviceTypeModule"
);
import axios from "axios";
export default {
  computed: {
    ...mapState(["serviceType", "visible", "pagination"]),
    name: {
      set(name) {
        this.setServiceType({
          ...this.serviceType,
          name
        });
      },
      get() {
        return this.serviceType.name;
      }
    },
    gold: {
      set(gold) {
        this.setServiceType({
          ...this.serviceType,
          priceTypes: {
            ...this.serviceType.priceTypes,
            gold
          }
        });
      },
      get() {
        return this.serviceType.priceTypes.gold;
      }
    },
    platinum: {
      set(platinum) {
        this.setServiceType({
          ...this.serviceType,
          priceTypes: {
            ...this.serviceType.priceTypes,
            platinum
          }
        });
      },
      get() {
        return this.serviceType.priceTypes.platinum;
      }
    },
    diamond: {
      set(diamond) {
        this.setServiceType({
          ...this.serviceType,
          priceTypes: {
            ...this.serviceType.priceTypes,
            diamond
          }
        });
      },
      get() {
        return this.serviceType.priceTypes.diamond;
      }
    }
  },
  data() {
    return {
      editRules: {
        name: [
          { required: true, message: "请输入服务类型名称", trigger: "change" }
        ],
        "priceTypes.gold": [
          { required: true, message: "请输入黄金级价格", trigger: "change" }
        ],
        "priceTypes.platinum": [
          { required: true, message: "请输入白金级价格", trigger: "change" }
        ],
        "priceTypes.diamond": [
          { required: true, message: "请输入钻石级价格", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["setServiceType", "setVisible"]),
    ...mapActions(["setServiceTypes"]),
    edit(editForm) {
      this.$refs[editForm].validate(valid => {
        let { _id, name, priceTypes } = this.serviceType;
        if (valid) {
          axios({
            method: "put",
            url: "/service/serviceType/" + _id,
            data: {
              name,
              priceTypes
            }
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success("修改完成");
              this.setVisible(false);
              this.setServiceTypes({ page: this.pagination.curpage });
            }
          });
        } else {
          this.$message.error("请输入完整的信息");
        }
      });
    },
    close() {
      this.setVisible(false);
    }
  }
};
</script>

<style>
</style>
