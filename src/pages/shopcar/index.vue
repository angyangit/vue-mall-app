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
                    >
                        <div class='address-edit-pro'>
                            <div>
                                <span class='icon-wrapper' v-show='!isEditProduct'>
                                <i class='icon-iconfontdizhi1'></i>地址</span>
                            </div>
                            <span class='edit-pro' @click.stop='editPro'>{{isEditProduct?'完成':'编辑商品'}}</span>
                        </div>
                        <div class='pro-list-wrapper'>
                            <div class='list-top'>
                                <i class='check-icon' @click.stop='selectAll'
                                   :class='{"select-check":isSelectCheckAll}'></i>
                                <span class='jd-zy'>京东自营</span>
                                <span class='discount'>优惠券</span>
                            </div>
                            <div class='pro-list-item'
                                 v-for='(item,index) in shopcarList'>
                                <div class='pro-list-item-content'>
                                    <div class='check-wrapper' @click='itemSelect(item)'>
                                        <i class='check-icon'
                                           :class='{"select-check":isSelectCheck(item.id)}'></i>
                                    </div>
                                    <img class='pro-img' v-lazy='item.productPic' alt=''>
                                    <div class='pro-info'>
                                        <p class='title'>{{item.productSubTitle}}</p>
                                        <div class='price-count'>
                                            <p class="price">
                                                ¥<em class='large_size'>{{item.price}}</em><span
                                                    class="price_decimals">.00</span>
                                            </p>
                                            <count-view
                                                    :innerCount='item.quantity'
                                                    :listIndex='index'
                                                    @countChange='countChange'
                                            ></count-view>
                                        </div>
                                    </div>
                                </div>
                                <div class='attation-del'>
                                    <div class='attation-del-content'>
                                        <span>移入关注</span>
                                        <span @click.stop='deleteItem(item.id)'>删除</span>
                                    </div>
                                </div>
                            </div>
                        </div>

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
        <div class='cart-bottom'>
            <div class='check-wrapper'>
                <i class='check-icon' @click.stop='selectAll'
                   :class='{"select-check":isSelectCheckAll}'></i>
                全选
            </div>
            <div class='right' v-if='!isEditProduct'>
                <div class='total-price-wrapper'>
                    <span>总计:</span>
                    <span>￥{{getTotalPrice}}</span>
                </div>
                <span class='btn-pay' @click.stop='confirmOrder'>
                去结算({{getCountTotal}}件)
                </span>
            </div>
            <div class='right-edit' v-else>
                <span>
                移至收藏
                </span>
                <span @click.stop='delItemList'>
                删除
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollView from '../../components/ScrollView';
    import Searchbar from '../../components/SearchBar';
    import EmptyView from '../../components/EmptyView';
    import ShopCarAip from '../../request/shopcar';
    import {mapGetters} from 'vuex'
    import CountView from '../../components/CountView';

    export default {
        name: 'shopcar',
        components: {
            Searchbar,
            ScrollView,
            EmptyView,
            CountView
        },
        computed: {
            getTotalPrice() {
                let totalPrice = 0
                if (this.selectList.length > 0) {
                    this.selectList.forEach(item => {
                        console.log('item.price', item.price, item.quantity)
                        totalPrice += Number.parseFloat(item.price ? item.price : 0) * Number.parseFloat(item.quantity)
                    })
                }
                return totalPrice
            },
            getCountTotal() {
                let countTotal = 0
                if (this.selectList.length > 0) {
                    this.selectList.forEach(item => {
                        console.log('item.price', item.price, item.quantity)
                        countTotal += Number.parseFloat(item.quantity ? item.quantity : 0)
                    })
                }
                return countTotal
            },
            isSelectCheckAll() {
                return this.selectList.length > 0 && this.selectList.length === this.shopcarList.length
            },
            ...mapGetters(['toLoginPage'])
        },
        data() {
            return {
                shopcarList: [],
                selectList: [],
                isRequest: false,
                isEditProduct: false
            }
        },
        created() {
            console.log('car  created')
            this._getCartList()
        },
        activated() {
            console.log('car  activated')
            this._getCartList()
        },
        methods: {
            _getCartList() {
                this.shopcarList = []
                ShopCarAip.getCartList().then(res => {
                    console.log('getCartList', res)
                    this.isRequest = true
                    this.shopcarList = res
                })
            },
            countChange(count, index) {
                console.log('countChange', count, index)
                ShopCarAip.shopCarUpdateQuantity({
                    'id': this.shopcarList[index].id,
                    'quantity': count
                }).then(res => {
                    console.log(res)
                    this.shopcarList[index].quantity = count
                })
            },
            deleteItem(id) {
                ShopCarAip.deleteCartItems([id]).then(res => {
                    console.log(res)
                    this._getCartList();
                })
            },
            delItemList() {
                if (this.selectList.length === 0) {
                    return
                }
                let ids = this.selectList.map(item => {
                    return item.id
                })
                ShopCarAip.deleteCartItems(ids).then(res => {
                    console.log(res)
                    this.selectList = []
                    this._getCartList();
                })
            },
            itemSelect(selItem) {
                const index = this.selectList.findIndex(item => {
                    return selItem.id === item.id
                })
                if (index === -1) {
                    this.selectList.push(selItem)
                } else {
                    this.selectList.splice(index, 1)
                }
                console.log(this.selectList)
            },
            isSelectCheck(id) {
                console.log('isSelectCheck', id, this.selectList,)
                return this.selectList.findIndex(item => {
                    return id === item.id
                }) !== -1
            },
            selectAll() {
                console.log(this.selectList.length, this.shopcarList.length)
                if (this.selectList.length !== this.shopcarList.length) {
                    this.selectList = []
                    this.shopcarList.forEach(item => {
                        this.selectList.push(item)
                    })
                } else {
                    this.selectList = []
                }
            },
            editPro() {
                this.isEditProduct = !this.isEditProduct
            },
            confirmOrder() {
                const cartIds = this.selectList.map(item => {
                    return item.id
                })
                if (!cartIds || cartIds.length === 0) {
                    return
                }
                this.$router.push({path: '/order/confirm', query: {cartIds}})
            }

        },
        watch: {
            toLoginPage(newToLoginPage) {
                console.log('newToLoginPage', this.isRequest, newToLoginPage)
                if (!this.isRequest && !newToLoginPage) {
                    this._getCartList()
                }
            }
        }
    }
    // createDate: (...)
    // deleteStatus: (...)
    // id: (...)
    // memberId: (...)
    // memberNickname: (...)
    // price: (...)
    // productAttr: (...)
    // productBrand: (...)
    // productCategoryId: (...)
    // productId: (...)
    // productName: (...)
    // productPic: (...)
    // productSkuCode: (...)
    // productSkuId: (...)
    // productSubTitle: (...)
    // quantity: (...)
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
            bottom: 50px;
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
                        .address-edit-pro {
                            padding: 0 15px;
                            background-color: white;
                            border-bottom-left-radius: 15px;
                            border-bottom-right-radius: 15px;
                            font-size: 14PX;
                            line-height: 40px;
                            display: flex;
                            justify-content: space-between;
                            font-size: 16PX;
                            .icon-wrapper {
                                font-size: 16PX;
                                i {
                                    font-size: 16px;
                                    color: $color-text;
                                    padding-right: 10px;
                                }
                            }
                            .edit-pro {
                                &:before {
                                    content: '';
                                    margin-right: 20px;
                                    border-left: 3px solid #ddd;
                                }
                            }

                        }
                        .pro-list-wrapper {
                            border-radius: 15px;
                            background-color: white;
                            .list-top {
                                height: 40px;
                                margin-top: 10px;
                                position: relative;
                                font-size: 14PX;
                                .check-icon {
                                    &:after {
                                        position: absolute;
                                        left: 5px;
                                        top: 5px;
                                        content: "";
                                        background-image: url('../../assets/images/check-def.png');
                                        background-size: 30px 30px;
                                        width: 30px;
                                        height: 30px;
                                        border-radius: 50%;
                                    }
                                }
                                .select-check {
                                    &:after {
                                        position: absolute;
                                        top: 50%;
                                        left: 5px;
                                        transform: translateY(-50%);
                                        content: "";
                                        background-image: url('../../assets/images/check-sel.png');
                                        background-size: 30px 30px;
                                        width: 30px;
                                        height: 30px;
                                        border-radius: 50%;
                                    }
                                }
                                .jd-zy {
                                    font-weight: 700;
                                    padding-left: 50px;
                                    line-height: 40px;
                                }
                                .discount {
                                    margin: 10px 15px 0 0;
                                    float: right;
                                    line-height: 20px;
                                    padding: 0 4px;
                                    font-size: 12PX;
                                    border-radius: 10px;
                                    color: $color-theme-light;
                                    background-color: #fcedeb;
                                }
                            }
                        }
                        .pro-list-item {
                            border-bottom: 1px solid #ddd;
                            &:last-child {
                                border: 0;
                            }
                            .pro-list-item-content {
                                padding: 15px 0;
                                display: flex;
                                box-sizing: border-box;
                                font-size: 16PX;
                                .check-wrapper {
                                    position: relative;
                                    width: 40px;
                                    flex-shrink: 0;
                                    .check-icon {
                                        &:after {
                                            position: absolute;
                                            top: 50%;
                                            left: 5px;
                                            transform: translateY(-50%);
                                            content: "";
                                            background-image: url('../../assets/images/check-def.png');
                                            background-size: 30px 30px;
                                            width: 30px;
                                            height: 30px;
                                            border-radius: 50%;


                                        }
                                    }
                                    .select-check {
                                        &:after {
                                            position: absolute;
                                            top: 50%;
                                            left: 5px;
                                            transform: translateY(-50%);
                                            content: "";
                                            background-image: url('../../assets/images/check-sel.png');
                                            background-size: 30px 30px;
                                            width: 30px;
                                            height: 30px;
                                            border-radius: 50%;
                                        }
                                    }
                                }
                                .pro-img {
                                    flex-shrink: 0;
                                    width: 120px;
                                    height: 120px;
                                }
                                .pro-info {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    padding: 10px 10px;
                                    flex-grow: 1;
                                    .title {
                                        box-sizing: border-box;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 2;
                                        -webkit-box-orient: vertical;
                                        word-break: break-all;
                                        line-height: 22px;
                                    }

                                    .price-count {
                                        line-height: 40px;
                                        justify-content: space-between;
                                        display: flex;
                                        .price {
                                            color: $color-theme-light;
                                            font-size: 16PX;
                                            font-weight: 700;
                                            display: inline-block;
                                            .large_size {
                                                font-size: 20PX;
                                            }
                                            .price_decimals {
                                                font-size: 16px;
                                            }
                                        }
                                    }
                                }
                            }
                            .attation-del {
                                height: 30px;
                                font-size: 14PX;
                                padding-right: 15px;
                                .attation-del-content {
                                    float: right;
                                    span {
                                        padding: 0 10px;
                                        &:last-child {
                                            border-left: 1px solid #ddd;
                                        }
                                    }

                                }
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
        .cart-bottom {
            background-color: white;
            line-height: 50px;
            width: 100%;
            height: 50px;
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: space-between;
            .check-wrapper {
                padding-left: 40px;
                font-size: 14PX;
                .check-icon {
                    &:after {
                        position: absolute;
                        left: 5px;
                        top: 10px;
                        content: "";
                        background-image: url('../../assets/images/check-def.png');
                        background-size: 30px 30px;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }
                .select-check {
                    &:after {
                        position: absolute;
                        top: 50%;
                        left: 5px;
                        transform: translateY(-50%);
                        content: "";
                        background-image: url('../../assets/images/check-sel.png');
                        background-size: 30px 30px;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }

            }
            .right {
                display: flex;
                font-size: 16PX;
                padding-right: 15px;
                .total-price-wrapper {
                    padding-right: 10px;
                    span {
                        &:first-child {
                            color: $color-text;
                        }
                        &:last-child {
                            color: black;
                            font-weight: 700;
                        }
                    }
                }
                .btn-pay {
                    line-height: 40px;
                    height: 40px;
                    margin-top: 5px;
                    border-radius: 20px;
                    padding: 0 10px;
                    color: white;
                    font-weight: 700;
                    background-image: -webkit-gradient(linear, left top, right top, from(#f10000), color-stop(73%, #ff2000), to(#ff4f18));
                    background-image: -webkit-linear-gradient(left, #f10000, #ff2000 73%, #ff4f18);
                    background-image: -o-linear-gradient(left, #f10000, #ff2000 73%, #ff4f18);
                    background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
                }
            }
            .right-edit {
                display: flex;
                font-size: 16PX;
                padding-right: 15px;
                span {
                    line-height: 30px;
                    height: 30px;
                    margin-top: 10px;
                    border-radius: 15px;
                    padding: 0 10px;
                    color: #666;
                    font-size: 16PX;
                    margin-right: 10px;
                    border: 1px solid #999;
                }
            }

        }
    }
</style>
