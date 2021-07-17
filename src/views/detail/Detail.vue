<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="navBarTitleClick"
      ref="detailNav"
    />
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-image-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
        class="detail-image-info"
      />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list
        ref="recommend"
        class="detail-goods-list"
        :goods="recommends"
      />
    </Scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top
      class="detailBacktop"
      @click.native="backTopClick"
      v-show="isShowBackTop"
    ></back-top>

    <!-- <toast :message="message" :isShow="isShow" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailImageInfo from "./childComps/DetailImageInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backTop/BackTop";
// import Toast from "components/common/toast/Toast.vue";

import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";

import { mapActions } from "vuex";
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // isShowBackTop: false
      // message: "",
      // isShow: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
    // BackTop
    // Toast
  },
  created() {
    // console.log(this.$route.params);
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求商品详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据
      const data = res.result;
      // console.log(data);

      // 2.取出顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;

      // 3.取出商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.创建获取店铺信息对象取出商品店铺信息
      this.shop = new Shop(data.shopInfo);

      // 5.取出商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.取出商品参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.取出商品评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => {
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      if (this.$refs.param && this.$refs.comment && this.$refs.recommend) {
        this.$nextTick(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 47);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 47);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 47);
          this.themeTopYs.push(Number.MAX_VALUE);
          // console.log(this.themeTopYs);
        });
      }
    }, 100);
  },
  mounted() {
    /* // 1.调用防抖函数
    const newRefresh = debounce(this.$refs.scroll.refresh, 50);
    // 2.对监听的时间进行保存
    this.itemImgListener = () => {
      newRefresh();
    };
    // 3.监听GoodsListItem.vue中事件总线发射出来的事件
    this.$bus.$on("itemImgLoag", this.itemImgListener); */
  },
  updated() {},
  destroyed() {
    // console.log("deactivated");
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    // 4.监听详情图片加载完成
    detailImageLoad() {
      // console.log("+++");
      // this.$refs.scroll.refresh();
      // 因为mixin中有相关定义，所以此处可以直接使用做过防抖的函数this.newRefresh();
      this.newRefresh();

      this.getThemeTopY();
    },
    navBarTitleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY 和主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        /* if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
        } */
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }

      // 3.判断BackTop是否显示
      this.listenShowBackTop(position);
    },
    // backTopClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // }
    addToCart() {
      // console.log("------");
      // 1.获取购物车需要展示的商信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.checked = true;

      // 2.将商品信息添加到购物车里
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // });

      /* 将Vuex中actions中的方法映射到相应的组件的methods中 
        1.从Vuex中导入 import { debounce } from "common/utils";
        2.在组件methods中映射 
          ...mapActions(['addCart'])
          ...mapActions({
            addToCart: 'addCart'
          })
        3.直接使用 this.addCart(product)
      */
      this.addCart(product).then(res => {
        // this.isShow = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = "";
        // }, 800);
        this.$toast.show(res, 1000);
      });
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  overflow: hidden;
  height: calc(100% - 102px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-image-info {
  position: relative;
  z-index: 9;
}

.detail-goods-list {
  background-color: #fff;
  /* position: relative;
  z-index: 9; */
}

.detailBacktop {
  margin: 0 auto 8px;
}
</style>
