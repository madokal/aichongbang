<template>
<div style="margin-left:450px;">
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="pagination.eachpage"
  :total="pagination.total"
  @current-change="change">
</el-pagination>
</div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState,mapActions,mapMutations}=createNamespacedHelpers("newModule")
export default {
  updated() {},
  computed: {
    ...mapState(["pagination"])
  },
  methods: {
    ...mapMutations(["setSuppliers"]),
    ...mapActions(["getSuppliers"]),
    change(current) {
      this.getSuppliers({ page: current, rows: 5 });
    }
  }
};
</script>

<style>
</style>