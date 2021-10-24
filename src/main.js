import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入vant组价
import "./plugins/vant";
// 引入全局样式
import "./style/index.less";
Vue.config.productionTip = false;
// 引入vant样式
import "vant/lib/index.css";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
