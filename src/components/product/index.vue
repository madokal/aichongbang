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
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState ,mapMutations} = createNamespacedHelpers("productModule");
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
   axios({
       method: "get",
          url: "/login/getSession"
   }).then(res=>{
        let id = res.data._id;
         axios({
            method: "get",
            url: "/product/shop",
            params: { id }
          }).then(res=>{
                this.setShopId(res.data[0]._id);
                 this.getProducts();
          })
   })
  
  },
   computed: {
    ...mapState(["products", "product"])
  },
  methods: {
    ...mapActions(["getProducts"]),
     ...mapMutations(["setShopId"]),
  },
  
   
};
</script>
 
<style scoped>

</style>
