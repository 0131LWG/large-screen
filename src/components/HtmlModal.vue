<template>
  <Transition name="modal">
    <div v-if="value" class="modal" :style="{ left: left ? pxToRem(left) : 'auto', right: right ? pxToRem(right) : 'auto' }">
      <img src="@/assets/close.webp" class="close" @click="emits('update:value', false)" />
      <div v-html="htmlStr" class="html"></div>
    </div>
  </Transition>
</template>

<script setup>
import pxToRem from "@/utils/pxToRem.js"

const props = defineProps(["value", "htmlStr", "left", "right"])
const emits = defineEmits(["update:value"])
</script>

<style lang="scss" scoped>
.modal {
  pointer-events: auto;
  position: fixed;
  top: 141px;
  width: 583px;
  padding: 38px;
  border: 1px solid #027ad2;
  background: rgba(6, 99, 196, 0.8);
  border-radius: 5px;
  position: absolute;
  box-sizing: border-box;
}
.close {
  z-index: 1;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  position: absolute;
}
.html {
  margin-top: 10px;
  color: #fff;
  max-height: 644px;
  overflow-y: scroll;
  opacity: 1;
}

.html::-webkit-scrollbar {
  display: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
