<template>
  <div :class="[`disc`]" @click="changeStatus()" v-show="showDiscMode !== 'right'">
    <img src="@/assets/disc-left.webp" class="bg" />
    <div class="ball">
      <div v-for="(ball, index) in ballRefData" :key="ball.name" :class="[`ball-item`, { active: currentSelectBallIndex === index }]" :style="{ offsetDistance: ball.offsetDistance }" @click.stop="changeBall(index)">
        <img src="@/assets/disc-ball.png" class="ball-item-bg" v-show="currentSelectBallIndex !== index" />
        <img src="@/assets/disc-ball-select.png" class="ball-item-bg" v-show="currentSelectBallIndex === index" />
        <div class="ball-box">
          <img :src="ball.iconUrl" class="ball-icon" />
          <div class="ball-title">{{ ball.name }}</div>
        </div>
      </div>
    </div>

    <div class="des">
      <img src="@/assets/disc-right-arrow.webp" class="des-arrow" v-show="!status" />
      <img src="@/assets/disc-left-arrow.webp" class="des-arrow" v-show="status" />
      <div class="des-content" v-if="status">甘 泉 路 街 道 全 域 为 老</div>
      <div class="des-title">六 大 圈 层</div>
    </div>
  </div>

  <div class="menu" v-if="menu && menu.length > 0">
    <div v-for="(item, index) in menu" :key="item.name" @click="selectMenu(index)" class="menu-item">
      <img src="@/assets/disc-menu-select-bg.webp" class="menu-bg" v-if="selectMenuItem.name === item.name" />
      <img src="@/assets/disc-menu-bg.webp" class="menu-bg" v-else />
      <div class="menu-name">{{ item.name }}</div>
      <img src="@/assets/disc-menu-select.png" class="menu-icon" v-show="selectMenuItem.name === item.name" />
    </div>
  </div>

  <HtmlModal v-model:value="isShowModal" :htmlStr="selectMenuItem.content" :left="870" />
</template>

<script setup>
import { watch, ref } from "vue"
import { balls } from "../const/leftBallData"
import anime from "animejs"
import HtmlModal from "@/components/HtmlModal.vue"

const props = defineProps(["status", "showDiscMode"])
const emits = defineEmits(["update:status", "update:showDiscMode"])

const ballRefData = ref(balls)
const menu = ref([])
const selectMenuItem = ref({})
const isShowModal = ref(false)
const currentSelectBallIndex = ref()
let currentOffset = 120 // 初始偏移量

watch(
  () => props.status,
  () => {
    bgAnime()
    if (props.status) {
      updateItemPositions()
    }
    if (!props.status) {
      menu.value = []
      selectMenuItem.value = {}
      isShowModal.value = false
      emits("update:showDiscMode", "none")
    }
  }
)

const changeStatus = () => {
  emits("update:status", !props.status)
}

const bgAnime = () => {
  anime({
    targets: ".disc",
    translateX: props.status ? 38 : 0,
    easing: "easeInOutQuad",
    duration: 600
  })

  anime({
    targets: ".ball",
    opacity: props.status ? 1 : 0,
    easing: "easeInOutQuad",
    duration: 1000
  })
}

// 更新所有 item 的 offset-distance
function updateItemPositions() {
  ballRefData.value.forEach((item, index) => {
    let offset = currentOffset - index * 8.33
    item.offsetDistance = `${offset}%`
  })
}

// 获取当前位于"3点钟"位置的 item 的索引
function getCurrentItemIndex() {
  const normalizedOffset = ((currentOffset % 100) + 100) % 100 // 确保偏移量在 0 到 99.99 之间
  const currentIndexFloat = normalizedOffset / 8.33 // 计算当前 item 的小数索引
  const index = Math.round(currentIndexFloat) // 使用四舍五入获取整数索引
  return (index + balls.length) % balls.length
}

const changeBall = (index) => {
  isShowModal.value = false
  menu.value = ballRefData.value[index].children
  currentSelectBallIndex.value = index
  emits("update:showDiscMode", "left")
  const currentIndex = getCurrentItemIndex()
  let offsetChange = (index - currentIndex - 1) * 8.33

  // 修正 offsetChange，使其进行最小角度旋转
  if (offsetChange > 50) {
    // 点击下半部分
    offsetChange -= 100 // 100 = 12 * 8.33，表示一整圈的偏移量
  } else if (offsetChange < -50) {
    // 点击上半部分
    offsetChange += 100
  }

  // 更新当前偏移量
  currentOffset += offsetChange
  updateItemPositions()
}

const selectMenu = (index) => {
  selectMenuItem.value = menu.value[index]
  isShowModal.value = true
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.disc {
  width: 304px;
  height: 699px;
  position: absolute;
  top: 250px;
  left: -50px;
  pointer-events: auto;
}
.bg {
  width: 100%;
  height: 100%;
}
.ball {
  position: absolute;
  top: 0;
  left: 0;
  width: 304px;
  height: 699px;
  opacity: 0;
  &-item {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    offset-path: ellipse(330px 360px at 0% 50%);
    transition: offset-distance 1s;
    offset-rotate: 0deg; /* Ensure no rotation */
    transform: rotate(0deg); /* Ensure it stays upright */
    &-bg {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: rotation 16s linear infinite;
    }
  }
  &-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-icon {
    width: 23px;
    height: 23px;
  }
  &-title {
    color: white;
    font-size: 14px;
    padding-top: 6px;
  }
}
@keyframes active {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}

.active {
  animation: active 1s forwards;
}

.des {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-70%, -50%);
  display: flex;
  align-items: center;
  height: 430px;
  &-arrow {
    width: 24px;
    height: 32px;
    margin-right: 22px;
  }
  &-content {
    color: white;
    opacity: 0.8;
    font-size: 30px;
    writing-mode: vertical-rl;
    margin-right: 22px;
    user-select: none;
  }
  &-title {
    color: #3ffefc;
    font-size: 42px;
    writing-mode: vertical-rl;
    user-select: none;
  }
}
.menu {
  position: absolute;
  top: 159px;
  left: 356px;
  pointer-events: auto;
  &-item {
    cursor: pointer;
    position: relative;
    width: 456px;
    height: 73px;
    margin-top: 40px;
  }
  &-bg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-name {
    position: absolute;
    left: 30px;
    top: 46%;
    transform: translate(0, -50%);
    color: white;
    font-size: 30px;
  }
  &-icon {
    position: absolute;
    top: -35px;
    right: -38px;
    width: 163px;
    height: 137px;
  }
}
</style>
