<template>
     <div style="margin-bottom:10px">
        <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
          <el-select v-model="type" slot="prepend" placeholder="请选择" class="select-type">
            <el-option label="店名" value="name"></el-option>
            <el-option label="地址" value="permitAddr"></el-option>
            <el-option label="法人" value="legalPerson"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations, mapState } = createNamespacedHelpers("shops");
export default {
  data() {
    return {};
  },
  props: ["search"],
  computed: {
    ...mapState(["searchInfo"]),
    type: {
      set(type) {
        this.setSearchInfo({
          ...this.searchInfo,
          type
        });
      },
      get() {
        return this.searchInfo.type;
      }
    },
    value: {
      set(value) {
        this.setSearchInfo({
          ...this.searchInfo,
          value
        });
      },
      get() {
        return this.searchInfo.value;
      }
    }
  },
  methods: {
    ...mapMutations(["setSearchInfo"])
  }
};
</script>

<style scoped>
.input-with-select {
  width: 400px;
}
.select-type {
  width: 100px;
}
</style>
