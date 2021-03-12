<template>
    <div id="main-tab-warpper">
        <a
                v-for="(item, index) in mainTabData"
                class="main-tab-item"
                :key="item.index"
                @click="tabSelect(item)"
        >
            <img class="item-img" :src="getImg(index)"/>
        </a>
    </div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex'
    import {SET_TO_LOGIN_PAGE} from '../store/mutation-types';

    export default {
        props: {
            mainTabData: Array,
            default: [],
        },
        computed: {
            ...mapGetters(['token'])
        },
        data() {
            return {
                currentIndex: 0,
            }
        },
        methods: {
            tabSelect(item) {
                if (item.path === '/mine' && !this.token) {
                    this.setToLoginPage(true)
                } else {
                    this.currentIndex = item.index
                    this.$router.push(item.path)
                }
            },
            getImg(index) {
                return this.currentIndex === index
                    ? this.mainTabData[index].selectImg
                    : this.mainTabData[index].defaultImg
            },
            ...mapMutations({
                setToLoginPage: SET_TO_LOGIN_PAGE
            })
        },
        watch: {
            $route() {
                let matched = this.$route.matched.filter(item => item.path)
                const first = matched[0]
                console.log(first)
                this.mainTabData.forEach((item, index) => {
                    console.log(first.path, item.path)
                    if (first.path === item.path) {
                        this.currentIndex = index
                        return
                    }
                })

            }
        },
    }
</script>
<style scoped lang="scss">
    #main-tab-warpper {
        width: 100%;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: white;
        box-sizing: border-box;
        border-top: 1px solid #ddd;
        display: flex;
        box-shadow: 5px 5px 5px 5px #f9f9f9;
        justify-content: space-between;
        .main-tab-item {
            height: 100%;
            .item-img {
                width: 65px;
                height: 50px;
            }
        }
    }
</style>
