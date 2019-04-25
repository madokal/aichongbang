<template>
  <div>
    <el-button-group>
      <el-button @click="all">所有订单</el-button>
      <el-button @click="success">已交易订单</el-button>
      <el-button @click="wait">未交易订单</el-button>
    </el-button-group>
    <el-table :data="orders" border style="width: 100%">
      <el-table-column
        fixed
        prop="petOwners.userName"
        label="买家"
        width="150"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="orderNum" label="订单号" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="commodities.name" label="商品" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="commodities.price" label="价格" width="120"></el-table-column>
      <el-table-column prop="stores.name" label="店铺" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button
            @click="trueClick(scope.row)"
            type="text"
            size="small"
            :class="scope.row.status=='完成交易'?'hide':''"
          >确认完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="300px"
      class="diaCenter"
      v-if="details"
    >
      <div>
        <span class="rig">订单号：</span>
        <span>{{details.orderNum}}</span>
      </div>
      <div>
        <span class="rig">用户：</span>
        <span>{{details.petOwners.userName}}</span>
      </div>
      <div>
        <span class="rig">商品：</span>
        <span>{{details.commodities.name}}</span>
      </div>
      <div>
        <span class="rig">交易日期：</span>
        <span>{{details.date}}</span>
      </div>
      <div>
        <span class="rig">净重：</span>
        <span>{{details.commodities.weight}}</span>
      </div>
      <div>
        <span class="rig">建议零售价：</span>
        <span>{{details.commodities.price}}</span>
      </div>
      <div>
        <span class="rig">产地：</span>
        <span>{{details.commodities.palce}}</span>
      </div>
      <div>
        <span class="rig">保质期：</span>
        <span>{{details.commodities.shelfLife}}</span>
      </div>
      <div>
        <span class="rig">味道：</span>
        <span>{{details.commodities.taste}}</span>
      </div>
      <div>
        <span class="rig">特殊功用：</span>
        <span>{{details.commodities.specialFunc}}</span>
      </div>
      <div>
        <span class="rig">供应商：</span>
        <span>{{details.commodities.supplier}}</span>
      </div>
      <div :class="details.comments?'':'hide'" class="bor">
        <div class="div">
          <div class="rig div">用户评价：</div>
          <div>
            <span></span>
            {{details.comments.score}}
          </div>
        </div>
        <div class="div">
          <div class="rig div">评价内容：</div>
          <div>
            <span></span>
            {{details.comments.content}}
          </div>
        </div>
        <div class="div">
          <div class="rig div">类型：</div>
          <div>
            <span></span>
            {{details.comments.type}}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <OrderPage :orders="orders"/>
  </div>
</template>


<script>
import axios from "axios";
import OrderPage from "../OrderPage.vue"
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("orderModule");
export default {
  components:{
    OrderPage
  },
  data() {
    return {
      dialogVisible: false,
      details: ""
    };
  },
  computed: {
    ...mapState(["orders", "pagenation"])
  },
  created() {
    this.getOrders({ allOrders: "订单" });
    console.log(this.pagenation, "分页");
  },
  methods: {
    ...mapActions(["getOrders"]),
    all() {
      this.getOrders({ allOrders: "订单" });
    },
    success() {
      this.getOrders({ allOrders: "完成交易" });
    },
    wait() {
      this.getOrders({ allOrders: "等待交易" });
    },
    handleClick(row) {
      console.log(row, "row");
      // var outTradeNo = ""; //订单号
      // for (
      //   var i = 0;
      //   i < 6;
      //   i++ //6位随机数，用以加在时间戳后面。
      // ) {
      //   outTradeNo += Math.floor(Math.random() * 10);
      // }
      // outTradeNo = new Date().getTime() + outTradeNo; //时间戳，用来生成订单号
      // console.log(outTradeNo, "outTradeNo");
      this.details = row;
      this.dialogVisible = true;
    },
    trueClick(row) {
      console.log(row, "true", row.status, row._id);
      if (row.userStatus) {
        //用户已确认订单
        axios({
          method: "put",
          url: "/order/" + row._id,
          data: { status: row.status, id: row._id }
        }).then(res => {
          console.log(res.data, "修改");
          this.getOrders({ allOrders: "订单" });
        });
      } else {
        //等待用户确认
        this.$alert("等待用户确认订单...", "警告", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        //用户点击确认，更改用户状态
        // axios({
        //   method: "put",
        //   url: "/order/user" + row._id,
        //   data: { status: row.userStatus, id: row._id }
        // }).then(res => {
        //   console.log(res.data, "修改");
        //   // commit("setOrder", res.data);
        //   this.getOrders({ allOrders: "订单" });
        // });
      }
    },
    handleSizeChange(val) {
      this.getOrders({ rows: val });
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getOrders({ page: val });

      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.hide {
  display: none;
}
.rig {
  color: gray;
  font-weight: bolder;
}
.bor {
  border: 1px solid gray;
  margin-top: 10px;
  padding: 10px 0;
}
.div {
  display: flex;
}
</style>
