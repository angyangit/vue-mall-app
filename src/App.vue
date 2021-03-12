<template>
    <div id="app-container">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <transition name="fade">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>

        <transition name="slide">
            <login v-if='toLoginPage'></login>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import login from './pages/auth/login'
    import {mapGetters} from 'vuex'

    export default {
        components: {
            login
        },
        computed: {
            ...mapGetters(['toLoginPage'])
        }
    }
</script>
<style scoped lang="scss">
    #app-container {
        .slide-enter-active, .slide-leave-active {
            transition: 0.3s;
        }
        .slide-enter, .slide-leave-to {
            transform: translate3d(0, 100%, 0)
        }
        .fade-enter-active {
            transition: 0.5s;
        }
        .fade-enter {
            opacity: 0;
        }
    }
</style>
