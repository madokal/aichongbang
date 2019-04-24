<template>
 <div>
    <el-row>
      <el-col :span="2">
        <addServiceType></addServiceType>
      </el-col>
      <el-col :span="8">
        <searchServiceType></searchServiceType>
      </el-col>
      <el-col :span="14">
      </el-col>
    </el-row>
    <EditServiceType></EditServiceType>
    <ShowServiceTypes></ShowServiceTypes>
    <Page></Page>
  </div>
</template>

<script>
import ShowServiceTypes from "./ShowServiceTypes";
import addServiceType from "./addServiceType";
import EditServiceType from "./EditServiceType";
import searchServiceType from "./searchServiceType";
import Page from "./page";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("serviceTypeModule");
export default {
    components: {
    ShowServiceTypes,
    addServiceType,
    EditServiceType,
    searchServiceType,
    Page
  },
  created() {
    this.setServiceTypes();
  },
  methods: {
    ...mapActions(["setServiceTypes"])
  }
};
</script>

<style scoped>
</style>
