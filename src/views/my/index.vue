<template>
    <div class="my-container">
        <!--基本信息 -->
        <div
            class="header user-info"
            v-if="user"
        >
            <div class="base-info">
                <div class="left">
                    <van-image
                        round
                        fit='cover'
                        class="avator"
                        :src='userInfo.photo'
                    />
                    <span class="name">xiaoliu</span>
                </div>
                <div class="right">
                    <van-button
                        size='mini'
                        round
                        to="/user/profile"
                    >个人信息
                        <van-icon name="arrow" />
                    </van-button>
                </div>
            </div>
            <div class="data-stats">
                <div class="data-item">
                    <span class="count">{{userInfo.art_count}}</span>
                    <span class="text">动态</span>
                </div>
                <div class="data-item">
                    <span class="count">{{userInfo.follow_count}}</span>
                    <span class="text">关注</span>
                </div>
                <div class="data-item">
                    <span class="count">{{userInfo.fans_count}}</span>
                    <span class="text">粉丝</span>
                </div>
                <div class="data-item">
                    <span class="count">{{userInfo.like_count}}</span>
                    <span class="text">获赞</span>
                </div>
            </div>
        </div>
        <!-- 未登录 -->
        <div
            class="header not-login"
            @click="$router.push('/login')"
            v-else
        >
            <img
                src="~@/assets/mobile.png"
                alt=""
            >
            <span class="text">登录/注册</span>
        </div>

        <!--宫格导航  -->

        <van-grid
            :column-num="2"
            class="grid-nav"
            clickable
        >
            <van-grid-item
                class="grid-nav-item"
                @click="$router.push('/my/collect')"
            >
                <i
                    slot="icon"
                    class="iconfont icon-shoucang"
                ></i>
                <span slot="text">收藏</span>
            </van-grid-item>
            <van-grid-item
                class="grid-nav-item"
                @click="$router.push('/my/history')"
            >
                <i
                    slot="icon"
                    class="iconfont icon-lishi"
                ></i>
                <span slot="text">历史</span>
            </van-grid-item>
        </van-grid>

        <!-- cell -->
        <van-cell
            title="消息通知"
            is-link
            @click="$router.push('/my/message')"
        />
        <van-cell
            class="mb-9"
            title="智能助手"
            is-link
            @click="$router.push('/my/helper')"
        />
        <van-cell
            title="设置"
            is-link
        />
        <van-cell
            title="关于"
            is-link
        />

    </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user.js";
export default {
    name: "my",
    data() {
        return {
            userInfo: {},
        };
    },
    created() {
        if (this.user) {
            this.loginUserInfo();
        }
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        // 获取用户信息
        async loginUserInfo() {
            try {
                const { data } = await getUserInfo();
                this.userInfo = data.data;
            } catch (error) {
                this.$toast("获取数据失败，请稍后重试");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.not-login {
    height: 360px;
    background-color: #404040;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-bottom: 10px;
        width: 132px;
        height: 132px;
    }
    .text {
        font-size: 28px;
        color: #fff;
    }
}
.user-info {
    // background: linear-gradient(318deg, #b2b5db, #565482 70%, #494675);
    background-color: #fff;
    .base-info {
        height: 231px;
        padding: 76px 32px 23px;
        //固定大小
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .avator {
                margin-right: 23px;
                width: 132px;
                height: 132px;
            }
            .name {
                font-size: 30px;
            }
        }
    }
    .data-stats {
        display: flex;
        .data-item {
            // 父子都开启flex
            display: flex;
            height: 130px;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count {
                font-size: 36px;
            }
            .text {
                font-size: 23px;
            }
        }
    }
}
.grid-nav {
    margin: 10px 0;
    .grid-nav-item {
        height: 141px;
        .icon-shoucang {
            color: #f86152;
            font-size: 45px;
        }
        .icon-lishi {
            font-size: 45px;
            color: #ffa016;
        }
        span {
            font-size: 28px;
        }
    }
}
</style>