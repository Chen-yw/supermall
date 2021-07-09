<template>
  <swiper>
    <!-- <swiper-item v-for="item in banners" > -->
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 轮播图
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      dafault() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // 通过变量只发射一次事件，也可以在home组件中监听的时候用 .once修饰符
      if (!this.isLoad) {
        // console.log("轮播图加载完");
        this.$emit("swiperimageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>
<style></style>
