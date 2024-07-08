<template>
  <div class="panel" :style="{ height: pxToRem(height) }">
    <img :src="props.bgUrl" class="panel-bg" :style="{ height: pxToRem(height) }" />
    <div class="header">
      <div class="header-title">
        <img src="@/assets/data-icon.svg" class="icon" />
        <div class="title">{{ title }}</div>
      </div>
      <img src="@/assets/data-juxing.png" class="icon-right" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue"
import pxToRem from "@/utils/pxToRem.js"

const props = defineProps(["title", "bgUrl", "height"])
</script>

<style lang="scss" scoped>
.panel {
  position: relative;
  width: 338px;
  &-bg {
    z-index: -1;
    position: absolute;
    top: 12px;
    left: 0;
    width: 100%;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  &-title {
    display: flex;
    align-items: center;
  }
}
.icon {
  width: 48px;
  height: 35px;
  &-right {
    width: 172px;
    height: 7px;
    margin-bottom: 11px;
  }
}
.title {
  font-size: 14px;
  color: white;
}
</style>
