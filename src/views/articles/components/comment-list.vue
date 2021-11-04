<template>
    <div class="article-comments">
        <!-- 评论列表 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error="error"
            error-text="加载失败，请点击重试"
        >
            <commentItem :list="list" />
        </van-list>
        <!-- 评论列表 -->
        <!-- 发布评论 -->
        <van-cell-group class="publish-wrap">
            <van-field
                clearable
                placeholder="请输入评论内容"
            >
                <van-button
                    slot="button"
                    size="mini"
                    type="info"
                >发布</van-button>
            </van-field>
        </van-cell-group>
        <!-- /发布评论 -->
    </div>
</template>

<script>
import { getAllComments } from "@/api/comment.js";
import commentItem from "@/views/articles/components/comment-item.vue";
export default {
    components: { commentItem },
    name: "ArticleComment",
    props: {
        source: {
            type: [Number, String, Object],
            required: true,
        },
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            // list: [], // 评论列表
            loading: false, // 上拉加载更多的 loading
            finished: false, // 是否加载结束
            offset: null, //获取下一个评论的参数
            limit: 10, //每次条数
            error: false,
        };
    },
    created() {
        this.onLoad();
    },
    methods: {
        // 1请求获取数据
        async onLoad() {
            try {
                const { data } = await getAllComments({
                    type: "a",
                    source: this.source,
                    offset: this.offset,
                    limit: this.limit,
                });
                //2数据更新到列表中
                const { results } = data.data;
                this.$emit("total_count", data.data.total_count);
                this.list.push(...results);
                // 3将loading设为false
                this.loading = false;
                // 4判断是否还有数据
                if (results.length) {
                    this.offset = data.data.last_id;
                } else {
                    this.finished = true;
                }
            } catch (error) {
                this.error = true;
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped lang="less">
.publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

.van-list {
    margin-bottom: 45px;
}
</style>