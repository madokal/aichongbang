<template>
  <div>
    <SearchSysUser></SearchSysUser>
    <UserList></UserList>
    <Page></Page>
  
  </div>
</template>
<script>
import UserList from "./UserList";
import Page from "./Page";
import SearchSysUser from "./SearchSysUser";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("shopManagerModule");
export default {
  components: { UserList, Page, SearchSysUser},
  created() {
    this.setshopManagers();
  },
  data() {
    return {
      shopManagers: [],
      oneShopManager: {},
      pagation: {}
    };
  },
  methods: {
    ...mapActions(["setshopManagers"]),
    setoneShopManager(oneUser) {
      this.oneShopManager = oneShopManager;
    }
  }
};
</script>


<style scoped>
</style>


