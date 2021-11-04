import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局样式
import "./style/index.less";
// 动态设置rem基准值
import "amfe-flexible";
Vue.config.productionTip = false;
// 引入vant样式
import "vant/lib/index.css";
import Vant from "vant";
// 时间处理
import "@/utils/dayjs";
Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
