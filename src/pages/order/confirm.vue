<template>
    <div class='confirm-root'>
        <scroll-view class='order-confirm'
                     ref='shopcarScroll'
                     :refreshDelay='20'
                     :data='cartPromotionItemList'
                     :probeType='3'
                     :listenScroll='true'
                     @scroll='scrollListener'>
            <div class='order-confirm-content'>
                <div class='title-bar'>
                    <i style='padding:0 10px' class='icon-cebianlanshouqi' @click='leftClick'></i>
                    <p class="ipt-warpper">确认订单</p>
                </div>
                <div class='address-wrapper'>
                    <div class='address-content'>
                        <div class='person-info'>
                            <span>{{getAddress.name}}</span>
                            <span>{{getAddress.phoneNumber}}</span>
                        </div>
                        <div class='address-def'>
                            <span>默认</span>
                            <p>{{getAddress.address}}</p>
                        </div>
                        <i class='icon-iconfontright address-icon'></i>
                    </div>
                </div>
                <div class='pro-list-wrapper'>
                    <div class='pro-list-container'>
                        <div class='pro-list-item'
                             v-for='(item,index) in cartPromotionItemList'>
                            <div class='pro-list-item-content'>
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
                            </div>
                        </div>
                    </div>
                </div>
                <div class='btn-wrapper'>
                <span class='btn-confirm-order'>
                    确认订单
                </span>
                </div>
                <div class='bottom-wrapper'>

                </div>
            </div>
        </scroll-view>
        <div class='address-root' v-if='addressFiexd'>
            <div class='address-wrapper'>
                <div class='address-content'>
                    <div class='person-info'>
                        <span>{{getAddress.name}}</span>
                        <span>{{getAddress.phoneNumber}}</span>
                    </div>
                    <div class='address-def'>
                        <span>默认</span>
                        <p>{{getAddress.address}}</p>
                    </div>
                    <i class='icon-iconfontright address-icon'></i>
                </div>
            </div>
        </div>
    </div>
</template>
<!--city: "深圳市"-->
<!--defaultStatus: 0-->
<!--detailAddress: "科兴科学园"-->
<!--id: 1-->
<!--memberId: 1-->
<!--name: "大梨"-->
<!--phoneNumber: "18033441849"-->
<!--postCode: "518000"-->
<!--province: "广东省"-->
<!--region: "南山区"-->
<script>
    import ScrollView from '../../components/ScrollView';
    import OrderCarAip from '../../request/order';
    import CountView from '../../components/CountView';

    export default {
        name: "confirm",
        components: {
            ScrollView,
            CountView
        },
        computed: {
            getAddress() {
                const address = this.memberReceiveAddressList && this.memberReceiveAddressList[0]
                console.log('address', address)
                return {
                    name: address ? address.name : "",
                    phoneNumber: address ? address.phoneNumber : "",
                    address: address ? `${address.province + address.city + address.region + address.detailAddress}` : ""
                }
            }
        },
        data() {
            return {
                memberReceiveAddressList: [],
                cartPromotionItemList: [],
                calcAmount: null,
                addressFiexd: false
            }
        },
        created() {
            console.log('this.$route.query.cartIds', this.$route.query.cartIds)
            if (!this.$route.query.cartIds) {
                this.$router.back()
                return
            }
            this._generateConfirmOrder(this.$route.query.cartIds)
        },
        methods: {
            _generateConfirmOrder(ids) {
                OrderCarAip.generateConfirmOrder(ids).then(res => {
                    this.memberReceiveAddressList = res.memberReceiveAddressList
                    this.cartPromotionItemList = res.cartPromotionItemList
                })
            },
            leftClick() {
                this.$router.back()
            },
            countChange() {

            },
            scrollListener(pos) {
                console.log(pos)
                const y = pos.y
                if (y < -40) {
                    this.addressFiexd = true
                } else {
                    this.addressFiexd = false
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../styles/variables";

    .confirm-root {
        .address-root {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            .address-wrapper {
                padding-bottom: 16px;
                background: #fff url("../../assets/images/bg-address.png") -7px bottom repeat-x;
                background-size: 64px 5px;
                .address-content {
                    padding: 10px 15px;
                    font-size: 16px;
                    box-sizing: border-box;
                    position: relative;
                    .person-info {
                        font-weight: 700;
                        color: black;
                    }
                    .address-def {
                        color: $color-text-thin;
                        margin-top: 10px;
                        box-sizing: border-box;
                        padding-right: 20px;
                        span {
                            &:first-child {
                                border: 1px solid $color-theme-light;
                                color: $color-theme-light;
                                font-size: 12px;
                                padding: 0 1px;
                                font-weight: 600;
                                border-radius: 2px;
                                position: absolute;
                            }

                        }
                        p {
                            line-height: 20px;
                            white-space: pre-wrap;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            text-indent: 2em;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }

                    }
                    .address-icon {
                        position: absolute;
                        right: 15px;
                        top: 50%;
                        font-size: 14px;
                        font-weight: 700;
                        color: #ddd;
                    }
                }
            }

        }
        .order-confirm {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .order-confirm-content {
                width: 100%;
                height: 100%;
                display: inline-block;
                flex-direction: column;
                .title-bar {
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 16px;
                    background-color: white;
                    border-bottom: 1px solid #ddd;
                    i {
                        float: left;
                    }
                }
                .address-wrapper {
                    padding-bottom: 16px;
                    background: #fff url("../../assets/images/bg-address.png") -7px bottom repeat-x;
                    background-size: 64px 5px;
                    .address-content {
                        padding: 10px 15px;
                        font-size: 16px;
                        box-sizing: border-box;
                        position: relative;
                        .person-info {
                            font-weight: 700;
                            color: black;
                        }
                        .address-def {
                            color: $color-text-thin;
                            margin-top: 10px;
                            box-sizing: border-box;
                            padding-right: 20px;
                            span {
                                &:first-child {
                                    border: 1px solid $color-theme-light;
                                    color: $color-theme-light;
                                    font-size: 12px;
                                    padding: 0 1px;
                                    font-weight: 600;
                                    border-radius: 2px;
                                    position: absolute;
                                }

                            }
                            p {
                                line-height: 20px;
                                white-space: pre-wrap;
                                word-break: break-all;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                text-indent: 2em;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }

                        }
                        .address-icon {
                            position: absolute;
                            right: 15px;
                            top: 50%;
                            font-size: 14px;
                            font-weight: 700;
                            color: #ddd;
                        }
                    }
                }
                .pro-list-wrapper {
                    min-height: 60vh;
                    flex-grow: 1;
                    .pro-list-container {
                        background-color: white;
                        margin-top: 10px;
                        border-radius: 15px;
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
                            }

                        }
                    }
                }
                .btn-wrapper {
                    .btn-confirm-order {
                        line-height: 40px;
                        height: 40px;
                        border-radius: 20px;
                        width: 100%;
                        display: block;
                        text-align: center;
                        box-sizing: border-box;
                        color: white;
                        font-size: 18px;
                        margin-top: 30px;
                        font-weight: 700;
                        background-image: -webkit-gradient(linear, left top, right top, from(#f10000), color-stop(73%, #ff2000), to(#ff4f18));
                        background-image: -webkit-linear-gradient(left, #f10000, #ff2000 73%, #ff4f18);
                        background-image: -o-linear-gradient(left, #f10000, #ff2000 73%, #ff4f18);
                        background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
                    }
                }
                .bottom-wrapper {
                    height: 200px;
                    background: url("../../assets/images/jd-logo.png") center no-repeat;
                }
            }
        }
    }

</style>
