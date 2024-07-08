<template>
  <div class="data">
    <DatePanel :title="panels[0].title" :bgUrl="panels[0].bgUrl" :height="panels[0].height">
      <FlexData :data="elders" />
    </DatePanel>
    <div class="data-panel">
      <DatePanel :title="panels[1].title" :bgUrl="panels[1].bgUrl" :height="panels[1].height">
        <FlexData :data="highlight" />
      </DatePanel>
    </div>
    <div class="data-panel">
      <DatePanel :title="panels[2].title" :bgUrl="panels[2].bgUrl" :height="panels[2].height">
        <SexPie />
      </DatePanel>
    </div>
    <div class="data-panel">
      <DatePanel :title="panels[3].title" :bgUrl="panels[3].bgUrl" :height="panels[3].height">
        <ElderlyBar />
      </DatePanel>
    </div>
  </div>
</template>

<script setup>
import DatePanel from "./DataPanel.vue"
import FlexData from "./Charts/FlexData.vue"
import ElderlyBar from "./Charts/ElderlyBar.vue"
import SexPie from "./Charts/SexPie.vue"

const panels = [
  {
    title: "长者数据",
    bgUrl: new URL("@/assets/data-bg/bg-2.png", import.meta.url),
    height: 180
  },
  {
    title: "重点关注数据",
    bgUrl: new URL("@/assets/data-bg/bg-3.png", import.meta.url),
    height: 180
  },
  {
    title: "老年人性别占比",
    bgUrl: new URL("@/assets/data-bg/bg-4.png", import.meta.url),
    height: 193
  },
  {
    title: "老年人年龄层数据",
    bgUrl: new URL("@/assets/data-bg/bg-5.png", import.meta.url),
    height: 296
  }
]

const elders = [
  {
    title: "老年人总数(人)",
    iconUrl: new URL("@/assets/data-lnrzs.webp", import.meta.url),
    num: 1511,
    color: "#FEF842"
  },
  {
    title: "老龄化率(%)",
    iconUrl: new URL("@/assets/data-llhl.webp", import.meta.url),
    num: 56.7,
    color: "#22E3FF"
  },
  {
    title: "特殊困难老人(人)",
    iconUrl: new URL("@/assets/data-tsknlr.webp", import.meta.url),
    num: 282,
    color: "#39F6CA"
  }
]

const highlight = [
  {
    title: "残疾人(人)",
    iconUrl: new URL("@/assets/data-cjr.png", import.meta.url),
    num: 3570,
    color: "#A9F9FE"
  },
  {
    title: "退役军人(人)",
    iconUrl: new URL("@/assets/data-tyjr.png", import.meta.url),
    num: 900,
    color: "#FC4A5E"
  },
  {
    title: "未成年人(人)",
    iconUrl: new URL("@/assets/date-wcn.png", import.meta.url),
    num: 1108,
    color: "#F2ADFE"
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
