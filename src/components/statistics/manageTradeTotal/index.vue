<template>
<div id="myChart" :style="{width: '600px', height: '300px'}"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "orderModule"
);
import axios from "axios";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      dataOrder: [],
      dataOrderNew: []
    };
  },
  computed: {
    ...mapState(["orders"])
  },
  created() {
    this.getOrders({ page:1,rows:5,allOrders: "完成交易" });
  },
  mounted() {
    this.showOrder();
    this.drawLine();
  },
  methods: {
    ...mapActions(["getOrders"]),
    showOrder() {
      let reg = /^(\d{4})\/(\d{1,12})\/(\d{1,31})$/;
      let yearArr = [];
      this.orders.map(item => {
        let date = item.date.match(reg)[1];
        yearArr.push(date);
      });
      yearArr = [...new Set(yearArr)];
      let totalArr = [];
      this.orders.map(item => {
        let date = item.date.match(reg)[1];
        yearArr.map((i, index) => {
          if (date == i) {
            totalArr.push({ name: i, value: 0 });
          }
        });
      });
      console.log(yearArr, totalArr, "ttt");

      this.orders.map(item => {
        let date = item.date.match(reg)[1];
        yearArr.map((i, index) => {
          if (i == date) {
            totalArr[index].value += parseInt(item.totalPrice);
          }
        });
      });
      let numpp = [];
      for (let i = 0; i < totalArr.length; i++) {
        numpp.push(totalArr[i].value);
      }
      this.dataOrder = yearArr;
      this.dataOrderNew = numpp;
      //  console.log(yearArr,totalArr,"ooo")
      //   for(let i = 0;i<this.dataOrder.length;i++){
      //       if(this.dataOrder[i].date == this.dataOrder[i+1].date){

      //       }
      //      this.datanew.push(this.dataOrder[i].date.match(reg)[1])
      //   }

      //   console.log(this.dataOrder);

      //   console.log(this.datanew);
      //   this.datanewOrder = [...new Set(this.datanew)];
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "商品销售额统计" },
        tooltip: {},
        xAxis: {
          data: this.dataOrder
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.dataOrderNew
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>