<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="all-checked-btn"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span class="all-checked-title">全选</span>
    </div>
    <div class="total-price">总计： {{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 1.使用filter
      // return !this.cartList.filter(item => !item.checked).length;

      // 2.使用find
      return !this.cartList.find(item => !item.checked);

      // 3.使用普通遍历
      /* for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return ture; */
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
      // this.cartList.forEach(item => (item.checked = !this.isSelectAll));
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 1000);
      }
    }
  }
};
</script>
<style scoped>
.cart-bottom-bar {
  height: 40px;
  display: flex;
  background-color: #eee;
}

.check-content {
  width: 70px;
  display: flex;
  font-size: 14px;
  align-items: center;
  line-height: 40px;
}

.all-checked-btn {
  width: 21px;
  height: 21px;
  line-height: 20px;
  margin-right: 10px;
  margin-left: 4px;
}

.all-checked-title {
  text-align: center;
  /* line-height: normal; */
}

.total-price {
  flex: 1;
  font-size: 14px;
  margin: auto 20px;
}

.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding-top: 12px;
  background-color: orangered;
}
</style>
