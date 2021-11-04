<template>
    <div class="home-container">
        <!-- 导航:navbar -->
        <van-search
            disabled
            placeholder="请输入搜索关键词"
            @click="search"
        />
        <!-- 频道列表 -->
        <van-tabs
            v-model="active"
            animated
            swipeable
            class="channel-tabs"
            color='#777'
            line-width=25
            title-active-color='#000'
            title-inactive-color="#a8aeb6"
        >
            <van-tab
                v-for="items in channelList"
                :key="items.id"
                :title="items.name"
            >
                <!-- 组件的形式插进来 -->
                <ArticleList :channel=items />
            </van-tab>
            <!--placeholder 用来站位 -->
            <div
                slot="nav-right"
                class="placeholder"
            ></div>
            <!-- 按钮 -->
            <div
                slot="nav-right"
                class="hamburger-btn"
                @click="isChennelEditShow=true"
            >
                <i class="iconfont icon-gengduo"></i>
            </div>
        </van-tabs>
        <!-- 弹出框 -->
        <van-popup
            v-model="isChennelEditShow"
            closeable
            position="bottom"
            :style="{ height: '100%' }"
        >
            <!-- 频道项 -->
            <ChannelEdit
                :myChannels="channelList"
                :active=active
                @update-active="onUpdateActive"
            />
        </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from "@/api/user.js";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage.js";
export default {
    name: "home",
    data() {
        return {
            active: 0,
            channelList: [],
            isChennelEditShow: false,
        };
    },
    components: {
        ArticleList,
        ChannelEdit,
    },
    created() {
        // 加载频道列表
        this.loadChannel();
    },
    computed: {
        // 拿到store中的state
        ...mapState(["user"]),
    },
    methods: {
        //搜索模块
        search() {
            this.$router.push("/search");
        },
        async loadChannel() {
            // 获取用户列表
            // 已登录
            if (this.user) {
                try {
                    const { data } = await getUserChannels();
                    this.channelList = data.data.channels;
                } catch (error) {
                    console.log(new Error(error));
                }
            } else {
                // 未登录:
                // 判断是否有本地推荐列表：有就用本地，没有就使用默认推荐列表
                const localChannels = getItem("TOUTIAO_CHANNELS");
                if (localChannels) {
                    this.channelList = localChannels;
                } else {
                    //默认的频道列表
                    const { data } = await getUserChannels();
                    this.channelList = data.data.channels;
                }
            }
        },
        onUpdateActive(index, isChennelEditShow = true) {
            this.active = index;
            // 关闭弹出层
            this.isChennelEditShow = isChennelEditShow;
        },
    },
};
</script>

<style lang="less" scoped>
.home-container {
    padding-bottom: 100px;
    .van-search {
        position: fixed;
        z-index: 1;
        width: 100%;
        display: block;
    }
    /deep/ .channel-tabs {
        .van-tabs__wrap {
            position: fixed;
            z-index: 1;
            top: 92px;
            left: 0;
            right: 0;
            height: 82px;
        }
        .van-pull-refresh {
            margin-top: 180px;
        }
        .placeholder {
            //flex-shrink平分剩余宽度，为0不参与平分
            flex-shrink: 0;
            width: 66px;
            height: 82px;
        }
        .hamburger-btn {
            position: fixed;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 82px;
            background-color: #fff;
            background-color: rgba(255, 255, 255, 0.902);
            .iconfont {
                font-size: 33px;
            }
            &:before {
                content: "";
                position: absolute;
                left: 0;
                width: 1px;
                height: 58px;
                background-image: url(~@/assets/gradient-gray-line.png);
                background-size: contain;
            }
        }
    }
}
</style>>
