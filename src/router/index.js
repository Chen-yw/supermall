import Vue from "vue";
import Router from "vue-router";

// 懒加载导入组件
const Home = () => import("@/views/home/Home.vue");
const Category = () => import("@/views/category/Category.vue");
const Shopcart = () => import("@/views/cart/Shopcart.vue");
const Profile = () => import("@/views/profile/Profile.vue");

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Shopcart
  },
  {
    path: "/profile",
    component: Profile
  }
];

const router = new Router({
  routes,
  mode: "history"
});

export default router;
