<template>
    <!-- 下拉刷新 -->
    <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :success-text="isreFreshLoading"
    >
        <!-- 每个列表 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            class="article-list"
        >
            <ArticleItem
                v-for="(article,index) in list"
                :key="index"
                :article="article"
            />
            <!-- <van-cell
                v-for="(item,index) in list"
                :key="index"
                :title="item.title"
            /> -->
        </van-list>
    </van-pull-refresh>

</template>

<script>
import ArticleItem from "@/components/article-item";
import { getArticles } from "@/api/article";
export default {
    name: "ArticleList",
    data() {
        return {
            list: [], //存储列表数据
            loading: false, //控制loading状态
            finished: false, //加载结束的状态
            timestamp: null, //请求获取下一页的时间戳
            error: false,
            isLoading: false, //下拉刷新
            isreFreshLoading: "",
        };
    },
    components: {
        ArticleItem,
    },
    // 限定接收类型
    props: {
        channel: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async onLoad() {
            try {
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: this.timestamp || Date.now(), //时间戳
                    with_top: 1,
                });
                const { results } = data.data;
                // 一个个合并
                this.list.push(...results);
                //本次数据更新完毕后,显示loading
                this.loading = false;
                if (results.length) {
                    this.timestamp = data.data.pre_timestamp;
                } else {
                    // 加载完毕
                    this.finished = true;
                }
            } catch (error) {
                this.error = true;
                this.loading = false;
                console.log(new Error(error));
            }
        },
        // 下拉刷新
        async onRefresh() {
            // 刷新成功,发送请求
            try {
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: Date.now(), //最新时间戳
                    with_top: 1,
                });
                this.list.unshift(...data.data.results);
                this.isreFreshLoading = "刷新成功";
                this.isLoading = false;
                // 模拟一个失败的结果
                // if (Math.random() * 100 > 40) {
                //     JSON.parse("sdffddqwdfc");
                // }
            } catch (error) {
                this.isreFreshLoading = "刷新失败，请稍后再试";
            }
        },
    },
};
</script>

<style lang="less" scoped>
.article-list {
    height: 79vh; //相对视口
    overflow-y: auto; //垂直方向溢出
}
</style>