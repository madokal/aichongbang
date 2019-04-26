<template>
<<<<<<< HEAD
    <div>
        <router-link to="/shopApplyed"><h2>抱歉：</h2><h1>你的店铺已被查封</h1> </router-link>
=======
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

      
>>>>>>> cc661cab8113d80a4c82150d3dcc316f6353dbff
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

<<<<<<< HEAD
<style>
    div{
      background: lightskyblue;
    }
    h1{
    text-align: center; 
    }
    h2{
    text-align: center; 
    margin-top: 200px;
    }
=======
<style scoped>
.text {
  font-size: 24px;
  color: red;
}
>>>>>>> cc661cab8113d80a4c82150d3dcc316f6353dbff
</style>
