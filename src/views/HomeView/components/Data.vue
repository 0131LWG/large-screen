<template>
  <div class="data">
    <div v-for="(item, index) in data" :key="item.title" :class="[!isShowDataStatus ? 'data-item' : 'data-item-more']" v-show="!isShowDataStatus || (isShowDataStatus && index < 7)">
      <img src="@/assets/data-bg.webp" class="data-bg" />
      <div class="data-title">{{ item.title }}</div>
      <div :class="`data-num data-num-${index}`">{{ item.num }}</div>
    </div>
    <div class="more" v-show="!isShowDataStatus" @click="changeShowData()">
      <div class="more-title">更多数据</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue"
import anime from "animejs"

const props = defineProps(["currentDisplay", "isShowDataStatus"])
const emits = defineEmits(["update:currentDisplay", "update:isShowDataStatus"])

const changeShowData = () => {
  emits("update:isShowDataStatus", true)
  emits("update:currentDisplay", "data")
}

watch(
  () => [props.isShowDataStatus, props.currentDisplay],
  () => {
    animeFn()
  }
)

const data = ref([
  {
    title: "户籍人口(万人)",
    num: 9.78
  },
  {
    title: "户数(万户)",
    num: 8.35
  },
  {
    title: "小区(个)",
    num: 4.53
  },
  {
    title: "居委会(个)",
    num: 60
  },
  {
    title: "楼组数(个)",
    num: 20
  },
  {
    title: "辖区面积(²千米）",
    num: 1811
  },
  {
    title: "老年人总数(人)",
    num: 51172
  },
  {
    title: "老龄化率(%)",
    num: 49.74
  },
  {
    title: "特殊困难老人(人)",
    num: 350
  }
])

onMounted(() => {
  nextTick(() => {
    animeFn()
  })
})

const animeFn = () => {
  data.value.forEach((item, index) => {
    anime({
      targets: `.data-num-${index}`,
      innerHTML: [0, item.num],
      round: 100,
      easing: "linear"
    })
  })
}
</script>

<style lang="scss" scoped>
.data {
  display: flex;
  justify-content: center;
  align-items: end;
  pointer-events: auto;
  &-item {
    position: relative;
    width: 167px;
    height: 120px;
    margin-right: 28px;
    font-size: 18px;
    text-align: center;
    &-more {
      @extend .data-item;
      margin-right: 12px;
      font-size: 17px;
      width: 156px;
      height: 120px;
    }
  }
  &-bg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-title {
    color: white;
    margin-top: 23px;
  }
  &-num {
    font-size: 28px;
    color: white;
    margin-top: 14px;
  }
}
.more {
  cursor: pointer;
  width: 125px;
  height: 54px;
  background-image: url("@/assets/data-more.webp");
  background-position: center; /* 居中图像 */
  background-repeat: no-repeat; /* 不要重复图像 */
  background-size: cover; /* 调整背景图像的大小以覆盖整个容器 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  &-title {
    font-weight: bold;
    font-size: 20px;
    color: #3ffefc;
  }
}
</style>
