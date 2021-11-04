<template>
    <div class="my-helper">
        <!-- 导航栏 -->
        <van-nav-bar
            title="智能助手"
            left-arrow
            @click-left="$router.back()"
            class="nav"
        />
        <!--  -->

    </div>
</template>

<script>
export default {
    name: "Message",
};
</script>

<style scoped lang='less'>
.my-message {
    margin-top: 92px;
}
</style>