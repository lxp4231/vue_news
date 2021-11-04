<template>
    <div class="search-results">
        <van-list
            v-model="loading"
            :finished="finished"
            :error.sync='error'
            error-text="加载失败，请点击重试"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell
                v-for="article,index in list"
                :key="index"
                :title="article.title"
            />
        </van-list>
    </div>
</template>

<script>
import { getSearchReaults } from "@/api/search";
export default {
    name: "SearchResults",
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            error: false,
        };
    },
    props: {
        searchText: {
            type: String,
            requored: true,
        },
    },
    methods: {
        async onLoad() {
            try {
                const { data } = await getSearchReaults({
                    page: this.page,
                    per_page: 10,
                    q: this.searchText,
                });
                const { results } = data.data;
                // 本次结果赋值给list
                this.list.push(...results);
                //本次加载结束，接着会触发下一次
                this.loading = false;
                if (results.length) {
                    this.page++;
                } else {
                    this.finished = true;
                }
            } catch (error) {
                //展示加载失败的结束状态
                this.error = true;
                //加载失败loading 也要关闭
            }
        },
    },
};
</script>

<style lang="less" scoped>
</style>