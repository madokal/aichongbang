<template>
  <div style="display:inline">
    <el-button type="primary" @click="dialogVisible = true">增加服务</el-button>
    <el-dialog title="增加服务" :visible.sync="dialogVisible" width="30%">
      <el-form ref="addform" label-width="100px" :model="addform" :rules="addRules">
        <el-form-item label="服务类型:" prop="serviceType">
          <el-select v-model="addform.serviceType" @change="selectChange" placeholder="服务类型">
            <el-option
              v-for="item in selectlists"
              :key="item._id"
              :lable="item._id"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务名称:" prop="name">
          <el-input v-model="addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务时间:" prop="scheduling">
          <el-input v-model="addform.scheduling" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用规格:" prop="weight">
          <el-input v-model="addform.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="大概耗时:" prop="time">
          <el-input v-model="addform.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="基础价格:" prop="price">
          <el-input v-model="addform.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('addform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("serviceModule");
import axios from "axios";
export default {
  created() {
    this.getSelectlist();
  },
  computed: {
    ...mapState(["pagination"])
  },
  data() {
    return {
      dialogVisible: false,
      addform: {
        serviceType: "",
        serviceTypeId:"",
        name: "",
        scheduling: [],
        weight: "",
        time: "",
        price: ""
      },
      addRules: {
        serviceType: [
          { required: true, message: "请选择服务类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入服务名称", trigger: "change" }
        ],
        scheduling: [
          { required: true, message: "请输入服务时间", trigger: "change" }
        ],
        weight: [
          { required: true, message: "请输入适用规格", trigger: "change" }
        ],
        time: [
          { required: true, message: "请输入大概耗时", trigger: "change" }
        ],
        price: [
          { required: true, message: "请输入基础价格", trigger: "change" }
        ]
      },
      selectlists: []
    };
  },
  methods: {
    ...mapActions(["setServices"]),
    add(addform) {
      this.$refs[addform].validate(valid => {
        let storeId="5cbaf6105caaca6f075a087e";
        let {
          serviceTypeId,
          name,
          scheduling,
          weight,
          time,
          price
        } = this.addform;
        if (valid) {
          axios({
            method: "post",
            url: "/service",
            data: {
              serviceTypeId,
              name,
              scheduling,
              weight,
              time,
              price,
              level: "默认初级",
              storeId
            }
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success("增加成功！");
              this.setServices({ page: this.pagination.maxpage });
            }
          });
          this.dialogVisible = false;
          this.$refs[addform].resetFields();
        } else {
          this.$message.error("请输入完整的信息");
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.addform.resetFields();
    },
    getSelectlist() {
      let storeId="5cbaf6105caaca6f075a087e";
      axios({
        method: "get",
        url: "/service/serviceType",
        params:{
          storeId
        }
      }).then(res => {
        this.selectlists = res.data;
      });
    },
    selectChange(val) {
      var obj = {};
      obj = this.selectlists.find(function(item) {//obj是选中的对象
        return item.name === val;
      });
      this.addform.serviceTypeId = obj._id;
      this.addform.serviceType = obj.name;
    }
  }
};
</script>

<style>
</style>
