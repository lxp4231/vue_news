<template>
    <van-icon
        :color="value?'#e59400':''"
        :name="value?'star':'star-o'"
        @click="onCollect"
        :loading=loading
    />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article.js";
export default {
    name: "collectArticle",
    data() {
        return {
            loading: false,
        };
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        articleId: {
            type: [Number, String, Object],
            required: true,
        },
    },
    methods: {
        async onCollect() {
            this.loading = true;
            // 取消收藏
            try {
                if (this.value) {
                    await deleteCollect(this.articleId);
                } else {
                    await addCollect(this.articleId);
                }
                // 更新视图
                this.$emit("input", !this.value);
                this.$toast.success(!this.value ? "已收藏" : "取消收藏");
            } catch (error) {
                this.$toast.fail("收藏失败，请稍后重试");
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