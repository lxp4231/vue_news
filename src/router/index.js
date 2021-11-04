import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login")
    },
    {
      path: "/",
      name: "layout", //如果有默认子路由，则name没有意义
      redirect: "/home",
      component: () => import("@/views/layout"),
      children: [
        {
          path: "home", //默认子路由
          component: () => import("@/views/home")
        },
        {
          path: "qa",
          component: () => import("@/views/qa")
        },
        {
          path: "video",
          component: () => import("@/views/video")
        },
        {
          path: "my",
          component: () => import("@/views/my")
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/search")
    },
    {
      // 设定动态参数
      path: "/article/:articleId",
      name: "article",
      component: () => import("@/views/articles"),
      props: true //开启props传参
    },
    {
      name: "user-profile",
      path: "/user/profile",
      component: () => import("@/views/user-profile")
    },
    {
      name: "my-collect",
      path: "/my/collect",
      component: () => import("@/views/my/components/my-collect.vue")
    },
    {
      name: "my-history",
      path: "/my/history",
      component: () => import("@/views/my/components/my-history.vue")
    },
    {
      name: "my-message",
      path: "/my/message",
      component: () => import("@/views/my/components/my-message.vue")
    },
    {
      name: "my-helper",
      path: "/my/helper",
      component: () => import("@/views/my/components/my-helper.vue")
    }
  ]
});
