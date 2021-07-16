<template>
  <div class="cart-list">
    <Scroll class="content">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </Scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>
<style scoped>
.cart-list {
}
</style>
