<template>
    <div class="update-sex">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            @cancel="$emit('close')"
            @confirm="onConfirm"
            :min-date="minDate"
            :max-date="maxDate"
        />
    </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
import dayjs from "dayjs";
export default {
    name: "updateBirthday",
    data() {
        return {
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value), //默认选中日期
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
        async onConfirm() {
            const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD"); //转化格式为2020-11-10
            try {
                await updateUserProfile({
                    birthday: currentDate,
                });
                this.$toast.success("修改成功");
                // 更新状态
                this.$emit("input", currentDate);
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