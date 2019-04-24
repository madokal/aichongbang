<template>
  <div style="margin-top: 15px;width:450px;display:inline">
    <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
      <el-select slot="prepend" placeholder="请选择" v-model="searchType">
        <el-option label="服务名称" value="name"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
    </el-input>
  </div>
</template>

<script>
import { createNamespacedHelpers} from 'vuex'
const {mapActions,mapState, mapMutations } = createNamespacedHelpers('serviceTypeModule')
export default {
    computed:{
        ...mapState(['type','value']),
        searchType:{
            set(type){
                this.setType(type);
            },
            get(){
                return this.type
            }
        },
        searchValue:{
            set(value){
                this.setValue(value);
            },
            get(){
                return this.value
            }
        }

    },
    methods:{
        ...mapActions(['setServiceTypes']),
        ...mapMutations(['setType','setValue']),
        search(){
             this.setServiceTypes({page:1, rows:5, type:this.type, value:this.value});
        }
    }
};
</script>

<style>
.el-select .el-input {
  width: 120px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
