<template>
     <div>
        <el-dialog title="修改店铺" :visible.sync="updateVisible" width="30%" :before-close="close">
          <el-form  label-width="100px">
            <el-form-item label="VIP等级：" >
              <el-input v-model="VIPlevel"></el-input>
            </el-form-item>
            <el-form-item label="佣金比例：">
              <el-input v-model="commission"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="setVisible(false)">取 消</el-button>
            <el-button type="primary" @click="updateShop(shop._id)">确 定</el-button>
          </div>
        </el-dialog>  
    </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "shops"
);
export default {
  computed: {
    ...mapState(["shop", "visible", "pagination"]),
    updateVisible: {
      set(visible) {
        this.setVisible(visible);
      },
      get() {
        return this.visible;
      }
    },
    VIPlevel: {
      set(VIPlevel) {
        this.setShop({
          ...this.shop,
          VIPlevel
        });
      },
      get() {
        return this.shop.VIPlevel;
      }
    },
    commission: {
      set(commission) {
        this.setShop({
          ...this.shop,
          commission
        });
      },
      get() {
        return this.shop.commission;
      }
    },
    storeStatus: {
      set(storeStatus) {
        this.setShop({
          ...this.shop,
          storeStatus
        });
      },
      get() {
        return this.shop.storeStatus;
      }
    }
  },
  methods: {
    ...mapMutations(["setShop", "setVisible"]),
    ...mapActions(["setShops1"]),
    updateShop(id) {
      console.log(11)
        if (this.shop.VIPlevel && this.shop.commission) {
          axios({
            method: "put",
            url: "/shopSys/" + id,
            data: this.shop
          }).then(() => {
            this.setShops1({
              // page: this.pagination.curpage,
              // rows: this.pagination.eachpage
            });
            this.setVisible(false);
          });
        } else {
          alert("信息不完整");
        }
    },
    close() {
      this.setVisible(false);
    }
  }
};
</script>

<style scoped>
</style>
