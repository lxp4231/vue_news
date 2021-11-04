<template>
    <div class="comment-post">
        <van-field
            class="post-field"
            v-model.trim="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入留言"
            show-word-limit
        />
        <van-button
            class="post-btn"
            @click="publishComment"
            :disabled="!message.length"
        >发布</van-button>
    </div>
</template>

<script>
import { addComment } from "@/api/comment.js";
export default {
    name: "CommentPost",
    components: {},
    props: {
        articleId: {
            type: [Number, String, Object],
            required: true,
        },
    },
    data() {
        return {
            message: "",
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        async publishComment() {
            try {
                const { data } = await addComment({
                    target: this.articleId,
                    content: this.message,
                    art_id: null,
                });
                this.$emit("post-success", data.data);
                this.message = "";
                this.$toast.success("发布成功");
            } catch (error) {
                this.$toast("操作失败，请稍后再试");
            }
        },
    },
};
</script>

<style scoped lang="less">
.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;
    .post-field {
        background-color: #f5f7f9;
    }
    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #000;
        &::before {
            display: none;
        }
    }
}
</style>