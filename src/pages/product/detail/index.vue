<template>
    <scroll-view id='goods-detail-scroll'>
        <div class='goods-detail-container'>
            <header class='goods-header'>
            <span class='header-icon-l'>
                <i class='icon-cebianlanshouqi'></i>
            </span>
                <div class='header-tab' @click='tabClick'>
                    <span :class='{"tab-active":tabIndex==0}' index='0'>商品</span>
                    <span :class='{"tab-active":tabIndex==1}' index='1'>评价</span>
                    <span :class='{"tab-active":tabIndex==2}' index='2'>详情</span>
                    <span :class='{"tab-active":tabIndex==3}' index='3'>推荐</span>
                </div>
                <span class='header-icon-r'>
                    <i class="icon-haofangtuoiconfont_dianpu"></i>
                    <div class='pop-mask' v-show='isShowPop'
                         @click='cancelPop'>
                        <div class="m_header_nav" style="">
                            <div id="0" class="icon-iconfonticon-shouye type_index">
                                首页
                            </div>
                            <div id="1" class="icon-iconfontlist1 type_search">
                                分类搜索
                            </div>
                            <div id="2" class="icon-iconfontcart type_shopcart">
                                购物车
                            </div>
                            <div id="3" class="icon-iconfont18 type_my">
                                我的京东
                            </div>
                        </div>
                    </div>
                </span>


            </header>
        </div>
    </scroll-view>
</template>

<script>
    import ScrollView from '../../../components/ScrollView';
    import ProductAip from '../../../request/product';

    export default {
        name: 'proDetail',
        components: {
            ScrollView
        },
        data() {
            return {
                isShowPop: true,
                tabIndex: 0
            }
        },
        created() {
            if (this.$route.params.id <= 0) {
                this.$router.back()
            } else {
                this._productDetail(this.$route.params.id)
            }
        },
        methods: {
            _productDetail(id) {
                ProductAip.productDetail(id).then(res => {
                    console.log('productDetail', res)
                })
            },
            tabClick(e) {
                let event = e || window.event;
                const index = event.target.index
                if (id == 0) {
                } else if (id == 1) {
                } else if (id == 2) {
                } else if (id == 3) {
                }
            },
            cancelPop() {
                this.isShowPop = false
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../../styles/variables";

    #goods-detail-scroll {
        .goods-detail-container {
            .goods-header {
                height: 50px;
                line-height: 50px;
                display: flex;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: white;
                .header-tab {
                    display: flex;
                    justify-content: space-around;
                    flex-grow: 1;
                    font-size: 14px;
                    margin: 0 30px;
                    span {
                        height: 40px;
                    }
                    .tab-active {
                        &:after {
                            display: block;
                            position: absolute;
                            content: "";
                            width: 28px;
                            height: 3px;
                            background-image: -webkit-gradient(linear, left top, right top, from(#f5503a), to(#fad1cb));
                            background-image: -webkit-linear-gradient(left, #f5503a, #fad1cb);
                            background-image: linear-gradient(90deg, #f5503a, #fad1cb);
                            bottom: 6px;
                        }
                    }
                }
                .header-icon-l {
                    padding: 0 10px;
                }
                .header-icon-r {
                    padding: 0 10px;
                    .pop-mask {
                        position: fixed;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        right: 0;
                        background: transparent;
                        .m_header_nav {
                            background-color: rgba(0, 0, 0, .9);
                            border-radius: 4px;
                            width: 125px;
                            position: absolute;
                            right: 10px;
                            color: white;
                            z-index: 1000;
                            div {
                                font-size: 16px;
                                padding-left: 20px;
                                border-bottom: 1px solid white;
                                span {
                                    padding-left: 6px;
                                }
                            }
                            &:before {
                                position: absolute;
                                top: -5px;
                                right: 7px;
                                content: "";
                                width: 0;
                                height: 0;
                                border-color: transparent transparent rgba(0, 0, 0, .9);
                                border-style: solid;
                                border-width: 0 5px 5px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
