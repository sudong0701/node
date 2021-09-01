<template>
    <div class="login">
        <div class="login-content">
            <div class="login-content-title">登录</div>
            <div class="login-content-info">
                <div class="login-content-username">
                    <ml-input id="username" size="large" placeholder="请输入用户名" clearable v-model:value="loginInfo.username">
                        <template #prefix>
                            <n-icon>
                                <person />
                            </n-icon>
                        </template>
                    </ml-input>
                </div>
                <div class="login-content-password">
                    <ml-input id="password" size="large" type="password" limit="password" placeholder="请输入密码" clearable v-model:value="loginInfo.password">
                        <template #prefix>
                            <n-icon>
                                <lockClosed />
                            </n-icon>
                        </template>
                    </ml-input>
                </div>

                <div class="login-content-forget">
                    <n-button text type="info" @click="showForget">忘记密码?</n-button>
                </div>

                <div class="login-content-next">
                    <el-button style="width: 100%;" type="primary" @click="goLogin" size="large">登录</el-button>
                </div>

            </div>
            <div class="login-content-bottom">望着不可谏，来者犹可追。</div>
        </div>

        <el-dialog title="提示" v-model="isShow" width="576px" top="25vh">
            <div class="forget-text">您正在修改或重置密码，点击确定按钮系统会发送一封修改密码的邮件至您的邮箱，请确认您的邮箱是否为：<br /> <span>{{emailUrl}}</span><br /> 如果不是请与管理员联系。</div>
            <template #footer>
                <span class="forget-cancel">
                    <el-button @click="cancelSend" size="large">取消</el-button>
                </span>
                <span class="forget-confirm">
                    <el-button type="primary" @click="sendEmail" size="large">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"; //getCurrentInstance, //ComponentInternalInstance,
import { requestApi } from "../../../utils/axios";
import { NInput, NIcon, useMessage, NMessageProvider, NSelect } from "naive-ui";
import { useStore } from "vuex";
import { setToken } from "../../../utils/storage";
import { ElDialog } from "element-plus";
import { Person, LockClosed, ArrowForwardCircleSharp } from "@vicons/ionicons5";
import { isEmpty } from "../../../utils/common";
import { useRouter } from "vue-router";
import { userInfoConfig, loginInfoConfig } from "./data";

export default defineComponent({
    components: {
        ElDialog,
        NInput,
        NIcon,
        NSelect,
        Person,
        LockClosed,
        ArrowForwardCircleSharp,
        NMessageProvider,
    },
    setup() {
        //const vueInstance = getCurrentInstance();
        const store = useStore();
        window.$message = useMessage();
        const router = useRouter();
        const isShow = ref<boolean>(false);
        const emailUrl = ref<string>("1006364428@qq.com");
        const loginInfo = reactive<loginInfoConfig>({
            username: "zhangsan",
            password: "123456"
        });

        /**
         * 忘记密码人弹框点击取消时触发
         * @param
         * @return
         */
        const cancelSend = () => {
            isShow.value = false;
        };
        /**
         * 忘记密码人弹框点击确认时触发
         * @param
         * @return
         */
        const sendEmail = () => {
            cancelSend();
        };
        /**
         * 点击登录按钮时触发
         * @param
         * @return
         */
        const goLogin = () => {
            if (isEmpty(loginInfo.username)) {
                window.$message.error("请输入用户名");
                return;
            }
            if (isEmpty(loginInfo.password)) {
                window.$message.error("请输入密码");
                return;
            }

            requestApi<loginInfoConfig, userInfoConfig>({
                url: '/api/user/login',
                data: loginInfo,
            }).then((res) => {
                    console.log(res)
                })
                .catch(() => {});
        };
        /**
         * 点击忘记密码时触发
         * @param
         * @return
         */
        const showForget = () => {
            if (isEmpty(loginInfo.username)) {
                window.$message.error("请输入用户名");
                return;
            }
            isShow.value = true;
        };

        return {
            isShow,
            emailUrl,
            loginInfo,
            goLogin,
            showForget,
            cancelSend,
            sendEmail,
        };
    },
});
</script>

<style lang="scss" scoped>
$itemWidth: 360px;
@import "../../../assets/css/base.scss";
.login {
    position: relative;
    height: 100%;
    background: url("../../../assets/img/page/sys/login/login_bg.jpg");
    background-size: cover;
    .login-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        padding: $xxxlMg $mMg 0;
        width: 440px;
        height: 440px;
        border-radius: $radius;
        background: #fff;
        box-shadow: $box-shadow;
        .login-content-title {
            font-size: 32px;
            margin-bottom: 48px;
            color: $color;
        }
        .login-content-info {
            display: flex;
            flex-direction: column;
            > div {
                display: flex;
                flex-direction: row;
                width: $itemWidth;
                margin-bottom: $xlMg;
            }
            .login-content-forget {
                margin-top: -16px;
            }
            .login-content-next {
                margin-top: $mMg;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
        }
        .login-content-bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: $mMg;
            width: $itemWidth;
            margin: auto;
            text-align: left;
            font-size: 12px;
            color: #999;
        }
    }
}
.forget-text {
    font-size: 18px;
    line-height: 34px;
    > span {
        color: $color;
    }
}
.forget-confirm {
    margin-left: $mMg;
}
</style>
