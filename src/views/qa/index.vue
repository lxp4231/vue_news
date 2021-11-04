<template>
    <div qa-container>
        <!-- 导航栏 -->
        <van-nav-bar
            title="问答"
            left-arrow
            @click-left="$router.back()"
        />
        <!-- 内容 -->
        <van-cell-group>
            <van-cell
                title="单元格"
                value="内容"
            />
            <van-cell
                title="单元格"
                value="内容"
                label="描述信息"
            />
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: "qa",
};
</script>

<style>
</style>