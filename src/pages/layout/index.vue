<template>
    <div id="layout">
        <main-tab :main-tab-data="mainTabData"></main-tab>
        <transition name="slide">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import MainTab from '../../components/MainTab'
    import {homeTabData} from '../../../common/constant'

    export default {
        data() {
            return {
                mainTabData: homeTabData
            }
        },
        components: {
            MainTab
        }
    }
</script>
<style scoped lang="scss">
    #layout {
        .slide-enter-active, .slide-leave-active {
            transition: all 0.5s
        }
        .slide-enter {
            transform: translate3d(100%, 0, 0)
        }
        .slide-leave-to {
            transform: translate3d(-100%, 0, 0)
        }
    }
</style>
