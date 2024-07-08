<template>
  <div class="right-disc" @click="changeStatus()" v-show="showDiscMode !== 'left'">
    <img src="@/assets/disc-right.webp" class="bg" />
    <div class="right-ball">
      <div v-for="(ball, index) in ballRefData" :key="ball.name" :class="[`right-ball-item`, { active: currentSelectBallIndex === index }]" :style="{ offsetDistance: ball.offsetDistance }" @click.stop="changeBall(index)">
        <img src="@/assets/disc-ball.png" class="right-ball-item-bg" v-show="currentSelectBallIndex !== index" />
        <img src="@/assets/disc-ball-select.png" class="right-ball-item-bg" v-show="currentSelectBallIndex === index" />
        <div class="right-ball-box">
          <img :src="ball.iconUrl" class="right-ball-icon" />
          <div class="right-ball-title">{{ ball.name }}</div>
        </div>
      </div>
    </div>

    <div class="des">
      <div class="des-more" @click.stop="showMoreData()" v-show="status">更多数据</div>
      <div class="des-title">十 大 行 动</div>
      <div class="des-content" v-if="status">普 陀 区 普 惠 养 老 服 务</div>
      <img src="@/assets/disc-right-arrow.webp" class="des-arrow" v-show="status" />
      <img src="@/assets/disc-left-arrow.webp" class="des-arrow" v-show="!status" />
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

  <HtmlModal v-model:value="isShowModal" :htmlStr="selectMenuItem.content" :right="920" />
</template>

<script setup>
import { ref, watch } from "vue"
import { balls } from "../const/rightBallData"
import anime from "animejs"
import HtmlModal from "@/components/HtmlModal.vue"

const props = defineProps(["status", "showDiscMode"])
const emits = defineEmits(["update:status", "update:showDiscMode"])

const ballRefData = ref(balls)
const menu = ref([])
const selectMenuItem = ref({})
const isShowModal = ref(false)
const currentSelectBallIndex = ref()
let currentOffset = 70 // 初始偏移量

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
    targets: ".right-disc",
    translateX: props.status ? -38 : 0,
    easing: "easeInOutQuad",
    duration: 600
  })

  anime({
    targets: ".right-ball",
    opacity: props.status ? 1 : 0,
    easing: "easeInOutQuad",
    duration: 300
  })
}

const showMoreData = () => {
  if (currentSelectBallIndex.value !== undefined) {
    currentSelectBallIndex.value = currentSelectBallIndex.value >= 5 ? currentSelectBallIndex.value - 5 : currentSelectBallIndex.value + 5
  } else {
    currentSelectBallIndex.value = 7
  }
  changeBall(currentSelectBallIndex.value)
}

// 更新所有 item 的 offset-distance
function updateItemPositions() {
  ballRefData.value.forEach((item, index) => {
    let offset = currentOffset - index * 10
    item.offsetDistance = `${offset}%`
  })
}

// 获取当前位于"9点钟"位置的 item 的索引
function getCurrentItemIndex() {
  const normalizedOffset = ((currentOffset % 100) + 100) % 100 // 确保偏移量在 0 到 99.99 之间
  const currentIndexFloat = normalizedOffset / 10 // 计算当前 item 的小数索引
  const index = Math.round(currentIndexFloat) // 使用四舍五入获取整数索引
  return (index - 7 + balls.length) % balls.length
}

const changeBall = (index) => {
  isShowModal.value = false
  menu.value = ballRefData.value[index].children
  currentSelectBallIndex.value = index
  emits("update:showDiscMode", "right")
  const currentIndex = getCurrentItemIndex()
  let offsetChange = (index - currentIndex - 1) * 10

  // 修正 offsetChange，使其进行最小角度旋转
  if (offsetChange > 50) {
    // 点击下半部分
    offsetChange -= 100 // ，表示一整圈的偏移量
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

.right-disc {
  width: 304px;
  height: 699px;
  position: absolute;
  top: 250px;
  right: -50px;
  pointer-events: auto;
}
.bg {
  width: 100%;
  height: 100%;
}
.right-ball {
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
    offset-path: ellipse(330px 360px at 100% 50%);
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
  transform: translate(-40%, -50%);
  display: flex;
  align-items: center;
  height: 430px;
  &-more {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 94px;
    background-image: url("@/assets/disc-more.png");
    background-position: center; /* 居中图像 */
    background-repeat: no-repeat; /* 不要重复图像 */
    background-size: cover; /* 调整背景图像的大小以覆盖整个容器 */
    font-size: 12px;
    color: white;
    writing-mode: vertical-rl;
    line-height: 16px;
    margin-right: 10px;
  }
  &-arrow {
    width: 24px;
    height: 32px;
    margin-left: 22px;
    user-drag: none;
    -webkit-user-drag: none;
  }
  &-content {
    color: white;
    opacity: 0.8;
    font-size: 30px;
    writing-mode: vertical-rl;
    margin-left: 22px;
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
  top: 259px;
  right: 406px;
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
    -webkit-transform: rotate(180deg);
  }
  &-name {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translate(0, -50%);
    color: white;
    font-size: 30px;
  }
  &-icon {
    position: absolute;
    top: -35px;
    left: -38px;
    width: 163px;
    height: 137px;
  }
}
</style>
