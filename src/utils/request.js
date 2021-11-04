// 封装axios 模块,用来配置axios
import axios from "axios";
import store from "@/store";
// 创建axios实例
const request = axios.create({
  baseURL: "http://toutiao.itheima.net"
});
// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state;
    if (user && user.token) {
      // 格式 从store中获取token
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
export default request;
