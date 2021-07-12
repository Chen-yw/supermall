<template>
  <!-- ref/children 两个属性可以让父组件获取子组件的数据、属性等
      ref属性一般绑定的都是子组件
      children 是拿到父组件的所有子组件，是个数组
      ref 可以让父组件明确的拿到子组件
 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  mounted() {
    // document.querySelector(".wrapper"); //因为项目中可能还存在其他的wrapper类，所以用此方法那wrapper并不准确
    // 1.创建BSscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true
    });

    // 2.监听滚动的位置
    this.scroll.on("scroll", position => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    // 3.监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        console.log("监听到滚动到底部");
        this.$emit("pullingUp");
      });
    }

    // this.scroll.refresh();
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // this.scroll.scrollTo(x, y, time);
      // 判断scroll是否初始化，
      // this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 多次上拉加载更多
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>
<style scoped>
.wrapper {
  margin: 0;
  padding: 0;
}

.content {
  margin: 0;
  padding: 0;
}
</style>
