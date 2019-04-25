<template>
     <div>
        <el-dialog title="审核门店" :visible.sync="updateAuditVisible" width="40%" :before-close="close">
          <el-form  label-width="140px">
            <el-form-item label="店名：">
                <el-input v-model="auditShop.name" :disabled="true" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="营业地址：">
                <el-input v-model="auditShop.permitAddr" :disabled="true" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="法人：">
                <el-input v-model="auditShop.legalPerson" :disabled="true" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
                <el-input v-model="auditShop.tel" :disabled="true" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="营业执照号码：">
                <el-input v-model="auditShop.permitNum" :disabled="true" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="营业执照图片：">
                <div style="width:250px;border:1px solid #e5e5e5;padding:10px;box-sizing:border-box">
                  <img :src="url+auditShop.permitImage" alt="" style="width:100%">
                </div>
            </el-form-item>
            <el-form-item label="头图：">
                <div style="width:250px;border:1px solid #e5e5e5;padding:10px;box-sizing:border-box" >
                    <img :src="url+auditShop.logo" alt="" style="width:100%">
                </div>
            </el-form-item>
            <el-form-item label="特色：">
                <el-input v-model="auditShop.special" :disabled="true" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="定位：">
                <span class="location">({{auditShop.location.lng}}&nbsp;,&nbsp;{{auditShop.location.lat}})</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="setAuditVisible(false)">取 消</el-button>
            <el-button type="primary" @click="auditBtn(auditShop._id)" >{{edit}}</el-button>
          </div>
        </el-dialog>  
    </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("shops");
export default {
  data() {
    return {
      url: "/upload/"
    };
  },
  computed: {
    ...mapState(["auditShop", "auditVisible", "pagination", "edit", "userId"]),
    updateAuditVisible: {
      set(auditVisible) {
        this.setAuditVisible(auditVisible);
      },
      get() {
        return this.auditVisible;
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
    ...mapMutations(["setAuditVisible"]),
    ...mapActions(["setNoshops","setShopsed","setCloseshops"]),
    auditBtn(id) {
      // alert(this.userId,"用户Id")
      if (this.edit == "确认审核？") {
        axios({
          method: "put",
          url: "/shopSys/auditshop/" + id,
          data: { storeStatus: 1 }
        }).then(() => {
          this.setNoshops();
          this.setAuditVisible(false);
        });

        axios({
          url: "/userSys/" + this.userId,
          method: "put",
          data: { storeStatus: "已开店" }
        }).then(res => {
          console.log(res);
        });
      } else if (this.edit == "确认关闭该门店？") {
        axios({
          method: "put",
          url: "/shopSys/auditshop/" + id,
          data: { storeStatus: 2 }
        }).then(() => {
          this.setCloseshops();
          this.setAuditVisible(false);
        });

        axios({
          url: "/userSys/" + this.userId,
          method: "put",
          data: { storeStatus: "已封店" }
        }).then(res => {
          console.log(res);
        });
      } else {
        axios({
          method: "put",
          url: "/shopSys/auditshop/" + id,
          data: { storeStatus: 1 }
        }).then(() => {
          this.setShopsed();
          this.setAuditVisible(false);
        });

        axios({
          url: "/userSys/" + this.userId,
          method: "put",
          data: { storeStatus: "已开店" }
        }).then(res => {
          console.log(res);
        });
      }
    },

    close() {
      this.setAuditVisible(false);
    }
  }
};
</script>

<style scoped>
.location {
  width: 250px;
  height: 40px;
  display: inline-block;
  padding-left: 5px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-sizing: border-box
}
</style>
