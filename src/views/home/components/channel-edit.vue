<template>
    <div class="channel-edit">
        <van-cell>
            <div
                slot="title"
                class="title-text"
            >我的频道</div>
            <van-button
                type="danger"
                plain
                round
                size="mini"
                class="edit-btn"
                @click="isEdit=!isEdit"
            >{{isEdit?'完成':'编辑'}}</van-button>
        </van-cell>
        <van-grid
            :gutter="10"
            class="my-grid"
        >
            <van-grid-item
                v-for="value,index in myChannels"
                :key="index"
                class="grid-item"
                icon="clear"
                @click="onMyChannelClick(value,index)"
            >
                <!-- 插槽的形式插入进去 -->
                <van-icon
                    v-show="isEdit&&!fixChannels.includes(value.id)"
                    slot="icon"
                    name="clear"
                ></van-icon>
                <!--动态绑定class样式 :class="{active(样式名):index===active}" -->
                <span
                    slot="text"
                    class="text"
                    :class="{active:index===active}"
                >{{value.name}}</span>
            </van-grid-item>
        </van-grid>
        <!--频道推荐,所有频道列表 -->
        <van-cell>
            <div
                slot="title"
                class="title-text"
            >频道推荐</div>
        </van-cell>
        <van-grid
            :gutter="10"
            class="recommend-grid"
        >
            <van-grid-item
                v-for="value in recommendChannels"
                :key="value.id"
                :text="value.name"
                class="grid-item"
                icon="plus"
                @click="onAddChannel(value)"
            />
        </van-grid>
    </div>
</template>

<script>
import {
    getAllChannels,
    addUserChannel,
    deleteUserChannel,
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";
export default {
    created() {
        this.loadChannels();
    },
    data() {
        return {
            allChannels: [],
            isEdit: false,
            fixChannels: [0], //固定频道,存的是id
        };
    },
    computed: {
        recommendChannels() {
            // filter和find配合使用(或者forEach和find搭配)
            return this.allChannels.filter((channel) => {
                return !this.myChannels.find((mychannel) => {
                    return mychannel.id === channel.id;
                });
            });
        },
        // 拿到store中的state
        ...mapState(["user"]),
    },
    // 接收props
    props: {
        myChannels: {
            type: Array,
            required: true,
        },
        active: {
            type: Number,
            required: true,
        },
    },
    methods: {
        async loadChannels() {
            try {
                const { data } = await getAllChannels();
                this.allChannels = data.data.channels;
            } catch (error) {
                this.$toast("数据获取失败");
            }
        },
        // 添加channel
        async onAddChannel(value) {
            this.myChannels.push(value);
            //判断是否已登录，是存到服务器，否则存到本地存储
            if (this.user) {
                try {
                    await addUserChannel({
                        id: value.id, //频道ID
                        name: value.name,
                        seq: this.myChannels.length, //序号
                    });
                } catch (error) {
                    this.$toast("添加失败，请稍后再试");
                }
            } else {
                setItem("TOUTIAO_CHANNELS", this.myChannels);
            }
        },
        //我的频道
        onMyChannelClick(value, index) {
            if (!this.isEdit) {
                // 非编辑状态，执行切换频道
                //子传父
                this.$emit("update-active", index, false);
            } else {
                // 编辑状态，执行删除频道
                if (this.fixChannels.includes(value.id)) {
                    return;
                } else {
                    this.myChannels.splice(index, 1);
                }

                if (index <= this.active) {
                    this.$emit("update-active", this.active - 1);
                }
                // 删除频道项
                this.deleteChannel(value.id);
            }
        },
        async deleteChannel(id) {
            if (this.user) {
                // 已登录，数据更新到线上
                try {
                    await deleteUserChannel(id);
                } catch (error) {
                    this.$toast("删除失败");
                }
            } else {
                // 未登录，更新到本地
                setItem("TOUTIAO_CHANNELS", this.myChannels);
            }
        },
    },
};
</script>

<style scoped lang='less'>
/deep/ .van-grid-item__text {
    margin-top: 0;
}
.channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/ .grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            background-color: #f7f8fa;
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
        .van-grid-item_text,
        .text {
            font-size: 24px;
            color: #222;
            .van-grid-item__text {
                margin-top: 0;
            }
        }
        .active {
            color: #f85959;
        }
    }
    /deep/ .my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
    }
    /deep/ .recommend-grid {
        .grid-item {
            .van-grid-item__content {
                white-space: nowrap;
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }
            .active {
                color: #f85959;
            }
        }
    }
}
</style>