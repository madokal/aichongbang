<template>
     <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size='pagination.eachpage'
          :total="pagination.total"
          :current-page="pagination.curpage"
          @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
// import { mapState,mapActions } from 'vuex';
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("shops");
export default {
  computed: {
    ...mapState(["pagination", "searchInfo", "tabName"])
  },
  methods: {
    ...mapActions(["setShops", "setShops1", "setShops2", "setTabName"]),
    handleCurrentChange(val) {
      if (this.tabName == "first") {
        // console.log("标签1");
        // console.log(this.pagination);
        this.setShops1({
          page: val,
          rows: 5
        });
      } else {
        // console.log("标签2");
        // console.log(this.pagination);
        // console.log(val,"页码");
        this.setShops2({
          page: val,
          rows: 5
        });
      }
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
