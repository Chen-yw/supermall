// 用于更改项目webpack配置
module.exports = {
  configureWebpack: {
    resolve: {
      // 省略文件后缀
      extensions: [],
      // 配置别名
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
};
