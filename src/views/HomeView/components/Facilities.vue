<template>
  <div class="facilities">
    <div v-for="item in facilitiesList" :key="item.title" class="facilities-item" @click="facilityClick(item)">
      <img :src="item.bgUrl" class="facilities-img" />
      <div class="facilities-title">{{ item.title }}</div>
    </div>
  </div>
  <HtmlModal v-model:value="state.isShowModal" :htmlStr="state.content" :left="656" />
</template>

<script setup>
import { ref, reactive } from "vue"
import HtmlModal from "@/components/HtmlModal.vue"

const props = defineProps({
  map: Object
})

const state = reactive({
  content: "你好啊，欢迎来到xxxx医院",
  isShowModal: false,
  list: [
    {
      title: "数据1",
      value: "100",
      point: {
        ln: 121.43446,
        lg: 31.276319
      }
    },
    {
      point: {
        ln: 121.430364,
        lg: 31.259617
      }
    }
  ]
})

const facilityClick = (facilityClick) => {
  console.log("点击了设施", props.map)

  state.list.forEach((element) => {
    const point = new BMapGL.Point(element.point.ln, element.point.lg)

    const imgUrl = new URL("@/assets/point.png", import.meta.url).href //引用图标
    const myIcon = new BMapGL.Icon(imgUrl, new BMapGL.Size(120, 120))
    // 创建标注对象并添加到地图
    const marker = new BMapGL.Marker(point, { icon: myIcon })
    marker.addEventListener("click", function () {
      state.isShowModal = true
      state.content = "<img style='width: 100%; height: 1.4rem; margin-bottom: 30px' src='/photo@2x (1).webp' /><div style='font-size: 16px; line-height: 26px; color: #fff;'>室内空间适老化改造是指对老年人居住的室内空间进行改造和优化，以提高老年人的生活质量和安全性。适老化改造的目的是为了满足老年人的特殊需求和生活习惯，让他们能够更加舒适、安全地生活在自己的家中。适老化改造的内容包括但不限于以下几个方面：无障碍改造：对室内空间进行无障碍改造，包括安装扶手、斜坡、轮椅通道等以方便老年人的行动。卫生间改造：对卫生间进行改造，安装扶手、坐便器、洗浴设施等，以方便老年人的洗漱和洗浴。厨房改造：对厨房进行改造，安装扶手、低柜台、易于操作的厨具等，以方便老年人的烹饪和饮食。安全改造：对室内空间进行安全改造，安装防滑地面、烟雾报警器、紧急呼叫按钮等以保障老年人的安全。</div>"
    })
    props.map.addOverlay(marker)
  })
}

const facilitiesList = ref([
  {
    bgUrl: new URL("@/assets/facilities-lunyi.webp", import.meta.url),
    title: "轮椅"
  },
  {
    bgUrl: new URL("@/assets/facilities-jsqc.webp", import.meta.url),
    title: "健身器材"
  },
  {
    bgUrl: new URL("@/assets/facilities-zzcs.webp", import.meta.url),
    title: "自助餐食"
  },
  {
    bgUrl: new URL("@/assets/facilities-ylss.webp", import.meta.url),
    title: "娱乐设施"
  }
])
</script>

<style lang="scss" scoped>
.facilities {
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  pointer-events: auto;
  &-item {
    cursor: pointer;
    width: 134px;
    height: 134px;
    position: relative;
    margin-left: 22px;
  }
  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 134px;
    height: 134px;
  }
  &-title {
    text-align: center;
    margin-top: 80px;
    font-size: 14px;
    color: white;
  }
}
</style>
