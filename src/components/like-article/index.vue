<template>
    <van-icon
        :color="value===1?'#c75f59':''"
        :name="value===1?'good-job':'good-job-o'"
        @click="onLike"
        :loading=loading
    />
</template>

<script>
import { addLike, deleteLike } from "@/api/article.js";
export default {
    name: "likeArticle",
    data() {
        return {
            loading: false,
        };
    },
    props: {
        value: {
            type: Number,
            required: true,
        },
        articleId: {
            type: [Number, String, Object],
            required: true,
        },
    },
    methods: {
        async onLike() {
            this.loading = true;
            // 取消点赞
            try {
                let status = -1; //单独
                if (this.value === 1) {
                    await deleteLike(this.articleId);
                } else {
                    await addLike(this.articleId);
                    status = 1;
                }
                // 更新视图
                this.$emit("input", status);
                this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
            } catch (error) {
                this.$toast.fail("操作失败，请稍后重试");
            }
            this.loading = false;
        },
    },
};
</script>

<style lang='less' scoped>
.van-icon {
    font-size: 40px !important;
}
</style>