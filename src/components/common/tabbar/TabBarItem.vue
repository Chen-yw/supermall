<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 图片的路径不能写死，所以做一个插槽,在使用的时候，插槽内的内容会被替换 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{ active: !isActive }"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/home.png" /><div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive() {
      // console.log(this.$route.path.indexOf(this.path));
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      // console.log("itemClick");
      // console.log(this.path);
      this.$router.replace(this.path).catch(err => err);
    }
  }
};
</script>
<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle; /* 去掉图片下面自动添加的三个像素 */
}

.active {
  color: red;
}
</style>
