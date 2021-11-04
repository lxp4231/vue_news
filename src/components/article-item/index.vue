<template>
    <!-- 采用插槽的形式定制 -->
    <van-cell
        class="article-item"
        :to="`/article/${article.art_id}`"
    >
        <div
            slot="title"
            class="title van-multi-ellipsis--l2"
        >{{article.title}}</div>
        <div slot="label">
            <div
                v-if="article.cover.type===3"
                class="cover-wrap"
            >
                <div class="cover-item">
                    <van-image
                        class="cover-item-img"
                        v-for="img,index in article.cover.images"
                        :key="index"
                        fit="cover"
                        :src="img"
                    />
                </div>
            </div>
            <div class="lable-info-wrap">
                <span>xiaoliu</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{'2020-12-01' |relativeTime}}</span>
            </div>
        </div>
        <!-- 封面 -->
        <van-image
            v-if="article.cover.type==1"
            slot="default"
            class="right-cover"
            fit="cover"
            :src="article.cover.images[0]"
        />
    </van-cell>
</template>

<script>
// import dayjs from "@/utils/dayjs";
export default {
    name: "ArticleItem",
    components: {},
    props: {
        //接收参数类型限制
        article: {
            type: Object,
            required: true,
        },
    },
    computed: {},
};
</script>

<style scoped lang="less">
.article-item {
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }
    // 让图片固定大小,并且不设置flex
    .van-cell_value {
        flex: unset;
        padding-left: 10px;
        width: 232px;
        height: 146px;
    }
    .right-cover {
        width: 232px;
        height: 146px;
    }
    .lable-info-wrap span {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    // 伪类选择器
    // .cover-item:nth-child()
    .cover-wrap {
        padding: 30px 0;
        .cover-item {
            display: flex;
            width: 100%;
            height: 146px;
            .cover-item-img {
                flex: 1;
                height: 146px;
                &:not(:last-child) {
                    margin-right: 4px;
                }
            }
        }
    }
}
</style>