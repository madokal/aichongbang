<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pagination.total"
      :current-page="pagination.curpage"
      :page-size="pagination.eachpage"
      @current-change="change"
    ></el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "serviceTypeModule"
);
export default {
  computed: {
    ...mapState(["pagination","type","value"])
  },
  methods: {
    ...mapActions(["setServiceTypes"]),
    change(currentPage ){
         this.setServiceTypes({
          page: currentPage,
          rows: 5,
          type: this.type,
          value: this.value
        });
    },
  }
};
</script>

<style>
</style>
