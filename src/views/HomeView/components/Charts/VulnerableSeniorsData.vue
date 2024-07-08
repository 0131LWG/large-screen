<template>
  <div class="box">
    <div class="item" v-for="(item, index) in data" :key="item.title">
      <div class="item-title" :style="{ top: item.top ? pxToRem(item.top) : pxToRem(-3) }" v-html="item.title"></div>
      <div :class="`item-num item-num-${index}`">{{ item.num }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue"
import anime from "animejs"
import pxToRem from "@/utils/pxToRem.js"

const props = defineProps(["data"])

onMounted(() => {
  nextTick(() => {
    props.data.forEach((item, index) => {
      anime({
        targets: `.item-num-${index}`,
        innerHTML: [0, item.num],
        round: 100,
        easing: "linear"
      })
    })
  })
})
</script>

<style lang="scss" scoped>
.box {
  width: 338px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 18px;
  grid-column-gap: 47px;
  margin-left: 8px;
}
.item {
  position: relative;
  width: 129px;
  height: 60px;
  background-image: url("@/assets/data-sjbjh-bg.webp");
  background-position: center; /* 居中图像 */
  background-repeat: no-repeat; /* 不要重复图像 */
  background-size: cover; /* 调整背景图像的大小以覆盖整个容器 */
  &-title {
    position: absolute;
    left: 18px;
    font-size: 12px;
    color: white;
  }
  &-num {
    text-align: center;
    color: #f0c85c;
    font-size: 22px;
    margin-top: 20px;
  }
}
</style>
