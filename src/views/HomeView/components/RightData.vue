<template>
  <div class="data">
    <DatePanel :title="panels[0].title" :bgUrl="panels[0].bgUrl" :height="panels[0].height">
      <VulnerableSeniorsData :data="vulnerableSeniorsData" />
    </DatePanel>
    <div class="data-panel">
      <DatePanel :title="panels[1].title" :bgUrl="panels[1].bgUrl" :height="panels[1].height">
        <SeniorCareBar />
      </DatePanel>
    </div>
    <div class="data-panel">
      <DatePanel :title="panels[2].title" :bgUrl="panels[2].bgUrl" :height="panels[2].height">
        <SeniorCarePie />
      </DatePanel>
    </div>
  </div>
</template>

<script setup>
import DatePanel from "./DataPanel.vue"
import SeniorCareBar from "./Charts/SeniorCareBar.vue"
import VulnerableSeniorsData from "./Charts/VulnerableSeniorsData.vue"
import SeniorCarePie from "./Charts/SeniorCarePie.vue"

const panels = [
  {
    title: "特殊困难老人",
    bgUrl: new URL("@/assets/data-bg/bg-6.png", import.meta.url),
    height: 262
  },
  {
    title: "家庭养老支持",
    bgUrl: new URL("@/assets/data-bg/bg-7.png", import.meta.url),
    height: 350
  },
  {
    title: "养老方式",
    bgUrl: new URL("@/assets/data-bg/bg-8.png", import.meta.url),
    height: 250
  }
]

const vulnerableSeniorsData = [
  {
    title: "高龄独居老人(人)",
    num: 262
  },
  {
    title: "高龄纯老家庭(人)",
    num: 350
  },
  {
    title: "重度失能老人(人)",
    num: 250
  },
  {
    title: "重残老年人(人)",
    num: 262
  },
  {
    title: "计划生育<br>特殊家庭老年人(人)",
    num: 350,
    top: -18
  },
  {
    title: "其他特殊<br>困难老年人(人)",
    num: 250,
    top: -18
  }
]
</script>

<style lang="scss" scoped>
.data {
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}

.data-panel {
  margin-top: 10px;
}
</style>
