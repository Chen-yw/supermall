<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav-bar">
      <!-- <div slot="center">购物车({{ cartLength }})</div> -->
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list class="cart-list" />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   // return this.$store.state.cartList.length;
    //   return this.$store.getters.cartLength;
    // }
    // ...mapGetters(["cartLength", "cartList"]), //将Vuex中grtters中的计算属性，直接转为组件里面的计算属性
    ...mapGetters({
      length: "cartLength",
      list: "cartList"
    })
  }
};
</script>
<style>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
