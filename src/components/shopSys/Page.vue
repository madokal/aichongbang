<template>
     <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size='5'
          :total="pagination.total"
          @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
// import { mapState,mapActions } from 'vuex';
import { createNamespacedHelpers, mapMutations } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("shops");
export default {
  computed: {
    ...mapState(["pagination", "noshops", "shopsed", "tabName", "searchInfo"])
  },
  methods: {
    ...mapActions([
      "setShopsed",
      "setNoshops",
      "setSearchShopsed",
      "setSearchNoshops"
    ]),
    ...mapMutations(["setNoshopsAy", "setShopsedAy"]),

    handleCurrentChange(val) {
      if (this.tabName == "first") {
        if (this.searchInfo.type && this.searchInfo.value) {
          // console.log("搜索分页")
          this.setSearchShopsed({ page1: val });
        } else {
          // console.log("feny")
          this.setShopsed({ page: val });
        }
      } else {
        if (this.searchInfo.type && this.searchInfo.value) {
          //搜索分页
          this.setSearchNoshops({ page1: val });
        } else {
          this.setNoshops({ page: val });
        }
      }
    },
    created() {
      this.setShopsed();
    }
  }
};
</script>

<style scoped>
a {
  display: inline-block;
  text-align: center;
  margin: 6px;
  border: 1px solid gray;
  cursor: pointer;
}
a.cur {
  width: 30px;
}
</style>
