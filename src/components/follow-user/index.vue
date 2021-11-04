<template>
    <!-- 关注的组件 -->
    <van-button
        v-if="value"
        class="follow-btn"
        round
        size="small"
        :loading="loading "
        @click="onFollow"
    >已关注</van-button>
    <van-button
        v-else
        class="follow-btn"
        type="info"
        color="#404040"
        round
        size="small"
        icon="plus"
        @click="onFollow"
        :loading="loading "
    >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
    name: "followUser",
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
        aut_id: {
            type: [String, Number, Object],
            required: true,
        },
    },
    methods: {
        // 关注/取消关注
        async onFollow() {
            // 开启按钮的 loading 状态
            this.loading = true;
            try {
                // 如果已关注，则取消关注
                if (this.value) {
                    await deleteFollow(this.aut_id);
                } else {
                    // 否则添加关注
                    await addFollow(this.aut_id);
                }
                // 更新视图(让父组件更改，子组件不直接修改props中的数据)!!!!!!
                // this.value = !this.value;
                this.$emit("input", !value);
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    this.$toast.fail("不能关注自己");
                } else {
                    this.$toast.fail("操作失败");
                }
            }
            // 关闭按钮的 loading 状态
            this.loading = false;
        },
    },
};
</script>

<style>
</style>