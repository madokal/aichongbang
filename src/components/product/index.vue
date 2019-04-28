<template>
  <div>
    <h1>商品管理</h1>
     <AddProduct/>
      <SearchProduct/>
     <ProductList/>
     <ProductPage/>
     <UpdataProduct/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("productModule");
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct";
import ProductPage from "./ProductPage";
import UpdataProduct from "./UpdataProduct";
export default {
  components:{
      AddProduct,
      ProductList,
      SearchProduct,
      ProductPage,
      UpdataProduct
  },
  created() {

   this.getProducts();
  },
   computed: {
    ...mapState(["products", "product"])
  },
  methods: {
    ...mapActions(["getProducts"])
  }
   
};
</script>
 
<style scoped>

</style>
