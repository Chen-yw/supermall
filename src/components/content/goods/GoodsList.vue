<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :goodsItem="item"
      :key="index"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>
<style>
.goods {
  display: flex;
  flex-wrap: wrap; /* 根据图片大小决定一行填充几个 */
  /* justify-content: space-around;
  padding: 2px; */
  justify-content: space-evenly;
}
</style>
