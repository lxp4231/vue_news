module.exports = {
  plugins: {
    "postcss-pxtorem": {
      // 如果是vant的样式，使用37.5
      // 自己的样式使用75(自己的设计稿为750)，使用rootValue(){}进行配置，会接收配置项参数，根据file进行配置
      // rootValue: 37.5,
      rootValue({ file }) {
        return file.includes("vant") ? 37.5 : 75;
      },
      // 配置要转换的css *所有
      propList: ["*"],
      // 排除不转换的样式资源
      exclude: "github-markdown"
    }
  }
};
