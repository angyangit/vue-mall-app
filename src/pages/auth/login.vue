<template>
    <div class="login-warpper" @click='toMine'>
        login
        <p class="txt">等接口的肯定</p>
        <div class="aa"></div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        methods: {
            toMine() {
                this.$router.back()
                // this.$router.replace('/mine')
            },
        }
    }
</script>
<style lang="scss" scoped>

    .login-warpper {
        background-color: red;
        width: 100%;
        height: 100%;
        position: fixed;
        .txt {
            color: aquamarine;
            font-size: 20px; /*no*/
        }
        .aa {
            width: 20px;
            height: 30px;
            background-color: gainsboro;
            border: 1px solid yellow;
        }
    }
</style>
