<template>
  <div>
   <AddSupplier></AddSupplier>
   <UpdateSupplier></UpdateSupplier>
   <SearchSupplier></SearchSupplier>
   <SupplierList></SupplierList>
   <SupplierPage></SupplierPage>
  </div>
</template>

<script>
import AddSupplier from './AddSupplier';
import SearchSupplier from './SearchSupplier';
import UpdateSupplier from './UpdateSupplier';
import SupplierList from './SupplierList';
import SupplierPage from './SupplierPage';
import { mapActions } from "vuex";
export default {
  methods:{
  
    ...mapActions(["setSuppliers"]),
    // show(page = 1, rows = 5,type,value) {
    //     axios({
    //         method: 'get',
    //         url: '/providers',
    //         params: {
    //             page,
    //             rows,
    //             type,
    //             value
    //         }
    //     }).then((res) => {
    //         this.suppliers = res.data.rows;
    //     })
    // },
    // setSupplier(supplier) {
    //     console.log(this.supplier)
    //     this.supplier = supplier;
    // }
  },
   components: {
    AddSupplier,
    UpdateSupplier,
    SearchSupplier,
    SupplierList,
    SupplierPage
  }
};
</script>

<style scoped>
</style>
