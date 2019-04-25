<template>
     <div>
        <el-radio-group v-model="type" @change="showChart">
            <!-- <el-raadio-button label="平台管理员统计城市服务总销售额的占比"></el-raadio-button> -->
        </el-radio-group>
        <div class="total" id="myChart" ref="myChart"></div>
    </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar"
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
     data() {
        return {
            type: "平台管理员统计城市服务总销售额的占比",
             cityAxisData: [],
           citySeriesData: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.showChart();
        });
    },
    methods:{
        showChart(){
             console.log("chart");
            let myChart = echarts.init(this.$refs.myChart);
            axios({
                    url: "/supplier/orders",
                    method: "get",
                    params:{
                                status:"服务已完成"
                                }
                }).then(res => {
                    this.cityAxisData = res.data.axisData;
                    this.citySeriesData = res.data.seriesData;
                    myChart.setOption(this.cityOptions, true);
                });
        }
    },
    computed:{
         cityOptions() {
            return {
                title: {
                    text: "平台管理员统计城市服务总销售额的占比",
                    x:"center"
                },
                tooltip: {
                     trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "80%",
                    data: this.cityAxisData
                },
                series: [
                    {
                        name: "城市服务销售额总占比",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "50%"],
                        data: this.citySeriesData,
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
}
</script>
<style scoped>
.total{
    width:100%;
    height:500px
}
</style>


