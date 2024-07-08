<template>
  <div class="page">
    <Title v-model:currentDisplay="currentDisplay" v-model:isShowDiscStatus="isShowDiscStatus" v-model:isShowDataStatus="isShowDataStatus" />

    <div class="main">
      <Transition name="data">
        <LeftData v-if="currentDisplay === 'data' && isShowDataStatus" />
      </Transition>
      <Transition name="data">
        <Data v-model:currentDisplay="currentDisplay" v-model:isShowDataStatus="isShowDataStatus" v-if="dataStatus && showDiscMode === 'none'" />
      </Transition>
      <Transition name="data">
        <RightData v-if="currentDisplay === 'data' && isShowDataStatus" />
      </Transition>
    </div>

    <div v-show="currentDisplay === 'disc'">
      <LeftDisc v-model:status="leftDiscStatus" v-model:showDiscMode="showDiscMode" />
    </div>
    <div v-show="currentDisplay === 'disc'">
      <RightDisc v-model:status="rightDiscStatus" v-model:showDiscMode="showDiscMode" />
    </div>

    <Facilities :map="map" />
  </div>
  <div id="containerMap"></div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch, computed } from "vue"
import Title from "./components/Title.vue"
import Data from "./components/Data.vue"
import LeftDisc from "./components/LeftDisc.vue"
import RightDisc from "./components/RightDisc.vue"
import Facilities from "./components/Facilities.vue"
import LeftData from "./components/LeftData.vue"
import RightData from "./components/RightData.vue"

let map = null

onMounted(() => {
  nextTick(() => {
    map = new BMapGL.Map("containerMap") // 创建Map实例
    map.setMapStyleV2({
      styleId: "3fc53110602ce3fa0cd99894f170a290"
    })
    map.centerAndZoom(new BMapGL.Point(121.435811, 31.273375), 19)
    map.enableScrollWheelZoom(true)
    map.setHeading(64.5)
    map.setTilt(73)
  })
})

// 当前显示的状态
const currentDisplay = ref("disc") // data 数据  disc 圆

// 当前是否统一的左边右边球体的状态
const isShowDiscStatus = ref(false)
// 当前是否显示数据
const isShowDataStatus = ref(false)
// 当前单个圆的状态，用于判断是否选中查看富文本
const showDiscMode = ref("none")

// 左边右边球体的状态
const leftDiscStatus = ref(false)
const rightDiscStatus = ref(false)

const dataStatus = computed(() => {
  return currentDisplay.value === "data" ? isShowDataStatus.value : isShowDiscStatus.value
})

watch(
  () => isShowDiscStatus.value,
  (val) => {
    leftDiscStatus.value = val
    rightDiscStatus.value = val
  }
)
</script>

<style lang="scss" scoped>
#containerMap {
  width: 100%;
  height: 100%;
}
.page {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.main {
  display: flex;
  align-items: start;
  justify-content: space-around;
}

.data-enter-active,
.data-leave-active {
  transition: opacity 0.5s ease;
}

.data-enter-from,
.data-leave-to {
  opacity: 0;
}
</style>
