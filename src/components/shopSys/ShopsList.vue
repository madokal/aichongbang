<template>
<div>
    <div>
        <el-tabs v-model="tabName1" type="border-card" @tab-click="clickTab">
            <el-tab-pane label="已审核门店" name="first">
                 <SearchShop :search="this.searchShop1"></SearchShop>
                <div>
                    <el-table
                        :data="shops"
                        height="350"
                        border
                        style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="店名"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="permitNum"
                        label="营业执照号码"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="permitImage"
                        label="营业执照图片"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="permitAddr"
                        label="营业地址"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="location"
                        label="定位"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="legalPerson"
                        label="法人"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="联系电话"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="logo"
                        label="头图"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="special"
                        label="特色"
                        width="180"
                        align="center">
                    </el-table-column> 
                    <el-table-column
                        prop="VIPlevel"
                        label="VIP等级"
                        width="180"
                        align="center">
                    </el-table-column> 
                    <el-table-column
                        prop="commission"
                        label="佣金比例"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="workers"
                        label="店员"
                        width="180"
                        align="center">
                        </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
   <el-tab-pane label="未审核门店" name="second" >
        <SearchShop :search="this.searchShop2"></SearchShop>
                <div>
                    <el-table
                        :data="shops"
                        height="350"
                        border
                        style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="店名"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="permitNum"
                        label="营业执照号码"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="permitImage"
                        label="营业执照图片"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="permitAddr"
                        label="营业地址"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="location"
                        label="定位"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="legalPerson"
                        label="法人"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="联系电话"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="logo"
                        label="头图"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="special"
                        label="特色"
                        width="180"
                        align="center">
                    </el-table-column> 
                    <el-table-column
                        prop="VIPlevel"
                        label="VIP等级"
                        width="180"
                        align="center">
                    </el-table-column> 
                    <el-table-column
                        prop="commission"
                        label="佣金比例"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="workers"
                        label="店员"
                        width="180"
                        align="center">
                        </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
  </el-tabs>
</div>
</div>
</template>

<script>
import SearchShop from "./SearchShop";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("shops");
export default {
  data() {
    return {};
  },
  components: {
    SearchShop
  },
  computed: {
    ...mapState(["shops", "tabName", "searchInfo", "visible"]),
    tabName1: {
      set(tabName) {
        this.setTabName(tabName);
      },
      get() {
        return this.tabName;
      }
    }
  },
  methods: {
    ...mapActions(["setShops", "setShops1", "setShops2"]),
    ...mapMutations(["setShop", "setVisible", "setTabName"]),
    searchShop1() {
      this.setShops1({});
    },
    searchShop2() {
      this.setShops2({});
    },
    clickTab(targetName) {
      //   console.log(targetName.name);
      if (targetName.name == "first") {
        this.setTabName("first");
        this.setShops({ page: 1, rows: 5, type: "storeStatus", value: "1" });
      } else {
        this.setTabName("second");
        this.setShops({ page: 1, rows: 5, type: "storeStatus", value: "0" });
      }
    },
    handleEdit(index, row) {
      //   console.log(index, row);
      this.setShop(row);
      this.setVisible(true);
    }
  },

  created() {
    this.setShops({ page: 1, rows: 5, type: "storeStatus", value: "1" });
  }
};
</script>

<style>
</style>
