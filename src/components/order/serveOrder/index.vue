<template>
  <div>
    <el-button-group>
      <el-button @click="all">所有服务单</el-button>
      <el-button @click="success">已完成服务单</el-button>
      <el-button @click="wait">未完成服务单</el-button>
    </el-button-group>
    <el-table :data="orders" border style="width: 100%">
      <el-table-column
        fixed
        prop="petOwners.userName"
        label="客户"
        width="150"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="orderNum" label="订单号" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="service.name" label="服务类型" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="service.level" label="服务等级" width="120"></el-table-column>
      <el-table-column prop="service.price" label="价格" width="120"></el-table-column>
      <el-table-column prop="service.time" label="耗时" width="120"></el-table-column>
      <el-table-column prop="stores.name" label="店铺" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button
            @click="trueClick(scope.row)"
            type="text"
            size="small"
            :class="scope.row.status=='服务已完成'?'hide':''"
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
        <span class="rig">服务类型：</span>
        <span>{{details.service.name}}</span>
      </div>
      <div>
        <span class="rig">服务等级：</span>
        <span>{{details.service.level}}</span>
      </div>
      <div>
        <span class="rig">一次性服务价：</span>
        <span>￥{{details.service.price}}</span>
      </div>
      <div>
        <span class="rig">{{details.userStatus?"服务总耗时：":"预计服务总耗时："}}</span>
        <span>{{details.service.time}}</span>
      </div>
      <div>
        <span class="rig">交易日期：</span>
        <span>{{details.date}}</span>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenation.curpage"
      :page-size="pagenation.eachpage"
      :page-sizes="[1,3,5,8,10,15,20,30]"
      layout="total, prev, pager, next, sizes"
      :total="pagenation.total"
    ></el-pagination>
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
      details: "",
      count: 0,
      rows: 0
    };
  },
  computed: {
    ...mapState(["orders", "pagenation"])
  },
  created() {
    this.getOrders({ orderDeal: "服务" });
  },
  methods: {
    ...mapActions(["getOrders"]),
    all() {
      this.getOrders({ orderDeal: "服务" });
      this.count = 0;
    },
    success() {
      this.getOrders({ orderStatus: "服务已完成" });
      this.count = 1;
    },
    wait() {
      this.getOrders({ orderStatus: "服务等待中" });
      this.count = 2;
    },
    handleClick(row) {
      this.details = row;
      this.dialogVisible = true;
    },
    trueClick(row) {
      if (row.userStatus) {
        //用户已确认订单
        axios({
          method: "put",
          url: "/order/" + row._id,
          data: { status: row.status, id: row._id }
        }).then(res => {
          this.getOrders({ allOrders: "服务" });
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
      if (this.count == 0) {
        this.getOrders({ rows: val, orderDeal: "服务", ...Option });
      } else if (this.count == 1) {
        this.getOrders({ rows: val, orderStatus: "服务已完成" });
      } else {
        this.getOrders({ rows: val, orderStatus: "服务等待中" });
      }
      this.rows = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let rows = this.rows;
      if (this.count == 0) {
        this.getOrders({ page: val, rows, orderDeal: "服务" });
      } else if (this.count == 1) {
        this.getOrders({ page: val, rows, orderStatus: "服务已完成" });
      } else {
        this.getOrders({ page: val, rows, orderStatus: "服务等待中" });
      }
      // console.log(`当前页: ${val}`);
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
