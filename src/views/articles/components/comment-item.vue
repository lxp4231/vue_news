<template>
    <div class="comment-item">
        <van-cell
            class="comment-item"
            v-for="(item,index) in list"
            :key="index"
        >
            <van-image
                slot="icon"
                class="avatar"
                round
                fit="cover"
                :src="item.aut_photo"
            />
            <div
                slot="title"
                class="title-wrap"
            >
                <div class="user-name">{{item.aut_name}}</div>
                <van-button
                    class="like-btn"
                    :class="{liked:item.is_liking}"
                    :icon="item.is_liking?'good-job':'good-job-o'"
                    @click="onlikings(item)"
                >{{item.like_count || '赞'}}</van-button>
            </div>

            <div slot="label">
                <p class="comment-content">{{item.content}}</p>
                <div class="bottom-info">
                    <span class="comment-pubdate">{{item.pubdate | relativeTime}}</span>
                    <van-button
                        class="reply-btn"
                        round
                    >回复 {{item.reply_count}}</van-button>
                </div>
            </div>
        </van-cell>
    </div>
</template>

<script>
import { addLikings, deleteLikings } from "@/api/comment.js";
export default {
    data() {
        return {};
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async onlikings(item) {
            try {
                // 点赞
                if (!item.is_liking) {
                    await addLikings(item.com_id);
                    item.like_count++;
                    item.is_liking = true;
                } else {
                    //取消点赞
                    await deleteLikings(item.com_id);
                    item.like_count--;
                    item.is_liking = false;
                }
            } catch (error) {
                this.$toast.fail("操作失败，请稍后再试");
            }
        },
    },
};
</script>

<style scoped lang="less">
.comment-item {
    .avatar {
        width: 72px;
        height: 72px;
        margin-right: 25px;
    }
    .title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-name {
            color: #406599;
            font-size: 26px;
        }
    }
    .comment-content {
        font-size: 32px;
        color: #222222;
        word-break: break-all;
        text-align: justify;
    }
    .comment-pubdate {
        font-size: 19px;
        color: #222;
        margin-right: 25px;
    }
    .bottom-info {
        display: flex;
        align-items: center;
    }
    .reply-btn {
        width: 135px;
        height: 48px;
        line-height: 48px;
        font-size: 21px;
        color: #222;
    }
    .like-btn {
        height: 30px;
        padding: 0;
        border: none;
        font-size: 19px;
        line-height: 30px;
        margin-right: 7px;
        .van-icon {
            font-size: 30px;
        }
        &.liked {
            color: #e5645f;
        }
    }
}
</style>