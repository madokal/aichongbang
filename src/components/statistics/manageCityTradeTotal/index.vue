<template>
  <!-- <h1>各城市商品总销售额的占比</h1> -->
  <div>
    <el-radio-group v-model="type" @change="showChart">
    </el-radio-group>
    <div class="total" id="myChart" ref="myChart"></div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入饼状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
import axios from "axios";
export default {
  data() {
    return {
      type: "各城市商品总销售额的占比",
      serveAxisData: [],
      serveSeriesData: [],
      zoom: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  methods: {
    showChart() {
      console.log("chart");
      let myChart = echarts.init(this.$refs.myChart);
      axios({
        url: "/order/serves",
        method: "get",
        params: {
          status: "服务已完成"
        }
      }).then(res => {
        console.log(res.data,"456")
        this.serveAxisData = res.data.axisData;
        this.serveSeriesData = res.data.seriesData;
        myChart.setOption(this.serveOptions, true);
      });
    }
  },
  computed: {
    serveOptions() {
      return {
        title: {
          text: "各城市商品总销售额的占比",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.serveAxisData
        },
        series: [
          {
            name: "季度服务次",
            type: "pie",
            radius: "80%",
            center: ["50%", "60%"],
            data: this.serveSeriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.total {
    width: 800px;
    height: 400px;
    margin: auto
}
</style>