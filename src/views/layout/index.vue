<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view></router-view>
        <!-- 底部导航栏 -->
        <van-tabbar
            route
            active-color="#404040"
            inactive-color="#d0d1d3"
        >
            <van-tabbar-item to="/home">
                <i
                    slot="icon"
                    class="iconfont icon-wenda"
                ></i>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i
                    slot="icon"
                    class="iconfont icon-shouye"
                ></i>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i
                    slot="icon"
                    class="iconfont icon-shipin"
                ></i>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i
                    slot="icon"
                    class="iconfont icon-wode"
                ></i>
                <span class="text">{{user?'我的':'未登陆'}}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "layout",
    computed: {
        ...mapState(["user"]),
    },
};
</script>

<style lang="less" scoped>
.layout-container {
    .layout-tabbar {
        i.iconfont {
            font-size: 40px;
        }
        span.text {
            font-size: 20px;
        }
    }
}
</style>