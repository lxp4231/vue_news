<template>
    <div class="article-container">
        <!-- 导航栏 -->
        <van-nav-bar
            class="page-nav-bar"
            left-arrow
            @click-left="onClickLeft"
        ></van-nav-bar>
        <!-- /导航栏 -->

        <div class="main-wrap">
            <!-- 加载中 -->
            <div
                class="loading-wrap"
                v-if="loading"
            >
                <van-loading
                    color="#404040"
                    vertical
                >加载中</van-loading>
            </div>
            <!-- /加载中 -->

            <!-- 加载完成-文章详情 -->
            <div
                class="article-detail"
                v-else-if="article.title"
            >
                <!-- 文章标题 -->
                <h1 class="article-title">{{article.title}}</h1>
                <!-- /文章标题 -->

                <!-- 用户信息 -->
                <van-cell
                    class="user-info"
                    center
                    :border="false"
                >
                    <van-image
                        class="avatar"
                        slot="icon"
                        round
                        fit="cover"
                        :src="article.aut_photo"
                    />
                    <div
                        slot="title"
                        class="user-name"
                    >xiaoliu</div>
                    <div
                        slot="label"
                        class="publish-date"
                    >{{'2021-03-11' | relativeTime}}</div>

                    <!-- 关注按钮 -->
                    <!--使用v-model 简写 -->
                    <followUser
                        class="follow-btn"
                        :aut_id="article.aut_id"
                        v-model="article.is_followed"
                    />
                    <!-- <followUser
                        class="follow-btn"
                        :aut_id="article.aut_id"
                        :is_followed='article.is_followed'
                        @update-is_followed="article.is_followed=$event"
                    /> -->
                    <!-- <van-button
                        v-if="article.is_followed"
                        class="follow-btn"
                        round
                        size="small"
                        :loading="isFollowLoading "
                        @click="onFollow"
                    >已关注</van-button>
                    <van-button
                        v-else
                        class="follow-btn"
                        type="info"
                        color="#404040"
                        round
                        size="small"
                        icon="plus"
                        @click="onFollow"
                        :loading="isFollowLoading "
                    >关注</van-button> -->
                </van-cell>
                <!-- /用户信息 -->

                <!-- 文章内容 -->
                <div
                    class="article-content markdown-body"
                    v-html='article.content'
                    ref="article-content"
                ></div>
                <van-divider>正文结束</van-divider>
                <!-- 评论列表 -->
                <commentList
                    :source=article.art_id
                    @total_count="totalCount=$event"
                    :list=commentList
                />
                <!-- 底部区域 -->
                <div class="article-bottom">
                    <van-button
                        class="comment-btn"
                        type="default"
                        round
                        size="small"
                        @click="isShowComment=!isShowComment"
                    >写评论</van-button>

                    <van-icon
                        name="comment-o"
                        :info="totalCount"
                        color="#777"
                    />
                    <!--收藏/取消 -->
                    <collectArticle
                        v-model='article.is_collected'
                        :articleId=article.art_id
                    />
                    <!-- <van-icon
                color="#777"
                name="star-o"
            /> -->
                    <!-- 点赞 -->
                    <!-- <van-icon
                        color="#777"
                        name="good-job-o"
                    /> -->
                    <likeArticle
                        v-model='article.attitude'
                        :articleId=article.art_id
                    />
                    <!-- 转发 -->
                    <van-icon
                        name="share"
                        color="#777777"
                    ></van-icon>
                </div>
                <!-- /底部区域 -->

                <!-- 底部评论弹出层 -->
                <van-popup
                    v-model="isShowComment"
                    position="bottom"
                >
                    <commentPost
                        :articleId="article.art_id"
                        @post-success="onPostSuccess"
                    />
                </van-popup>
            </div>
            <!-- /加载完成-文章详情 -->

            <!-- 加载失败：404 -->
            <div
                class="error-wrap"
                v-else-if="errStatus===404"
            >
                <van-icon name="failure" />
                <p class="text">该资源不存在或已删除！</p>
            </div>
            <!-- /加载失败：404 -->

            <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
            <div
                class="error-wrap"
                v-else
            >
                <van-icon name="failure" />
                <p class="text">内容加载失败！</p>
                <van-button
                    class="retry-btn"
                    @click="loadArticle"
                >点击重试</van-button>
            </div>
            <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
        </div>

    </div>
