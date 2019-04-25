<template>
  <el-pagination background layout="prev, pager, next" :page-size="pagation.eachpage" :total="pagation.total" @prev-click="prev" @next-click="next" @current-change="change">
  </el-pagination>

</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("shopManagerModule");
export default {
  computed: {
    ...mapState(["pagation"])
  },
  methods: {
    ...mapActions(["shopManagers"]),
    prev(val) {
      // console.log(val);
      this.shopManagers({
        page: val - 1
      });
    },
    next(val) {
      this.shopManagers({
        page: val + 1
      });
    },
    change(current) {
      // console.log(current);
      this.shopManagers({
        page: current,
        rows: this.pagation.eachpage
      });
    }
  }
};
</script>

<style scoped>

</style>
