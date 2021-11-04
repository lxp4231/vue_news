import Vue from "vue";
import dayjs from "dayjs";
// 配置为中文
import "dayjs/locale/zh-cn";
// 全局生效
dayjs.locale("zh-cn");
// 格式化时间
// console.log(dayjs("2020-04-02T08:02:17-05:00").format("YYYY-MM-DD"));
// 相对时间
import relativeTime from "dayjs/plugin/relativeTime";
// 配置使用
dayjs.extend(relativeTime);
// 距离时间，定义一个全局使用的过滤器
Vue.filter("relativeTime", value => {
  return dayjs().to(dayjs(value));
});
