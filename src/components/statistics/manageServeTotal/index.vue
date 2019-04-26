<template>
  <div>
      <div>服务统计</div>
    <div class="total" id="myChart" ref="myChart"></div>
  </div>
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
import axios from "axios";
export default {
    data() {
        return {
        serveData: [],
        moneyData: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.showChart();
        });
    },
     methods: {
          showChart(){
              console.log(456789)
             let myChart = echarts.init(this.$refs.myChart);
                 axios({                 
                    method: "get",
                     url: "/users/serve"
                }).then(res => {
                    console.log("ppppp")
                    console.log(res.data,"res")
                    this.serveData = res.data.num;
                    this.moneyData = res.data.qian;
                    myChart.setOption(this.serveOptions, true);
                });
        }
     },
    computed: {
          serveOptions() {
            return {
                    color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.serveData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '30%',
                    data:this.moneyData,
                }
            ]
                
            }}
    }


}
</script>
<style scoped>
.total{
    width:1000px;
    height:500px
}
</style>