<template>
  <div class="flex">
    <div v-for="(item, index) in data" :key="item.title" class="flex-item">
      <img :src="item.iconUrl" class="item-icon" />
      <div :style="{ color: item.color }" :class="`item-num item-num-${index}`">{{ item.num }}</div>
      <div class="item-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue"
import anime from "animejs"

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
.flex {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.item {
  &-icon {
    width: 81px;
    height: 79px;
  }
  &-num {
    font-size: 28px;
    margin: 2px 0 3px 0;
  }
  &-title {
    color: white;
    font-size: 12px;
  }
}
</style>
