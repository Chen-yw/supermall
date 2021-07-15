import { debounce } from "common/utils";
export const itemListenerMixin = {
  // 混入data
  data() {
    return {
      // itemImgListener: null
      newRefresh: null
    };
  },
  mounted() {
    // 1.调用防抖函数
    // const newRefresh = debounce(this.$refs.scroll.refresh, 50);
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50);
    // 2.对监听的时间进行保存
    this.itemImgListener = () => {
      this.newRefresh();
    };
    // 3.监听GoodsListItem.vue中事件总线发射出来的事件
    this.$bus.$on("itemImgLoag", this.itemImgListener);

    // console.log("混入成功！");
  }
};
