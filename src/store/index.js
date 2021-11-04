import Vue from "vue";
import Vuex from "vuex";
import { setItem, getItem } from "@/utils/storage";
Vue.use(Vuex);
//定义常量防止出错
const TOKEN_KEY = "TOKEN_USER";
export default new Vuex.Store({
  state: {
    // 存储用户登录信息到本地(token)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  // 存储到store
  mutations: {
    // 存储用户登录信息到store
    saveUserToken(state, data) {
      state.user = data; //???
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
      setItem(TOKEN_KEY, JSON.stringify(data));
    }
  },
  // 异步逻辑都应该封装到 action 里面
  actions: {},
  modules: {}
});