</template>

<script>
import { getArticlesById } from "@/api/article.js";
import { ImagePreview } from "vant";
import followUser from "@/components/follow-user";
import collectArticle from "@/components/collect-article";
import likeArticle from "@/components/like-article";
import commentList from "@/views/articles/components/comment-list";
import commentPost from "@/views/articles/components/comment-post";
export default {
    name: "ArticleIndex",
    components: {
        followUser,
        collectArticle,
        likeArticle,
        commentList,
        commentPost,
    },
    props: {
        articleId: {
            type: [Number, String],
            required: true,
        },
    },
    data() {
        return {
            article: {},
            loading: true,
            errStatus: 0,
            totalCount: 0, //评论总数
            isShowComment: false,
            commentList: [],
        };
    },
    created() {
        this.loadArticle();
    },
    methods: {
        async loadArticle() {
            this.loading = true; //重新加载，loading重新为true
            try {
                const { data } = await getArticlesById(this.articleId);
                this.article = data.data;
                this.loading = false;
                this.$nextTick(() => {
                    this.previewImage();
                });
            } catch (error) {
                //加载失败显示404
                if (error.response && error.response.status == 404) {
                    this.errStatus = 404;
                }
                this.loading = false;
                this.$toast("获取失败，请稍后再试");
            }
        },
        //图片预览
        previewImage() {
            const articleContent = this.$refs["article-content"];
            const imgs = articleContent.querySelectorAll("img");
            const images = [];
            imgs.forEach((img, index) => {
                images.push(img.src);
                img.onclick = () => {
                    // 预览，do something
                    ImagePreview({
                        images, //src数组
                        startPosition: index, //起始位置
                    });
                };
            });
        },
        //
        onPostSuccess(data) {
            this.isShowComment = false;
            this.commentList.unshift(data.new_obj);
        },
        onClickLeft() {
            this.$router.back(); //怎么回到原来的位置，而不是重新刷新页面
        },
    },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css"; //引入当前目录下的css
.article-container {
    .main-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 92px;
        bottom: 88px;
        overflow-y: scroll;
        background-color: #fff;
    }
    .article-detail {
        .article-title {
            font-size: 40px;
            padding: 50px 32px;
            margin: 0;
            color: #3a3a3a;
        }

        .user-info {
            padding: 0 32px;
            .avatar {
                width: 70px;
                height: 70px;
                margin-right: 17px;
            }
            .van-cell__label {
                margin-top: 0;
            }
            .user-name {
                font-size: 24px;
                color: #3a3a3a;
            }
            .publish-date {
                font-size: 23px;
                color: #b7b7b7;
            }
            .follow-btn {
                width: 170px;
                height: 58px;
            }
        }

        .article-content {
            box-sizing: border-box;
            padding: 55px 32px;
            /deep/ p {
                text-align: justify;
            }
        }
    }

    .loading-wrap {
        padding: 200px 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    .error-wrap {
        padding: 200px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        .van-icon {
            font-size: 122px;
            color: #b4b4b4;
        }
        .text {
            font-size: 30px;
            color: #666666;
            margin: 33px 0 46px;
        }
        .retry-btn {
            width: 280px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #c3c3c3;
            font-size: 30px;
            color: #666666;
        }
    }

    .article-bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        height: 88px;
        border-top: 1px solid #d8d8d8;
        background-color: #fff;
        .comment-btn {
            width: 282px;
            height: 46px;
            border: 2px solid #eeeeee;
            font-size: 30px;
            line-height: 46px;
            color: #a7a7a7;
        }
        .van-icon {
            font-size: 40px;
            .van-info {
                font-size: 16px;
                background-color: #e22829;
            }
        }
    }
    /deep/.van-nav-bar {
        .van-icon {
            font-size: 40px;
            color: #404040;
        }
    }
}
</style>
