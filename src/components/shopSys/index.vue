<template>
    <div>
       <UpdateShop></UpdateShop>
       <AuditShop></AuditShop>
      <ShopsList></ShopsList>
      <Page></Page>
    </div>
</template>

<script>
import ShopsList from "./ShopsList";
import UpdateShop from "./UpdateShop";
import AuditShop from "./AuditShop";
import Page from "./Page";

export default {
  data() {
    return {};
  },
  components: {
    ShopsList,
    UpdateShop,
    Page,
    AuditShop
  },
  methods: {}
};
</script>

<style>
</style>
