<template>
  <!-- <h1>各城市商品总销售额的占比</h1> -->
  <div>
    <el-radio-group v-model="type" @change="showChart">
       <el-radio-button label="各城市商品总销售额占比"></el-radio-button>
      <el-radio-button label="各城市每季度商品总销售额情况"></el-radio-button>
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
      type: "各城市商品总销售额占比",
      serveAxisData: [],
      serveSeriesData: [],
      option: {
        legend: {},
        tooltip: {
          trigger: "item",
          formatter: ""
        },
        dataset: {
          source: [["product", "一季度", "二季度", "三季度", "四季度"]]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  methods: {
    showChart() {
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "各城市商品总销售额占比") {
        axios({
          url: "/shopSys/citySale",
          method: "get",
          params: {
            status: "完成交易"
          }
        }).then(res => {
          // console.log(res.data, "456");
          this.serveAxisData = res.data.axisData;
          this.serveSeriesData = res.data.seriesData;
          myChart.setOption(this.serveOptions, true);
        });
      } else {
        axios({
          url: "/shopSys/cityQuarter",
          method: "get"
        }).then(res => {
          let arr = this.option.dataset.source.concat(res.data);
          this.option.dataset.source = arr;
          myChart.setOption(this.option);
        });
      }
    }
  },
  computed: {
    serveOptions() {
      return {
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
            name: "",
            type: "pie",
            radius: "70%",
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
  margin: auto;
}
</style>