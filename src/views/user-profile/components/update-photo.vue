<template>
    <div class="update-photo">
        <img
            :src="img"
            class="img"
            ref="img"
        >
        <div class="toolbar">
            <div
                class="cancel"
                @click="$emit('close')"
            >取消</div>
            <div
                class="confirm"
                @click="onConfirm"
            >完成</div>
        </div>
    </div>

</template>

<script>
import { updateUserPhoto } from "@/api/user.js";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
    name: "UpdatePhoto",
    data() {
        return {
            cropper: null,
        };
    },
    props: {
        img: {
            type: [String, Object],
            required: true,
        },
    },
    mounted() {
        const image = this.$refs.img;
        // 配置
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: "move",
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true,
        });
    },
    methods: {
        // 获取blob，并发送请求
        onConfirm() {
            this.cropper.getCroppedCanvas().toBlob(async (blob) => {
                this.$toast.loading({
                    message: "保存中...",
                    forbidClick: true,
                    duration: 0,
                });
                try {
                    const formData = new FormData();
                    formData.append("photo", blob);
                    const { data } = await updateUserPhoto(formData); //传入formData对象
                    this.$toast.success("修改成功");
                    //更新视图
                    this.$emit("update-photo", data.data.photo);
                    this.$emit("close");
                } catch (error) {
                    this.$toast.fail("操作失败，请稍后再试");
                }
            });
        },
    },
};
</script>

<style lang='less' scoped>
.img {
    display: block;
    max-width: 100%;
}
.update-photo {
    background-color: #404040;
    height: 100%;
    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel,
        .confirm {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
}
</style>