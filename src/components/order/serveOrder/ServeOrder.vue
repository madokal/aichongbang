<template>
  <div>
    <el-button-group>
      <el-button @click="all">所有服务单</el-button>
      <el-button @click="success">已完成服务单</el-button>
      <el-button @click="waitting">正在服务</el-button>
      <el-button @click="wait">预约服务</el-button>
    </el-button-group>
    <el-table :data="orders" border style="width: 100%">
      <el-table-column
        fixed
        prop="petOwners.userName"
        label="客户"
        width="150"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="service.name" label="服务类型" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="service.level" label="服务等级" width="120"></el-table-column>
      <el-table-column prop="service.price" label="价格" width="120"></el-table-column>
      <el-table-column prop="service.time" label="耗时" width="120"></el-table-column>
      <el-table-column prop="stores.name" label="店铺" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" icon="el-icon-message" type="primary" size="mini" circle></el-button>
          <el-button
            @click="makeClick(scope.row)"
            icon="el-icon-loading"
            type="success"
            size="mini"
            circle
            :class="scope.row.status=='服务进行中'?'':'hide'"
          ></el-button>
          <el-button
            @click="trueClick(scope.row)"
            icon="el-icon-check"
            type="danger"
            size="mini"
            circle
            :class="scope.row.status=='服务已预约'?'':'hide'"
          ></el-button>
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
        <span class="rig">订单号(客户手机号)：</span>
        <span>{{details.petOwners.tel.substr(0,3)+'****'+details.petOwners.tel.substr(7)}}</span>
      </div>
      <div>
        <span class="rig">服务号：</span>
        <span>{{details.status=='服务已完成'?details.serveNum:'服务还未完成,服务号须由客户提供,服务完成后服务号才可见!'}}</span>
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
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("orderModule");
export default {
  data() {
    return {
      activeName: "first",
      dialogVisible: false,
      details: "",
      count: 0,
      rows: 0,
      storeId: ""
    };
  },
  computed: {
    ...mapState(["orders", "pagenation"])
  },
  created() {
    this.show();
    // this.getStoreId();
  },
  methods: {
    ...mapActions(["getOrders"]),
    show() {
      axios({
        method: "get",
        url: "/order/getSession"
      }).then(res => {
        let userId = res.data._id;
        axios({
          method: "post",
          url: "/order/" + userId,
          data: {
            id: userId
          }
        }).then(res => {
          console.log(res.data, "store");
          this.storeId = res.data[0]._id;
          this.getOrders({ orderDeal: "服务", storeId: res.data[0]._id });
        });
      });
    },
    all() {
      this.getOrders({ orderDeal: "服务", storeId: this.storeId });
      this.count = 0;
    },
    success() {
      this.getOrders({ orderStatus: "服务已完成", storeId: this.storeId });
      this.count = 1;
    },
    waitting() {
      this.getOrders({ orderStatus: "服务进行中", storeId: this.storeId });
      this.count = 2;
    },
    wait() {
      this.getOrders({ orderStatus: "服务已预约", storeId: this.storeId });
      this.count = 3;
    },
    handleClick(row) {
      this.details = row;
      this.dialogVisible = true;
    },
    trueClick(row) {
      axios({
        method: "get",
        url: "/order/waitting",
        params: {
          status: "服务进行中"
        }
      }).then(res => {
        if (res.data.length == row.stores.workers.length) {
          this.$alert("当前服务数已满,已经忙不过来啦!", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        } else {
          this.$confirm("是否确认开始服务?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              //开始进行服务
              axios({
                method: "put",
                url: "/order/" + row._id,
                data: { id: row._id, status: row.status }
              }).then(res => {
                this.getOrders({
                  orderStatus: "服务已预约",
                  storeId: this.storeId
                });
              });
              this.$message({
                type: "success",
                message: "服务已开始!"
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        }
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
    },
    makeClick(row) {
      this.$prompt("请输入当前服务单号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: function(value) {
          if (value == row.orderNum) {
            return true;
          } else {
            return false;
          }
        },
        inputErrorMessage: "服务单号不正确"
      })
        .then(({ value }) => {
          axios({
            method: "put",
            url: "/order/" + row._id,
            data: { id: row._id, status: row.status }
          }).then(res => {
            this.getOrders({
              orderStatus: "服务进行中",
              storeId: this.storeId
            });
          });
          this.$message({
            type: "success",
            message: "服务已开始!"
          });
          this.$message({
            type: "success",
            message: "当前服务单号是: " + value + ",已完成服务!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleSizeChange(val) {
      if (this.count == 0) {
        this.getOrders({ rows: val, orderDeal: "服务", storeId: this.storeId });
      } else if (this.count == 1) {
        this.getOrders({
          rows: val,
          orderStatus: "服务已完成",
          storeId: this.storeId
        });
      } else if (this.count == 2) {
        this.getOrders({
          rows: val,
          orderStatus: "服务进行中",
          storeId: this.storeId
        });
      } else {
        this.getOrders({
          rows: val,
          orderStatus: "服务已预约",
          storeId: this.storeId
        });
      }
      this.rows = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let rows = this.rows;
      if (this.count == 0) {
        this.getOrders({
          page: val,
          rows,
          orderDeal: "服务",
          storeId: this.storeId
        });
      } else if (this.count == 1) {
        this.getOrders({
          page: val,
          rows,
          orderStatus: "服务已完成",
          storeId: this.storeId
        });
      } else if (this.count == 2) {
        this.getOrders({
          page: val,
          rows,
          orderStatus: "服务进行中",
          storeId: this.storeId
        });
      } else {
        this.getOrders({
          page: val,
          rows,
          orderStatus: "服务已预约",
          storeId: this.storeId
        });
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
