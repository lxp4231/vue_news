<template>
    <div class="user-profile">
        <van-nav-bar
            title="个人信息"
            left-arrow
            @click-left="$router.back()"
            @click-right="$router.back()"
            right-text="保存"
        />
        <!-- input上传头像 -->
        <input
            type="file"
            hidden
            ref="file"
            @change="onFileChange"
        >
        <van-cell-group>
            <van-cell
                title="头像"
                is-link
                @click="$refs.file.click()"
            >
                <van-image
                    round
                    width="30"
                    height="30"
                    fit="cover"
                    :src="userProfile.photo"
                />
            </van-cell>
            <van-cell
                title="昵称"
                :value="userProfile.name"
                is-link
                @click="isUpdateNameShow=true"
            />
            <van-cell
                title="性别"
                :value="userProfile.gender===1?'女':'男'"
                is-link
                @click="isUpdateSexShow=true"
            />
            <van-cell
                title="生日"
                :value="userProfile.birthday"
                is-link
                @click="isUpdateBirthdayShow=true"
            />
        </van-cell-group>
        <van-cell
            v-if="user"
            title="退出登录"
            clickable
            class="logout-cell"
            @click="onLogout"
        />
        <!-- 编辑昵称 -->
        <van-popup
            v-model="isUpdateNameShow"
            style="height:100%"
            position="bottom"
        >
            <!-- v-if="isUpdateNameShow": 条件渲染，组件销毁，里面的状态也销毁 -->
            <UpdateName
                v-if="isUpdateNameShow"
                @close="isUpdateNameShow=false"
                v-model="userProfile.name"
            />
        </van-popup>
        <!-- 编辑性别 -->
        <van-popup
            v-model="isUpdateSexShow"
            position="bottom"
        >
            <UpdateSex
                v-if="isUpdateSexShow"
                @close="isUpdateSexShow=false"
                v-model="userProfile.gender"
            />
            <!-- v-model="userProfile.gender" 双向绑定并传值，子级$emit传递变化 -->
        </van-popup>
        <!-- 修改生日 -->
        <van-popup
            v-model="isUpdateBirthdayShow"
            position="bottom"
        >
            <UpdateBirthday
                v-if="isUpdateBirthdayShow"
                @close="isUpdateBirthdayShow=false"
                v-model="userProfile.birthday"
            />
        </van-popup>
        <!--编辑头像 -->
        <van-popup
            v-model="isUpdatePhotoShow"
            position="bottom"
            style="height:100%"
        >
            <UpdatePhoto
                :img="img"
                v-if="isUpdatePhotoShow"
                @close="isUpdatePhotoShow=false"
                @update-photo="userProfile.photo=$event"
            />
            <!-- @update-photo="userProfile.photo=$event" 子级去触发父级视图更新 -->
        </van-popup>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getUserProfile } from "@/api/user.js";
import UpdateName from "./components/update-name.vue";
import UpdateSex from "./components/update-sex.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdatePhoto from "./components/update-photo.vue";
export default {
    name: "UserProfile",
    data() {
        return {
            userProfile: {},
            isUpdateNameShow: false,
            isUpdateSexShow: false,
            isUpdateBirthdayShow: false,
            isUpdatePhotoShow: false,
            img: null,
        };
    },
    components: { UpdateName, UpdateSex, UpdateBirthday, UpdatePhoto },
    computed: {
        ...mapState(["user"]),
    },
    created() {
        this.onLoadUserProfile();
    },
    methods: {
        // 退出登录
        onLogout() {
            //通过 this.$dialog
            this.$dialog
                .confirm({
                    message: "确认要删除吗",
                })
                .then(() => {
                    // 确认删除，清空本地存储和store的状态(store中的数据是响应式的)
                    // this.$store.commit("saveUserToken", null);//或直接通过commit
                    this.saveUserToken(null);
                    this.$router.back();
                })
                .catch(() => {
                    return;
                });
        },
        ...mapMutations(["saveUserToken"]),
        // 获取用户信息
        async onLoadUserProfile() {
            try {
                const { data } = await getUserProfile();
                this.userProfile = data.data;
            } catch (error) {
                this.$toast.fail("获取信息失败");
            }
        },
        onFileChange() {
            this.isUpdatePhotoShow = true;
            // 获取文章对象
            const file = this.$refs.file.files[0];
            // 基于文章对象获取blob数据，并传给子组件
            this.img = window.URL.createObjectURL(file);
            // 同一个文件不会触发change事件，所以使用完毕就清空
            this.$refs.file.value = "";
        },
    },
};
</script>

<style scoped lang="less">
/deep/ .van-nav-bar {
    .van-nav-bar__right {
        .van-nav-bar__text {
            color: #000;
        }
    }
}
/deep/.van-nav-bar {
    .van-icon {
        color: #404040;
    }
}
.logout-cell {
    margin-top: 10px;
    color: #f86152;
    text-align: center;
}
.van-popup {
    background-color: #f0f0f0;
}
</style>