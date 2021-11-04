<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <!-- <span>全部删除</span>
            <span>完成</span> -->
            <van-icon
                name="delete"
                @click="deleteAllHistory"
            />
        </van-cell>
        <van-cell title="hello">
            <van-icon name="close" />
        </van-cell>
        <van-cell title="hello">
            <van-icon name="close" />
        </van-cell>
        <van-cell title="hello">
            <van-icon name="close" />
        </van-cell>
        <van-cell title="hello">
            <van-icon name="close" />
        </van-cell>
    </div>
</template>

<script>
import { deleteHistory } from "@/api/search";
export default {
    name: "SearchHistory",
    data() {
        return {};
    },
    methods: {
        async deleteAllHistory() {
            try {
                await deleteHistory();
            } catch (error) {
                this.$toast("删除失败,请稍后再试");
            }
        },
    },
};
</script>

<style lang="less" scoped>
</style>