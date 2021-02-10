<template>
    <div id="searchbar-warpper"
         ref='searchBar'
         :class='getBgColor'>
        <i :class='getLeftIcon' @click='leftClick'></i>
        <div class="ipt-warpper"
             v-if='showIpt'>
            <input
                    class="ipt-search"
                    v-model="searchKey"
                    placeholder="输入内容"
                    :class='iptBg'
            />

            <i class="icon-sousuo ic-search"></i>
        </div>
        <p class="ipt-warpper" v-else>{{title}}</p>
        <i :class="getRightIcon"
           @click.stop='rightClick'></i>
        <div class='pop-mask' v-show='isShowPop'
             @click='cancelPop'>
            <div
                    class="m_header_nav" style="" @click='popClick'>
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
    </div>
</template>

<script>
    const PAGE_TYPE_HOME = 'home'
    const PAGE_TYPE_CATE = 'cate'
    const PAGE_TYPE_SHOPCAR = 'shopcar'
    export default {
        name: 'searchbar',
        props: {
            bgColorPercent: 0,
            pageType: '',
            title: ''
        },
        data() {
            return {
                searchKey: '',
                isShowPop: false
            }
        },
        computed: {
            showIpt() {
                return this.pageType === PAGE_TYPE_HOME || this.pageType === PAGE_TYPE_CATE
            },
            getLeftIcon() {
                return this.pageType === PAGE_TYPE_HOME ? 'icon-shouqi def-icon icon-home'
                    : this.pageType === PAGE_TYPE_CATE ? 'icon-cebianlanshouqi def-icon icon-cate'
                        : this.pageType === PAGE_TYPE_SHOPCAR ? 'icon-cebianlanshouqi def-icon icon-cate' : ''
            },
            getRightIcon() {
                return this.pageType === PAGE_TYPE_HOME ? 'icon-iconfontwo def-icon icon-home'
                    : this.pageType === PAGE_TYPE_CATE ? 'icon-haofangtuoiconfont_dianpu def-icon icon-cate'
                        : this.pageType === PAGE_TYPE_SHOPCAR ? 'icon-haofangtuoiconfont_dianpu def-icon icon-cate' : ''
            },
            iptBg() {
                return this.pageType === PAGE_TYPE_HOME ? 'ipt-home'
                    : this.pageType === PAGE_TYPE_CATE ? 'ipt-cate' :
                        this.pageType === PAGE_TYPE_SHOPCAR ? 'ipt-cate' : ''
            },
            getBgColor() {
                return this.pageType === PAGE_TYPE_HOME ? 'bg_wrapper-home'
                    : this.pageType === PAGE_TYPE_CATE ? 'bg_wrapper-cate' :
                        this.pageType === PAGE_TYPE_SHOPCAR ? 'bg_wrapper-shopcar' : ''
            }
        },
        methods: {
            leftClick() {
                if (this.pageType === PAGE_TYPE_HOME) {
                    this.$router.push('/cate')
                } else {
                    this.$router.back()
                }
            },
            popClick(e) {
                let event = e || window.event;
                const id = event.target.id
                console.log('id', id)
                if (id == 0) {
                    this.$router.push('/home')
                } else if (id == 1) {
                    console.log('cate  id', id)
                    this.$router.push('/cate')
                } else if (id == 2) {
                    this.$router.push('/shopcar')
                } else if (id == 3) {
                    this.$router.push('/mine')
                }
            },
            cancelPop() {
                this.isShowPop = false
            },
            rightClick() {
                this.isShowPop = true
            }
        },
        watch: {
            bgColorPercent(newBgPercent) {
                this.$refs.searchBar.style.backgroundColor = `rgba(228, 49, 48, ${newBgPercent})`
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../styles/variables.scss';

    .bg_wrapper-home {
        background-color: rgba(228, 49, 48, 0)
    }

    .bg_wrapper-cate {
        background-color: white;
    }

    .bg_wrapper-shopcar {
        background-color: white;
    }

    #searchbar-warpper {
        height: 50px;
        line-height: 50px;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        .pop-mask {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1100;
            background: transparent;
            .m_header_nav {
                background-color: rgba(0, 0, 0, .9);
                border-radius: 4px;
                width: 125px;
                position: absolute;
                right: 10px;
                top: 53px;
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

        .ipt-warpper {
            position: relative;
            display: inline-block;
            flex-grow: 1;
            text-align: center;
            color: #333;
            font-size: 18px;
            font-weight: 700;
            .ipt-search {
                position: absolute;
                left: 0;
                top: 10px;
                height: 30px;
                border-radius: 15px;
                border: 0;
                width: 100%;
                font-size: 16px;
                box-sizing: border-box;
                padding-left: 40px;
                border: 0;
                outline: none;
                &::placeholder {
                    color: $color-text-white;
                }
                &:focus {
                    caret-color: $color-theme;
                }
            }
            .ipt-home {
                background-color: white;
            }
            .ipt-cate {
                background-color: #f1f1f1;
            }
            .ic-search {
                position: absolute;
                left: 10px;
                color: #ddd;
            }
        }
        .def-icon {
            font-weight: 600;
            font-size: 20px;
            padding-left: 10px;
            padding-right: 10px;
        }
        .icon-home {
            color: white;
        }
        .icon-cate {
            color: #ccc;
        }
    }
</style>
