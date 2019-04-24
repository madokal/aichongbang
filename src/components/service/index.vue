<template>
 <div>
    <el-row>
      <el-col :span="2">
        <addService></addService>
      </el-col>
      <el-col :span="8">
        <searchService></searchService>
      </el-col>
      <el-col :span="14">
      </el-col>
    </el-row>
    <EditService></EditService>
    <ShowServices></ShowServices>
    <Page></Page>
  </div>
</template>

<script>
import ShowServices from "./ShowServices";
import addService from "./addService";
import EditService from "./EditService";
import searchService from "./searchService";
import Page from "./page";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("serviceModule");
export default {
    components: {
    ShowServices,
    addService,
    EditService,
    searchService,
    Page
  },
  created() {
    this.setServices();
  },
  methods: {
    ...mapActions(["setServices"])
  }
};
</script>

<style scoped>
</style>
