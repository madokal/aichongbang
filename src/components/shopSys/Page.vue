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
    ...mapState(["pagination", "noshops", "shopsed", "tabName"])
  },
  methods: {
    ...mapActions(["setShopsed","setNoshops"]),
    ...mapMutations(["setNoshopsAy", "setShopsedAy"]),

    handleCurrentChange(val) {
      if (this.tabName == "first") {
        console.log("标签1");
        // console.log(this.pagination);
        this.setShopsed({page:val})
      } else {
        // console.log("标签2");
        this.setNoshops({page:val})
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
