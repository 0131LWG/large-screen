<template>
  <div ref="chart" class="pie"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"

let chart = ref()

onMounted(() => {
  const pieChart = echarts.init(chart.value)
  const color1 = new echarts.graphic.LinearGradient(
    0,
    1,
    0,
    0,
    [
      { offset: 0, color: "#2C6B4A" },
      { offset: 1, color: "#67B98E" }
    ],
    false
  )
  const color2 = new echarts.graphic.LinearGradient(
    0,
    1,
    0,
    0,
    [
      { offset: 0.37, color: "#287F92" },
      { offset: 1, color: "#37DCFF" }
    ],
    false
  )
  const color3 = new echarts.graphic.LinearGradient(
    0,
    1,
    0,
    0,
    [
      { offset: 0, color: "#C17215" },
      { offset: 1, color: "#E5B36C" }
    ],
    false
  )
  const option = {
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        center: ["50%", "50%"],
        roseType: "area",
        data: [
          { value: 20, name: "社区养老" },
          { value: 32, name: "机构养老" },
          { value: 50, name: "居家养老" }
        ]
      }
    ],
    color: [color1, color2, color3]
  }
  option && pieChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.pie {
  width: 338px;
  height: 220px;
}
</style>
