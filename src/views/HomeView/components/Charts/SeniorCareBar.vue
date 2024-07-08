<template>
  <div ref="chart" class="bar"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"

let chart = ref()

onMounted(() => {
  const barChart = echarts.init(chart.value)

  let dataAxis = ["老伙伴计划", "家庭招呼床位", "居家养老", "长护险", "送餐上门", "适老化改造"]
  // prettier-ignore
  let data = [520, 182, 191, 120, 530, 380];
  const option = {
    grid: {
      top: "30px",
      left: "50px"
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        rotate: 60,
        color: "#fff"
      },
      axisLine: {
        symbol: ["none", "arrow"]
      }
    },
    yAxis: {
      name: "(人)",
      nameTextStyle: {
        color: "#fff"
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#fff"
      },
      axisLine: {
        show: true,
        symbol: ["none", "arrow"]
      }
    },
    series: [
      {
        type: "bar",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#01FEF6" },
            { offset: 1, color: "#00ACE9" }
          ])
        },
        data: data
      }
    ]
  }
  option && barChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.bar {
  width: 338px;
  height: 310px;
}
</style>
