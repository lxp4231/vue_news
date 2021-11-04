<template>
    <div class="my-history">
        <!-- 导航栏 -->
        <van-nav-bar
            title="浏览历史"
            left-arrow
            @click-left="$router.back()"
            class="nav"
        />
        <!-- 内容 -->
        <div class="content">
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >作为 IT 行业的过来人，你有什么话想对后辈说的？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2021-3-01' |relativeTime}}</span>
                    </div>
                </div>
            </van-cell>
        </div>
        <div class="content">
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >作为 IT 行业的过来人，你有什么话想对后辈说的？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2021-3-01' |relativeTime}}</span>
                    </div>
                </div>
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: "History",
};
</script>

<style scoped lang='less'>
.my-history {
    margin-top: 92px;
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    img {
        width: 242px;
        height: 162px;
    }
    .lable-info-wrap span {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px !important;
    }
    .right-cover {
        width: 232px;
        height: 146px;
    }
}
</style>