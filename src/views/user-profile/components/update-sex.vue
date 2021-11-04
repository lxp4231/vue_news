<template>
    <div class="update-sex">
        <van-picker
            show-toolbar
            :columns="columns"
            :default-index="value"
            @confirm="onConfirm"
            @change="onChange"
            @cancel="$emit('close')"
        />
    </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
export default {
    name: "updateSex",
    data() {
        return {
            columns: ["男", "女"],
            localGender: this.value,
        };
    },
    // 采用v-model的形式
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
    methods: {
        async onConfirm() {
            try {
                await updateUserProfile({
                    gender: this.localGender,
                });
                this.$toast.success("修改成功");
                // 更新状态
                this.$emit("input", this.localGender);
                // 关闭弹窗
                this.$emit("close");
            } catch (error) {
                this.$toast.fail("操作失败，请稍后再试");
            }
        },
        // 监视index变化
        onChange(picker, value, index) {
            this.localGender = index;
        },
    },
};
</script>

<style lang='less' scoped>
.update-name {
    /deep/ .van-nav-bar__content {
        .van-nav-bar__left {
            .van-nav-bar__text {
                color: #000;
            }
        }
    }
    .field-wrap {
        padding: 5px;
    }
}
</style>