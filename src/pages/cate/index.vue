<template>
    <div id="cate-warrper">
        <searchbar pageType='cate'></searchbar>
        <div class='cate-content'>
            <div class='cate-menu'>
                <scroll-view
                        class="menu-srcoll"
                        ref='cateMenuScroll'
                        :refreshDelay='20'
                        :data='cateListNode'>
                    <div class='cate-menu-content'>
                        <a class='menu-item'
                           href='javascript:void(0)'
                           v-for='(itme,index) in cateListNode'
                           :key='itme.id'
                           ref='menuGroup'
                           :class='{"menu-active":selectMenuIndex===index}'
                           @click='selectMenu(itme,index)'>
                            {{itme.name}}
                        </a>
                    </div>
                </scroll-view>
            </div>
            <div class='cate-page'>
                <scroll-view
                        class="page-srcoll"
                        ref='pageScroll'
                        v-if='productList.length>0'
                        :refreshDelay='20'
                        :data='productList'>
                    <div class='page-content clearfix'
                         v-for='(itme,index) in cateListNode'
                         v-show='selectMenuIndex===index'
                    >
                        <div class='page-item'
                             href='javascript:void(0)'
                             v-for='(itme,index) in productList'
                             :key='index'
                             @click='selectProduct(itme,index)'>
                            <img class='pro-img' v-lazy='itme.pic'>
                            <p class='pro-name'>{{itme.name}}</p>
                        </div>
                    </div>
                </scroll-view>
                <div class='empty-root' v-else>
                    <empty-view></empty-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollView from '../../components/ScrollView';
    import Searchbar from '../../components/SearchBar';
    import CateAip from '../../request/cate'
    import ProductApi from '../../request/product'
    import EmptyView from '../../components/EmptyView';

    export default {
        name: 'cate',
        components: {
            Searchbar,
            ScrollView,
            EmptyView
        },
        data() {
            return {
                cateListNode: [],
                selectMenuIndex: 0,
                productList: [],
                pageNum: 1,
                pageSize: 10,
                productCategoryId: 0,
                totalPage: 0
            }
        },
        created() {
            this._cateList()
        },
        methods: {
            selectMenu(itme, index) {
                this.selectMenuIndex = index
                this.$refs.cateMenuScroll.scrollToElement(this.$refs.menuGroup[index], 100)
                this.productCategoryId = itme.id
                this._productSearch()
            },
            selectProduct(itme, index) {
            },
            _cateList() {
                CateAip.cateList().then(res => {
                    this.cateListNode = this.handlerCateNode(res)
                    this.productCategoryId = this.cateListNode.length > 0 ? this.cateListNode[0].id : 0
                    this._productSearch()
                })
            },
            _productSearch() {
                this.totalPage = 0
                this.productList = []
                if (this.productCategoryId <= 0) return
                const productSearchOption = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    productCategoryId: this.productCategoryId
                }
                ProductApi.productSearch(productSearchOption).then(res => {
                    this.productList = res.list
                    this.totalPage = res.totalPage
                    console.log('productSearch', res)
                })
            },
            handlerCateNode(cateNode) {
                let node = []
                cateNode.forEach(item => {
                    console.log('item==', item)
                    if (item && item.children && item.children.length > 0) {
                        node = node.concat(item.children)
                    }
                })
                return node
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables";

    #cate-warrper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        background-color: white;
        .cate-content {
            position: absolute;
            top: 50px;
            bottom: 0;
            display: flex;
            border-top: 1px solid #ddd;
            width: 100%;
            .cate-menu {
                flex: 0 0 80px;
                width: 80px;
                height: 100%;
                background-color: #f8f8f8;
                .menu-srcoll {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    .cate-menu-content {
                        .menu-item {
                            display: block;
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            text-decoration: none;
                            font-size: 13px;
                            color: #080808;
                            overflow: hidden;
                            text-align: center;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            box-sizing: border-box;
                        }
                        .menu-active {
                            background-color: white;
                            font-size: 14px;
                            font-weight: 700;
                            color: $color-theme-light;
                            border-right: 3px solid $color-theme-light;
                        }
                    }
                }
            }
            .cate-page {
                height: 100%;
                flex-grow: 1;
                .page-srcoll {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    .page-content {
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
                }
            }
        }
    }
</style>
