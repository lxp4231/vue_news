<template>
    <div class="qa-container">
        <!-- 导航栏 -->
        <van-nav-bar
            title="问答"
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
                        <span>{{'2020-12-01' |relativeTime}}</span>
                    </div>
                </div>
                <!-- 封面 -->
                <van-image
                    slot="default"
                    class="right-cover"
                    fit="cover"
                    src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
                />
            </van-cell>
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >作为 IT 行业的过来人,谈一谈基础的重要性？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2019-12-01' |relativeTime}}</span>
                    </div>
                </div>
                <!-- 封面 -->
                <van-image
                    slot="default"
                    class="right-cover"
                    fit="cover"
                    src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
                />
            </van-cell>
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >怎样才能快速提升技能？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2020-12-01' |relativeTime}}</span>
                    </div>
                </div>
                <!-- 封面 -->
                <van-image
                    slot="default"
                    class="right-cover"
                    fit="cover"
                    src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
                />
            </van-cell>
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >怎么更好的用好React？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2020-12-01' |relativeTime}}</span>
                    </div>
                </div>
                <!-- 封面 -->
                <van-image
                    slot="default"
                    class="right-cover"
                    fit="cover"
                    src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
                />
            </van-cell>
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >作为 IT 行业的过来人,想说：学习永无止境？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2020-12-01' |relativeTime}}</span>
                    </div>
                </div>
                <!-- 封面 -->
                <van-image
                    slot="default"
                    class="right-cover"
                    fit="cover"
                    src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
                />
            </van-cell>
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >什么项目能更好练手？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2020-12-01' |relativeTime}}</span>
                    </div>
                </div>
                <!-- 封面 -->
                <van-image
                    slot="default"
                    class="right-cover"
                    fit="cover"
                    src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
                />
            </van-cell>
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >作为 IT 行业的过来人，你有什么话想对后辈说的？</div>
                <div slot="label">
                    <div class="lable-info-wrap">
                        <span>xiaoliu</span>
                        <span>评论</span>
                        <span>{{'2020-12-01' |relativeTime}}</span>
                    </div>
                </div>
                <!-- 封面 -->
                <van-image
                    slot="default"
                    class="right-cover"
                    fit="cover"
                    src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
                />
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: "qa",
};
</script>

<style scoped lang='less'>
.layout-container {
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .content {
        margin-top: 92px;
    }
    img {
        width: 242px;
        height: 162px;
    }
    .lable-info-wrap span {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .right-cover {
        width: 232px;
        height: 146px;
    }
}
</style>