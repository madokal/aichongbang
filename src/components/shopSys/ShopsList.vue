<template>
<div>
    <div>
        <el-tabs v-model="tabName1" type="border-card" @tab-click="clickTab">
            <el-tab-pane label="已审核门店" name="first">
                 <SearchShop :search="this.searchShopsed"></SearchShop>
                <div>
                    <el-table
                        :data="shopsed"
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
        <SearchShop :search="this.searchNoshops"></SearchShop>
                <div>
                    <el-table
                        :data="noshops"
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
                                @click="handleAudit(scope.$index, scope.row)">审核该门店</el-button>
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
import axios from "axios";
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
    ...mapState(["noshops", "shopsed", "tabName", "searchInfo"]),
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
    ...mapActions([
      "setShopsed",
      "setNoshops",
      "setSearchShopsed",
      "setSearchNoshops"
    ]),
    ...mapMutations([
      "setShop",
      "setVisible",
      "setTabName",
      "setAuditShop",
      "setAuditVisible",
      "setPagination"
    ]),

    clickTab(targetName) {
      //   console.log(targetName.name);

      if (targetName.name == "first") {
        this.setTabName("first");
        this.setShopsed();
      } else {
        this.setTabName("second");
        this.setNoshops();
      }
    },
    searchShopsed() {
      console.log(this.searchInfo);
      this.setSearchShopsed();
    },
    searchNoshops() {
      console.log(this.searchInfo);
      if (this.searchInfo.type && this.searchInfo.value) {
        this.setSearchNoshops();
      }
    },

    handleEdit(index, row) {
      //   console.log(index, row);
      this.setShop(row);
      this.setVisible(true);
    },
    handleAudit(index, row) {
      this.setAuditShop(row);
      this.setAuditVisible(true);
    }
  },
  created() {
    this.setShopsed();
  }
};
</script>

<style>
</style>
