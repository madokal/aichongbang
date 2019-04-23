<template>
    <div>
       <UpdateShop></UpdateShop>
      <ShopsList></ShopsList>
      <Page></Page>
    </div>
</template>

<script>
import ShopsList from "./ShopsList";
import UpdateShop from "./UpdateShop";
import Page from "./Page";

export default {
  data() {
    return {};
  },
  components: {
    ShopsList,
    UpdateShop,
    Page
  },
  methods: {}
};
</script>

<style>
</style>
