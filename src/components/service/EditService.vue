<template>
  <div>
    <el-dialog title="修改服务" :visible.sync="visible" width="30%" :before-close="close">
      <el-form ref="editForm" label-width="100px" :model="service" :rules="editRules">
        <el-form-item label="服务类型:" prop="serviceType">
          <el-select v-model="serviceType" @change="selectChange">
            <el-option
              v-for="item in selectlists"
              :key="item._id"
              :lable="item._id"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务名称:" prop="name">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务时间:" prop="scheduling">
          <el-input v-model="scheduling" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用规格:" prop="weight">
          <el-input v-model="weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="大概耗时:" prop="time">
          <el-input v-model="time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="基础价格:" prop="price">
          <el-input v-model="price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setVisible(false)">取 消</el-button>
        <el-button type="primary" @click="edit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "serviceModule"
);
import axios from "axios";
export default {
  created() {
    this.getSelectlist();
  },
  data() {
    return {
      editRules: {
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
          { required: true, message: "请输入使用规格", trigger: "change" }
        ],
        time: [
          { required: true, message: "请输入大概耗时", trigger: "change" }
        ],
        price: [
          { required: true, message: "请输入基础价格", trigger: "change" }
        ]
      },
      selectlists: [],
      serviceTypeId: ""
    };
  },
  computed: {
    ...mapState(["service", "visible", "pagination"]),
    serviceType: {
      set(serviceType) {
        this.setService({
          ...this.service,
          serviceType: {
            name: serviceType
          }
        });
      },
      get() {
        return this.service.serviceType.name;
      }
    },
    name: {
      set(name) {
        this.setService({
          ...this.service,
          name
        });
      },
      get() {
        return this.service.name;
      }
    },
    scheduling: {
      set(scheduling) {
        this.setService({
          ...this.service,
          scheduling
        });
      },
      get() {
        return this.service.scheduling;
      }
    },
    weight: {
      set(weight) {
        this.setService({
          ...this.service,
          weight
        });
      },
      get() {
        return this.service.weight;
      }
    },
    time: {
      set(time) {
        this.setService({
          ...this.service,
          time
        });
      },
      get() {
        return this.service.time;
      }
    },
    price: {
      set(price) {
        this.setService({
          ...this.service,
          price
        });
      },
      get() {
        return this.service.price;
      }
    }
  },
  methods: {
    ...mapMutations(["setService", "setVisible"]),
    ...mapActions(["setServices"]),
    edit(editForm) {
      this.$refs[editForm].validate(valid => {
        let {
          _id,
          name,
          scheduling,
          weight,
          time,
          price,
          level,
          stores
        } = this.service;
        if (valid) {
          axios({
            method: "put",
            url: "/service/" + _id,
            data: {
              serviceTypeId: this.serviceTypeId,
              name,
              scheduling,
              weight,
              time,
              price,
              level,
              stores
            }
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success("修改成功");
              this.setVisible(false);
              this.setServices({ page: this.pagination.curpage });
            }
          });
        } else {
          this.$message.error("请输入完整的信息");
        }
      });
    },
    close() {
      this.setVisible(false);
    },
    getSelectlist() {
      axios({
        method: "get",
        url: "/service/getSession"
      }).then(res => {
        let storeId = res.data;
        axios({
          method: "get",
          url: "/service/serviceType",
          params: {
            storeId
          }
        }).then(res => {
          this.selectlists = res.data;
        });
      });
    },
    selectChange(val) {
      var obj = {};
      obj = this.selectlists.find(function(item) {
        //obj是选中的对象
        return item.name === val;
      });
      this.serviceTypeId = obj._id;
    }
  }
};
</script>

<style>
</style>
