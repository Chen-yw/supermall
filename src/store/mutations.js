import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一

  /* addCounter(state, payload) {
    payload.count++;
  }, */
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  /* addToCart(state, payload) {
    state.cartList.push(payload);
  } */
  [ADD_TO_CART](state, payload) {
    // payload.checked = true;
    state.cartList.push(payload);
  }
};
