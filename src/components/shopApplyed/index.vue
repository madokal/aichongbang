<template>
    <div> 
        <el-dialog
            title="警告："
            :visible.sync="visible"
            :before-close="handleClose"
            width="30%"
        >
            <span class="text">你的门店已被查封！！！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="handleBtn">确 定</el-button>
            </span>
</el-dialog>

      
    </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    };
  },
  methods: {
    handleBtn() {
      console.log(1);
      this.visible = true;
      this.$router.push("/login");
    },
    handleClose() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 24px;
  color: red;
}
</style>
