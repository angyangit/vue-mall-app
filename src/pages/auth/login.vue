<template>
    <div class="login-warpper">
        <h1 class='title'>登陆</h1>
        <i class="icon-iconfontclose2 btn-close" @click.stop='closePage'></i>
        <input class='ipt' type='text' v-model='username'
               placeholder='请输入用户名'>
        <input class='ipt' type='text' v-model='password'
               placeholder='请输入密码'>
        <p class='login-error' v-show='error'>{{error}}</p>
        <a class="btn-login" :class='{"btn-login-active":validSucc}'
           @click='login'>登 录</a>
    </div>
</template>
<script>
    import {mapMutations, mapActions} from 'vuex'
    import {SET_TO_LOGIN_PAGE, SET_TOKEN} from '../../store/mutation-types';
    import AuthAip from '../../request/auth';

    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                validSucc: false,
                error: ''
            }
        },
        methods: {
            closePage() {
                this.setToLoginPage(false)
            },
            validForm() {
                this.error = ''
                const username = this.username
                const password = this.password
                if (username.length > 2 && password.length > 5) {
                    this.validSucc = true
                } else {
                    this.validSucc = false
                }
            },
            login() {
                if (!this.validSucc) return
                // AuthAip.login({
                //     username: this.username,
                //     password: this.password
                // }).then(res => {
                //     const tokenStr = res.tokenHead + res.token
                //     this.setToken(tokenStr)
                //     this.setToLoginPage(false)
                // }).catch(err => {
                //     this.error = err.message
                // })
                this.loginAction({
                    username: this.username,
                    password: this.password
                })
            },
            ...mapMutations({
                setToLoginPage: SET_TO_LOGIN_PAGE,
                setToken: SET_TOKEN
            }),
            ...mapActions(['loginAction'])
        },
        watch: {
            username(newVal) {
                this.validForm();
            },
            password(newVal) {
                this.validForm();
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../styles/variables";

    .login-warpper {
        width: 100%;
        height: 100%;
        position: fixed;
        padding: 20px;
        box-sizing: border-box;
        background-color: white;
        .title {
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            margin-top: 10px;
        }
        .btn-close {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #999;
            font-size: 30px;
        }
        .ipt {
            margin-top: 30px;
            width: 100%;
            border: 0;
            border-bottom: 1px solid #ddd;
            font-size: 18px;
            padding-bottom: 10px;
            outline: none;
            box-sizing: border-box;
            font-weight: 700;
            -webkit-tab-highlight-color: rgba(0, 0, 0, 0);
            -webkit-appearance: none;
            &:focus {
                caret-color: $color-theme;
            }
        }
        .login-error {
            font-weight: 700;
            font-size: 16px;
            color: $color-theme-light;
            margin-top: 10px;
        }
        .btn-login {
            display: block;
            margin-top: 30px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            display: block;
            background-color: #efefef;
            border-radius: 20px;
            font-size: 18PX;
            color: #fff;
            font-weight: 700;
            background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #fab3b3), color-stop(73%, #ffbcb3), to(#ffcaba));
            background-image: -webkit-linear-gradient(left, #fab3b3, #ffbcb3 73%, #ffcaba);
            background-image: -o-linear-gradient(left, #fab3b3 0, #ffbcb3 73%, #ffcaba 100%);
            background-image: linear-gradient(90deg, #fab3b3, #ffbcb3 73%, #ffcaba);
            -webkit-box-shadow: 0 5px 20px 0 rgba(255, 62, 62, 0.2);
            box-shadow: 0 5px 20px 0 rgba(255, 62, 62, 0.2);
            text-align: center;
        }
        .btn-login-active {
            background-image: -webkit-gradient(linear, left top, right top, from(#f10000), color-stop(73%, #ff2000), to(#ff4f18));
            background-image: -webkit-linear-gradient(left, #f10000, #ff2000 73%, #ff4f18);
            background-image: -o-linear-gradient(left, #f10000, #ff2000 73%, #ff4f18);
            background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
        }
    }
</style>
