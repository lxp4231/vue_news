<template>
    <div class="login-container">
        <!-- 标题:navbar -->
        <van-nav-bar title="欢迎登录">
            <van-icon
                slot="left"
                name="cross"
                color="#969799"
                @click="$router.back()"
            />
        </van-nav-bar>
        <!-- 登录框 -->
        <van-form
            @submit="onSubmit"
            ref='loginForm'
        >
            <!-- type="number" 限定input只能输入数字 maxlength=11 限定输入长度-->
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormData.mobile"
                type="number"
                maxlength=11
            >
                <i
                    style="font-size:16px"
                    slot="left-icon"
                    class="iconfont icon-shouji"
                ></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="userFormData.code"
                type="number"
                maxlength=6
            >
                <i
                    style="font-size:16px;"
                    slot="left-icon"
                    class="iconfont icon-yanzhengma"
                ></i>
                <template #button>
                    <!-- 倒计时 -->
                    <van-count-down
                        :time="1000*60"
                        format="ss"
                        v-if="isShowCountTime"
                        @finish="isShowCountTime=false"
                    />
                    <van-button
                        round
                        size="small"
                        type="default"
                        native-type="button"
                        class="send-sms"
                        @click="onSendSms"
                        v-else
                    >发送验证码</van-button>
                </template>
            </van-field>
            <div
                style="margin: 16px;"
                class="login-btn-wrap"
            >
                <van-button
                    block
                    type="info"
                    native-type="submit"
                    class="login-btn"
                >登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { login, sentSms } from "../../api/user";

export default {
    name: "LoginPage",
    data() {
        return {
            value2: "",
            user: {
                mobile: "13911111111",
                code: "246810",
                // mobile: "",
                // code: "",
            },
            userFormData: {
                mobile: [
                    { required: true, message: "手机号不能为空" },
                    {
                        pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                        message: "手机号格式错误",
                    },
                ],
                code: [
                    { required: true, message: "验证码不能为空" },
                    { pattern: /\d{6}/, message: "验证码格式错误" },
                ],
            },
            isShowCountTime: false,
        };
    },
    methods: {
        //1.提交表单(点击时全局校验表单，失去焦点时校验)2.发送请求3.成功(执行后续)/失败
        async onSubmit() {
            const user = this.user;
            this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
            });
            try {
                // 成功
                const { data } = await login(user);
                this.$toast.success("登录成功");
                //执行后续,保存token到vuex中,共享状态,保存到本地
                this.$store.commit("saveUserToken", data.data);
                // 从哪来跳到哪去
                this.$router.back();
            } catch (err) {
                // 失败
                if (err.response.status === 400) {
                    this.$toast.fail("手机号或验证码错误");
                } else {
                    this.$toast.fail("请稍后再试");
                }
            }
        },
        // 获取验证码
        async onSendSms() {
            // 验证手机号
            try {
                await this.$refs.loginForm.validate("mobile");
            } catch (err) {
                // 错误直接返回，不再执行下面操作
                return err;
            }
            this.isShowCountTime = true;
            // 验证成功，发送请求获取验证码
            try {
                await sentSms(this.user.mobile);
                this.$toast("发送成功");
            } catch (err) {
                this.isShowCountTime = false; //发送失败关闭倒计时
                if (err.response.state === 429) {
                    this.$toast("登录频繁了，请稍后再试");
                } else {
                    this.$toast("发送失败，请稍后再试");
                }
            }
        },
    },
};
</script>

<style scoped lang="less">
.login-container {
    .van-nav-bar {
        font-size: 37px;
    }
    .van-cell {
        align-items: center;
    }
    .send-sms {
        width: 160px;
        height: 46px;
        line-height: 46px;
        background-color: #ebedef;
        font-size: 22px;
        color: #959093;
    }
    .login-btn-wrap {
        padding: 53px 20px;
        .login-btn {
            background-color: #404040;
            border: none;
        }
    }
}
</style>