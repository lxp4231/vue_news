<template>
    <div class="my-message">
        <!-- 导航栏 -->
        <van-nav-bar
            title="消息通知"
            left-arrow
            @click-left="$router.back()"
            class="nav"
        />
        <van-tabs>
            <van-tab title="全部"></van-tab>
            <van-tab title="系统通知"></van-tab>
            <van-tab title="评论"></van-tab>
            <van-tab title="粉丝"></van-tab>
            <van-tab title="点赞"></van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    name: "Message",
};
</script>

<style scoped lang='less'>
</style>