<template>
  <div>
    <el-button-group>
      <el-button @click="all">所有订单</el-button>
      <el-button @click="success">已交易订单</el-button>
      <el-button @click="wait">未交易订单</el-button>
    </el-button-group>
    <el-table :data="orders" border style="width: 100%">
      <el-table-column fixed prop="petOwners.userName" label="客户" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="service.name" label="服务类型" width="120"></el-table-column>
      <el-table-column prop="service.level" label="服务等级" width="120"></el-table-column>
      <el-table-column prop="service.price" label="价格" width="120"></el-table-column>
      <el-table-column prop="service.time" label="耗时" width="120"></el-table-column>
      <el-table-column prop="stores.name" label="店铺" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="trueClick(scope.row)" type="text" size="small" :class="scope.row.status=='服务已完成'?'hide':''">确认完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="300px"  class="diaCenter" v-if="details">
      <div><span class="rig">用户：</span><span>{{details.petOwners.userName}}</span></div>
      <div><span class="rig">服务类型：</span><span>{{details.service.name}}</span></div>
      <div><span class="rig">服务等级：</span><span>{{details.service.level}}</span></div>
      <div><span class="rig">一次性服务价：</span><span>{{details.service.price}}</span></div>
      <div><span class="rig">服务总耗时：</span><span>{{details.service.time}}</span></div>
      <div :class="details.comments?'':'hide'" class="bor">
        <div class="div"><div class="rig div">用户评价：</div><div><span></span>{{details.comments.score}}</div></div>
        <div class="div"><div class="rig div"></div><div><img src="details.comments.images" alt="" width="50px"></div></div>
        <div class="div"><div class="rig div">评价内容：</div><div><span></span>{{details.comments.content}}</div></div>
        <div class="div"><div class="rig div">类型：</div><div><span></span>{{details.comments.type}}</div></div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("orderModule");
export default {
  data() {
    return {
      activeName: "first",
      dialogVisible: false,
      details:""
    };
  },
  computed: {
    ...mapState(["orders", "pagenation"])
  },
  created() {
    this.getOrders({allOrders:"服务"});
  },
  methods: {
    ...mapActions(["getOrders"]),
    all(){
      this.getOrders({allOrders:"服务"});
    },
    success() {
      this.getOrders({allOrders:"服务已完成"})
    },
    wait() {
      this.getOrders({allOrders:"服务等待中"})
    },
    handleClick(row) {
      console.log(row);
      this.details = row;
      this.dialogVisible = true;
    },
    trueClick(row){
      console.log(row,"true")
    }
  }
};
</script>

<style scoped>
.hide {
  display: none;
}
.rig{
  color: gray;
  font-weight: bolder;
}
.bor{
  border: 1px solid gray;
  margin-top: 10px;
  padding: 10px 0
}
.div{
  display: flex;
}
</style>
