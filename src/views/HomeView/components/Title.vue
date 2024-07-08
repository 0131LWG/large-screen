<template>
  <div class="title">
    <img src="@/assets/home.webp" class="home" v-if="currentDisplay === 'data'" @click="getHome()" />

    <div class="title-address-bg" @click="changeShowRegionSelect()">
      {{ currentRegion.name }}
      <img src="@/assets/title-address-bg-arrow.webp" :class="[showRegionSelect ? 'arrow-active' : 'arrow']" />
    </div>
    <Transition name="select">
      <div v-show="showRegionSelect" class="option">
        <div v-for="(region, index) in regionList" :key="region.id" @click="handelRegion(index)" class="option-item">{{ region.name }}</div>
      </div>
    </Transition>
    <div class="title-name">{{ currentRegion.name }}全域养老体系</div>
    <div class="title-data-bg" @click="changeStatus()">
      全部{{ currentArrowStatusData.name }}
      <img src="@/assets/title-data-bg-arrow.webp" :class="[currentArrowStatusData.class]" />
    </div>
  </div>
</template>

<script setup>
import { defineEmits, onMounted, watch, ref, computed } from "vue"
import { getRegionList } from "@/api/index.js"

const props = defineProps(["currentDisplay", "isShowDiscStatus", "isShowDataStatus"])
const emits = defineEmits(["update:currentDisplay", "update:isShowDiscStatus", "update:isShowDataStatus"])

const showRegionSelect = ref(false)
const regionList = ref([])
const currentRegion = ref({})

const currentArrowStatusData = computed(() => {
  const status = props.currentDisplay === "disc" ? props.isShowDiscStatus : props.isShowDataStatus
  return {
    name: status ? "收起" : "展开",
    class: status ? "arrow-active" : "arrow"
  }
})

const getRegionListApi = () => {
  // const res = await getRegionList()
  const data =  [
    {
      "id": 1,
      "name": "甘泉街道",
      "displayOrder": 1,
      "isDeleted": false,
      "centerPoint": ""
    },
    {
      "id": 2,
      "name": "章家巷",
      "displayOrder": 2,
      "isDeleted": false,
      "centerPoint": ""
    }
  ];
  regionList.value = data
  currentRegion.value = data[0]
}

const changeStatus = () => {
  props.currentDisplay === "disc" ? emits("update:isShowDiscStatus", !props.isShowDiscStatus) : emits("update:isShowDataStatus", !props.isShowDataStatus)
}

const getHome = () => {
  emits("update:isShowDataStatus", false)
  setTimeout(() => {
    emits("update:currentDisplay", "disc")
  }, 500)
}

onMounted(() => {
  getRegionListApi()
})

watch(
  () => showRegionSelect.value,
  (val) => {
    val ? document.addEventListener("click", handleDocumentClick) : document.removeEventListener("click", handleDocumentClick)
  }
)

const changeShowRegionSelect = () => {
  showRegionSelect.value = !showRegionSelect.value
}

const handleDocumentClick = (event) => {
  if (!["title-address-bg", "option-item"].includes(event.srcElement.className)) {
    showRegionSelect.value = false
  }
}

const handelRegion = (index) => {
  currentRegion.value = regionList.value[index]
  showRegionSelect.value = false
}
</script>

<style lang="scss" scoped>
.home {
  position: fixed;
  top: 0px;
  left: 5px;
  width: 95px;
  height: 100px;
  cursor: pointer;
}
.title {
  width: 1862px;
  height: 80px;
  background-image: url("@/assets/title.webp");
  background-position: center; /* 居中图像 */
  background-repeat: no-repeat; /* 不要重复图像 */
  background-size: cover; /* 调整背景图像的大小以覆盖整个容器 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  padding: 0 104px;
  box-sizing: border-box;
  pointer-events: auto;
  &-address-bg {
    cursor: pointer;
    width: 148px;
    height: 54px;
    background-image: url("@/assets/title-address-bg.webp");
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
    margin-top: 10px;
    padding: 0;
    @extend .title;
  }
  &-data-bg {
    width: 138px;
    height: 52px;
    margin-top: 11px;
    background-image: url("@/assets/title-data-bg.webp");
    @extend .title-address-bg;
  }
  &-name {
    margin-top: 10px;
    background: linear-gradient(0deg, #ffffff 0%, #a4d8ff 100%);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 43px;
  }
}
.arrow {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  &-active {
    @extend .arrow;
    transform: rotateX(-180deg);
  }
}
.option {
  z-index: 11;
  position: fixed;
  left: 114px;
  top: 70px;
  width: 148px;
  border-radius: 4px;
  overflow: hidden;
  &-item {
    cursor: pointer;
    padding: 10px;
    color: white;
    font-size: 14px;
    padding: 10px 12px;
    background-color: rgba(7, 97, 203, 0.4);
  }
}

.select-enter-active,
.select-leave-active {
  transition: opacity 1s ease;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
}
</style>
