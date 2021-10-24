<template>
    <div id="app">
        <!-- 路由入口文件 -->
        <van-cell
            title="单元格"
            value="内容"
            size="large"
        />
        <van-cell
            title="单元格"
            value="内容"
            size="large"
            label="描述信息"
        />
        <router-view />
    </div>
</template>
<script>
export default {
    name: "App",
    components: {},
};
</script>
<style lang="less">
</style>
