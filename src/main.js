import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "components/common/toast";

import FaskClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

// 安装自己封装的 toast 插件
Vue.use(toast);

// 解决移动端300ms延迟
FaskClick.attach(document.body);

// 使用懒加载插件加载图片
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/placeholder.png")
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
