<template>
    <div id="shopcar-warrper">
        <searchbar pageType='shopcar' title='购物车'></searchbar>
        <div class='shopcar-content'>
            <div class='shopcar-page'>
                <scroll-view
                        class="shopcar-srcoll"
                        ref='shopcarScroll'
                        v-if='shopcarList.length>0'
                        :refreshDelay='20'
                        :data='shopcarList'>
                    <div class='shopcar-scroll-content'
                         v-for='(itme,index) in shopcarList'
                    >
                    </div>
                </scroll-view>
                <div class='empty-root' v-else>
                    <div class='login-wraper'>
                        登录后同步购物车数据
                        <span class='btn-login'>登陆</span>
                    </div>
                    <empty-view
                            pageType='shopCar'
                    ></empty-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollView from '../../components/ScrollView';
    import Searchbar from '../../components/SearchBar';
    import EmptyView from '../../components/EmptyView';

    export default {
        name: 'shopcar',
        components: {
            Searchbar,
            ScrollView,
            EmptyView
        },
        data() {
            return {
                shopcarList: []
            }
        },
        created() {
        },
        methods: {},
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables";

    #shopcar-warrper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        .search-root {
            overflow: hidden;
            background-color: white;
        }
        .shopcar-content {
            position: absolute;
            top: 50px;
            bottom: 0;
            display: flex;
            border-top: 1px solid #ddd;
            width: 100%;
            .shopcar-page {
                height: 100%;
                flex-grow: 1;
                .shopcar-srcoll {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    .shopcar-scroll-content {
                        height: 100%;
                        width: 100%;
                        .page-item {
                            width: 33.33%;
                            float: left;
                            text-align: center;
                            padding: 10px 0 0 0;
                            .pro-img {
                                width: 80%;
                                height: 100px;
                                text-align: center;
                            }
                            .pro-name {
                                box-sizing: border-box;
                                height: 31PX;
                                font-size: 13PX;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                word-break: break-all;
                                color: #1a1a1a;
                                margin-top: 5px;
                                line-height: 16PX;
                                margin-bottom: 3px;
                                padding: 0 4px;
                            }
                        }
                    }
                }
                .empty-root {
                    width: 100%;
                    height: 100%;
                    .login-wraper {
                        padding: 10px;
                        text-align: center;
                        font-size: 14px;
                        background-color: white;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;
                    }
                    .btn-login {
                        display: inline-block;
                        margin-left: 10px;
                        width: 58px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                        background-image: -webkit-gradient(linear, right top, left top, from(#f2270c), to(#ff4b2b));
                        background-image: -webkit-linear-gradient(right, #f2270c, #ff4b2b);
                        background-image: linear-gradient(270deg, #f2270c, #ff4b2b);
                        box-shadow: 0 3px 6px 0 rgba(255, 65, 66, 0.2);
                        border-radius: 15px;
                    }
                }
            }
        }
    }
</style>
