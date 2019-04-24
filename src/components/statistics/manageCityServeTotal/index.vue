<template>
     <div>
        <el-radio-group v-model="type" @change="showChart">
            <el-radio-button label="平台管理员统计城市服务总销售额的占比"></el-radio-button>
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

        }
    },
    computed:{
         classesOptions() {
            return {
                title: {
                    text: "平台管理员统计城市服务总销售额的占比"
                },
                tooltip: {},
                xAxis: {
                    data: this.classAxisData
                },
                yAxis: {},
                series: [
                    {
                        name: "人数",
                        type: "bar",
                        data: this.classSeriesData
                    }
                ]
            };
        }
    }
}
</script>
<style scoped>

</style>

