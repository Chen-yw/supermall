<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import { getDetail } from "network/detail.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    };
  },
  components: {
    DetailNavBar
  },
  created() {
    // console.log(this.$route.params);
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;
    });
  }
};
</script>
<style scoped></style>
