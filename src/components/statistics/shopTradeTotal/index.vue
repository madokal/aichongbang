<template>
    <div>
        <el-radio-group v-model="type" @change="showChart">
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


export default {
    data() {
        return {
            type: "门店管理销售统计",
            sellAxisData: [],
            sellSeriesData: [],
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
                axios({
                    url: "/product/sell",
                    method: "get",
                    params:{
                        sell:"完成交易"
                    }
                }).then(res => {
                    this.sellAxisData = res.data.axisData;
                    this.sellSeriesData = res.data.seriesData;
                    // console.log(res.data.seriesData)
                    myChart.setOption(this.sellOptions, true);
                });
            
        }
    },
    computed: {
        sellOptions() {
            return {
                title: {
                    text: "门店销售统计图"
                },
                tooltip: {},
                xAxis: {
                    data: this.sellAxisData
                },
                yAxis: {},
                series: [
                    {
                        name: "季度",
                        type: "bar",
                        barWidth: '30%',
                        data: this.sellSeriesData
                    }
                ]
            };
        },
    
    }
};
</script>
<style scoped>
.total {
    width: 50%;
    height: 500px;
    margin-left: 20%
}

</style>
