import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

/* export default {
  addCart(context, payload) {
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }

    // 1.查找之前数据中是否有该商品
    let oldProduct = context.state.cartList.find(
      item => item.iid === payload.iid
    );

    // 2.判断oldProduct
    if (oldProduct) {
      // context.commit("addCounter", oldProduct);
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      // context.commit("addToCart", payload);
      context.commit(ADD_TO_CART, payload);
    }
  }
}; */

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      // 1.查找之前数据中是否有该商品
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      // 2.判断oldProduct
      if (oldProduct) {
        // context.commit("addCounter", oldProduct);
        context.commit(ADD_COUNTER, oldProduct);
        resolve("添加了新的商品");
      } else {
        payload.count = 1;
        // context.commit("addToCart", payload);
        context.commit(ADD_TO_CART, payload);
        resolve("添加了新的商品");
      }
    });
  }
};
