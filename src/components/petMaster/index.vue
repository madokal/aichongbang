<template>
  <div>
  <el-input placeholder="请输入内容" v-model="value" class="input-with-select" style="width:400px">
    <el-select v-model="values" slot="prepend" placeholder="请选择"  @input="searchType" style="width:120px">
        <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.values">
    </el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"  @click="searchBtn"></el-button>
  </el-input>
  <el-table
    :data="petMaster"
    style="width: 200%">

      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="src+'/image/'+scope.row.avatar" min-width="50" height="50"/>
       </template>
      </el-table-column>

    <el-table-column
        prop="userName"
      label="昵称(username)"
      width="140">
    </el-table-column>

    <el-table-column
        prop="trueName"  
      label="姓名(trueName)"
      width="140">
    </el-table-column>

     <el-table-column
        prop="vip.level"       
      label="VIP"
      width="100">
    </el-table-column>

      <el-table-column
        prop="integral"       
      label="积分"
      width="100">
       </el-table-column>

    <el-table-column label="宠物信息" style="width:140px;">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="view(scope.row)"
          >点击查看</el-button>
      </template>
    </el-table-column>

    <el-table-column
        prop="area"       
      label="区域"
      width="100">
    </el-table-column>
    <el-table-column
        prop="addr"       
      label="地址"
      width="140">
    </el-table-column>

  <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          :class="[scope.row.blacklist==0?'classA':'classB']"
          @click="rachel(scope.row.blacklist,scope.row._id)"
          >拉黑</el-button>
        <el-button
          size="mini"
          type="success"
          :class="[scope.row.blacklist==1?'classA':'classB']"
          @click="cancelRachel(scope.row.blacklist,scope.row._id)"
           >取消拉黑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="width:600px;margin:0 auto">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="cur_page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagination.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "studentModule"
);
export default {
  data() {
    return {
      search: {
        value: ""
      },
      src:"http://192.168.56.1:3000",
      value: "",
      classA: "classA",
      classB: "classB",
      type: "",
      cur_page: 1,
      values: "",
      options: [
        {
          values: "userName"
        },
        {
          values: "trueName"
        },
        {
          values: "vip"
        }
      ]
    };
  },
  created() {
    this.setPetMaster();
  },
  computed: {
    ...mapState(["petMaster", "visible", "petMasterinfor"]),
    ...mapState({ pagination: state => state.pagination })
  },
  watch: {
    "search.value"() {
      this.type = this.search.value;
    }
  },
  methods: {
    ...mapActions(["setPetMaster"]),
    view(row) {
      console.log(row);
      const h = this.$createElement;
      this.$msgbox({
        title: "宠物信息",
        message: h("p",null, [
          h("div", { style: "text-align:center" },'宠物名：'+row.pets[0].name),
          h("div", { style: "text-align:center" },'类别：'+row.pets[0].breed),
          h("div", { style: "text-align:center" },'品类：'+row.pets[0].kind),
          h("div", { style: "text-align:center" },'颜色：'+row.pets[0].color),
          h("div", { style: "text-align:center" },'出生日期：'+row.pets[0].date),
          h("div", { style: "text-align:center" },'性格：'+row.pets[0].nature),
        ]),
        confirmButtonText: '确定',
      })
    },
    rachel(blacklist, id) {
      console.log(id);
      console.log(blacklist);
      blacklist = 1;
      this.$confirm("此操作将拉黑该用户，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios({
          method: "put",
          url: "/petMaster/" + id,
          data: {
            blacklist
          }
        }).then(res => {
          this.setPetMaster();
        });
      });
    },
    cancelRachel(blacklist, id) {
      blacklist = 0;
      this.$confirm("此操作将取消拉黑，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios({
          method: "put",
          url: "/petMaster/" + id,
          data: {
            blacklist
          }
        }).then(res => {
          this.setPetMaster();
        });
      });
    },
    searchType(e) {
      this.type = e;
    },
    searchBtn() {
      console.log(this.type, this.value);
      this.setPetMaster({ type: this.type, value: this.value });
    },
    handleSizeChange(val) {
      console.log("ok");
      console.log(`每页 ${val} 条`);
      this.setPetMaster({ rows: val });
    },
    handleCurrentChange(val) {
      console.log("进来了");
      console.log(`当前页: ${val}`);
      this.cur_page = val;
      this.setPetMaster({ page: val });
    }
  }
};
</script>

<style scoped>
.classA {
  display: block;
  margin:0 auto;
}
.classB {
  display: none;
  margin:0 auto;
}
</style>
