<template>
  <div ref="chart" class="bar"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"

let chart = ref()

onMounted(() => {
  const barChart = echarts.init(chart.value)

  let dataAxis = ["60-70", "70-80", "80-90", "100+"]
  // prettier-ignore
  let data = [520, 182, 191, 120];
  const option = {
    grid: {
      top: "30px",
      left: "50px"
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
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
            { offset: 0, color: "#38F8D4" },
            { offset: 1, color: "#43EA80" }
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
  height: 290px;
}
</style>
