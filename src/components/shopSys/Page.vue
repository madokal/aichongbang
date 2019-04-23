<template>
     <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size='5'
          :total="pagination.total"
          :current-page="pagination.curpage"
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
    ...mapState(["pagination", "noshops", "shopsed", "tabName"])
  },
  methods: {
    ...mapActions(["setShopsed"]),
    ...mapMutations(["setNoshopsAy", "setShopsedAy"]),
    page(arr, page) {
      let start = (page - 1) * 5;
      let end = page * 5;
      let newArr = arr.slice(start, end);
      return newArr;
    },
    handleCurrentChange(val) {

      if (this.tabName == "first") {
        console.log("标签1");
        // console.log(this.pagination);
        let arr = this.shopsed;
        console.log(this.page(arr, val),"截取");
      } else {
        // console.log("标签2");
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
