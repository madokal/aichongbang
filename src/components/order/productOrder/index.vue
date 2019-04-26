<template>
  <div>
    <ProductOrder/>
  </div>
</template>
<script>
import ProductOrder from "./ProductOrder.vue";
export default {
  components: {
    ProductOrder
  },
  computed: {
  },
  created() {
<<<<<<< HEAD
    this.$nextTick(() => {
      this.getStoreId();
    });
  },
  mounted(){
    this.$nextTick(() => {
      console.log(this.orders,"orders");
    console.log(this.storeId,"storeId");
    this.getOrders({ orderDeal: "交易", storeId: this.storeId });
    });
=======
>>>>>>> wanghong
  },
  methods:{
  }
}
</script>
<style scoped>

</style>
