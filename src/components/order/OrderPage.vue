<template>
  <div>
    <span v-for="(item,index) in maxpage">
      <span style="padding:5px;background:gray;marginRight:5px">{{item}}</span>
    </span>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("orderModule");
export default {
  props: ["orders"],
  data() {
    return {
      maxpage: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.show();
      console.log(666)
    });
  },
  computed: {
    // ...mapState(["orders"])
  },
  methods: {
    // ...mapActions(["getOrders"]),
    show() {
      let page = 1;
      let pageSize = 1;
      let maxpage = Math.ceil(this.orders.length / pageSize);
      console.log(maxpage, "maxpage");
      this.maxpage = maxpage;
    },
  }
};
</script>
<style scoped>

</style>


