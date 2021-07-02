<template>
    <div class="login">
        <sd-header title="登录"></sd-header>
        <img class="logo" src="../assets/img/logo.png" alt="">
        <div class="item">
            <span>账号:</span>
            <input type="number" v-model="username">
        </div>
        <div class="item">
            <span>密码:</span>
            <input type="text" v-model="password">
            <span class="goRegister" @click="goRegister">去注册</span>
        </div>

        <div class="login" @click="login">登录</div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        username: '1006364428',
        password: '514273'
    }
  },
    methods: {
        login() {
            let params = {username: this.username, password: this.password}
            this.$axios.post(`${ml_request.common}/login`, params)
                .then((res)=> {
                    this.$toast.default({
                        content: res.note
                    })
                    if(res.code === 200) {
                        sessionStorage.setItem('userId', res.data.id)
                        this.$router.push('/index')
                    }
                })
        },
        goRegister() {
            this.$router.push('/register')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login {
        /deep/.sd-header{
            display: none;
        }
        .logo {
            display: block;
            margin: 0.4rem auto 0;
        }
        .item {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 0 0.3rem;
            margin-top: 0.3rem;
            span{
                display: inline-block;
                width: 0.8rem;
            }
            input {
                width: 4rem;
                margin-left: 0.3rem;
                padding: 0.1rem 0.2rem;
                height: 0.6rem;
                border: none;
                outline: none;
                background-color: #fafafa;
            }
            .goRegister {
                left: 1.14rem;
                bottom: -0.6rem;
                width: 2rem;
                position: absolute;
                font-size: 0.28rem;
                color: rgb(65, 184, 131);
            }
        }
        .login {
            position: fixed;
            bottom: 1.2rem;
            width: 6rem;
            height: 0.88rem;
            left: 0;
            right: 0;
            margin: auto;
            border-radius: 0.1rem;
            font-size: 0.36rem;
            line-height: 0.88rem;
            text-align: center;
            letter-spacing: 0.02rem;
            background-color: rgb(65, 184, 131);
            color: #fff;
        }
        .login:active {
            opacity: 0.85;
        }
    }
</style>
