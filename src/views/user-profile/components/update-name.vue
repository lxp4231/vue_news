<template>
    <div class="update-name">
        <van-nav-bar
            left-text='取消'
            right-text="确定"
            @click-left="$emit('close')"
            @click-right="loadUpdateUserProfile"
        />
        <div class="field-wrap">
            <van-field
                v-model.trim="localName"
                rows="2"
                autosize
                type="textarea"
                maxlength="7"
                placeholder="请输入新昵称"
                show-word-limit
            />
        </div>

    </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
export default {
    name: "updateName",
    data() {
        return {
            localName: null,
        };
    },
    // 采用v-model的形式
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    methods: {
        async loadUpdateUserProfile() {
            // 防止网速过慢，造成重复点击
            this.$toast.loading({
                message: "保存中...",
                forbidClick: true,
                duration: 0,
            });
            try {
                if (!this.localName) {
                    this.$toast.fail("内容为空");
                    return;
                }
                await updateUserProfile({
                    name: this.localName,
                });
                this.$toast.success("修改成功");
                // 更新状态
                this.$emit("input", this.localName);
                // 关闭弹窗
                this.$emit("close");
            } catch (error) {
                this.$toast.fail("操作失败，请稍后再试");
            }
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