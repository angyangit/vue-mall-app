<template>
    <div class="mine-warrper">
        <scroll-view class='mine-scroll'
                     :refreshDelay='20'
                     :data='getData'>
            <div class='mine-content'>
                <div class='mine-header'>
                    <div class='header-top'>
                        <img :src='require("../../assets/images/avatar-def.png")'>
                        <div class='user-info'>
                            <span class='uname'>{{memberInfo?memberInfo.nickname:''}}</span>
                            <div class='j-wraper'>
                                <span>京享值</span>
                                <span>查看小白信用</span>
                            </div>
                        </div>
                        <div class='user-setting'>
                            <i class='icon-iconfonticon-yonghu setting-icon'></i>
                        </div>
                    </div>
                    <div class='header-middle'>
                        <div class='pro-collect'>
                            <span>33</span>
                            <span>商品收藏</span>
                        </div>
                        <div class='store-collect'>
                            <span>20</span>
                            <span>店铺收藏</span>
                        </div>
                        <div class='foot-collect'>
                            <span>19</span>
                            <span>我的足迹</span>
                        </div>
                    </div>
                    <div class="plus_black_wrap">
                        <div class="inner">
                            <div class="title">
                                <div class="plus_title">您有5张运费券待使用</div>
                                <div class="plus_subtitle">立即查看</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='order-wrapper'>
                    <div class='wait-pay'>
                        <i class='icon-haofangtuoiconfont_dianpu'></i>
                        <span>待付款</span>
                    </div>
                    <div class='wait-gathering'>
                        <i class='icon-iconfontqiandao'></i>
                        <span>待收款</span>
                    </div>
                    <div class='sale-serve'>
                        <i class='icon-iconfontpingjia'></i>
                        <span>退换/售后</span>
                    </div>
                    <div class='order-all'>
                        <i class='icon-iconfontform'></i>
                        <span>全部订单</span>
                    </div>
                </div>
                <div class="my_cell">
                    <div class="assets_item">
                        <div class="assets_item_val">
                            <div class="assets_val">6
                                <span class="dot dot_spe"></span>
                            </div>
                        </div>
                        <span class="assets_item_key">优惠券</span>
                    </div>
                    <div class="assets_item">
                        <div class="assets_item_val">
                            <span class="assets_val">2万+</span>
                        </div>
                        <span class="assets_item_key">白条额度</span></div>
                    <div class="assets_item">
                        <div class="assets_item_val">
                            <span class="assets_val">2万+</span>
                        </div>
                        <span class="assets_item_key">京豆</span></div>
                    <div class="assets_item">
                        <div class="assets_item_val">
                            <span class="assets_val">0</span>
                        </div>
                        <span class="assets_item_key">红包</span>
                    </div>
                    <div class="assets_item assets-all">
                        <i class="icon-iconfont02fuzhi"></i>
                        <span class="assets_item_key">我的资产</span></div>
                </div>
                <div class="serve-wrap">
                    <div class="activity-title">工具与服务</div>
                    <div class="serve_container" style="height: 148px;">
                        <div data-idx="0" class="serve_item">
                            <div class="tools_icon1">
                            </div>
                            <span class="tools_item_key">客户服务</span></div>
                        <div data-idx="1" class="serve_item">
                            <div class="tools_icon2"
                            ></div>
                            <span class="tools_item_key">我的预约</span></div>
                        <div data-idx="2" class="serve_item">
                            <div class="tools_icon3"
                            ></div>
                            <span class="tools_item_key">我的问答</span></div>
                        <div data-idx="3" class="serve_item">
                            <div class="tools_icon4"
                            ></div>
                            <span class="tools_item_key">高价回收</span></div>
                        <div data-idx="4" class="serve_item">
                            <div class="tools_icon5"
                            ></div>
                            <span class="tools_item_key">闲置换钱</span></div>
                        <div data-idx="5" class="serve_item">
                            <div class="tools_icon6"
                            ></div>
                            <span class="tools_item_key">定期购</span></div> <!----></div>
                </div>
                <div class='recommend'>
                    <div class="recommend_title">
                        <span class="recommend_title_text">为您推荐</span>
                    </div>
                    <div class='recommend-list'>
                        <goods-list-view :multipleShow='multipleShow' :goodsList='recommendList'></goods-list-view>
                    </div>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<!--{-->
<!--"id": 1,-->
<!--"memberLevelId": 4,-->
<!--"username": "test",-->
<!--"password": "$2a$10$NZ5o7r2E.ayT2ZoxgjlI.eJ6OEYqjH7INR/F.mXDbjZJi9HF0YCVG",-->
<!--"nickname": "windir",-->
<!--"phone": "18061581849",-->
<!--"status": 1,-->
<!--"createTime": "2018-08-02T02:35:44.000+00:00",-->
<!--"gender": 1,-->
<!--"birthday": "2009-05-31T16:00:00.000+00:00",-->
<!--"city": "上海",-->
<!--"job": "学生",-->
<!--"personalizedSignature": "test",-->
<!--"integration": 5000-->
<!--}-->
<script>
    import ScrollView from '../../components/ScrollView';
    import GoodsListView from '../../components/GoodsListView';
    import {mapGetters} from 'vuex'
    import HomeAip from '../../request/home';

    export default {
        name: 'mine',
        components: {
            ScrollView,
            GoodsListView
        },
        data() {
            return {
                multipleShow: true,
                recommendList: []
            }
        },
        created() {
            this._recommendProductList()
        },
        computed: {
            getData() {
                return this.recommendList
            },
            ...mapGetters(['memberInfo'])
        },
        methods: {
            _recommendProductList() {
                const params = {
                    pageSize: 20,
                    pageNum: 1
                }
                HomeAip.recommendProductList(params).then(res => {
                    this.recommendList = this.recommendList.concat(res)
                    console.log('this.recommendList', this.recommendList)
                }).catch(err => {
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables";

    .mine-warrper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        box-sizing: border-box;
        overflow: hidden;
        .mine-scroll {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            .mine-content {
                .mine-header {
                    padding: 10px;
                    box-sizing: border-box;
                    background: url('../../assets/images/bg_mine.png') no-repeat 0 0/cover;
                    .header-top {
                        display: flex;
                        height: 50px;
                        img {
                            width: 50px;
                            height: 50px;
                            flex-shrink: 0;
                        }
                        .user-info {
                            padding-left: 20px;
                            flex-grow: 1;
                            display: flex;
                            justify-content: space-around;
                            flex-direction: column;
                            .uname {
                                font-size: 18px;
                                font-weight: 700;
                            }
                            .j-wraper {
                                span {
                                    color: black;
                                    font-size: 12PX;
                                    border-radius: 10px;
                                    padding: 3px 6px;
                                    background-color: #f0f0f0;
                                }
                            }
                        }
                        .user-setting {
                            .setting-icon {
                                display: inline-block;
                                line-height: 50px;
                                height: 50px;
                            }
                        }
                    }
                    .header-middle {
                        display: flex;
                        justify-content: center;
                        font-size: 12PX;
                        height: 40px;
                        margin-top: 10px;
                        align-items: center;
                        .pro-collect, .store-collect, .foot-collect {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            height: 100%;
                            flex-direction: column;
                            span:first-child {
                                font-weight: 700;
                                font-size: 16PX;
                            }
                        }
                    }
                    .plus_black_wrap {
                        height: 42px;
                        line-height: 42px;
                        margin-top: 20px;
                        .inner {
                            display: flex;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            padding: 0 10px;
                            background: url('../../assets/images/mine-discount.png') no-repeat 0 0;
                            background-size: cover;
                            .title {
                                display: flex;
                                font-size: 12PX;
                                font-weight: 700;
                                position: relative;
                                line-height: 42px;
                                padding-left: 65px;
                                color: #ffe678;
                                &:before {
                                    position: absolute;
                                    content: "";
                                    width: 57px;
                                    height: 12px;
                                    left: 0;
                                    top: 15px;
                                    background: url('../../assets/images/plus.png') no-repeat 50%;
                                    background-size: 100% 100%;
                                }
                                .plus_title {
                                }
                                .plus_subtitle {
                                }
                            }
                        }
                    }
                }
                .order-wrapper {
                    margin-top: -10px;
                    background-color: white;
                    border-radius: 15px;
                    padding: 10px 0;
                    display: flex;
                    justify-content: center;
                    font-size: 12PX;
                    height: 72px;
                    .wait-pay, .wait-gathering, .sale-serve {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: space-around;
                        padding: 10px 0;
                    }
                    .wait-gathering {
                    }
                    .sale-serve {
                    }
                    .order-all {
                        flex: 1;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        flex-direction: column;
                        i {
                            color: $color-theme-light;
                            font-size: 26px;
                        }
                        &:before {
                            position: absolute;
                            z-index: 1;
                            top: 0;
                            left: -5px;
                            width: 10px;
                            height: 72px;
                            background: url('../../assets/images/order-all-bg.png');
                            background-size: 10px;
                            content: "";
                        }
                    }
                }
                .my_cell {
                    margin-top: 10px;
                    background-color: white;
                    border-radius: 15px;
                    display: flex;
                    justify-content: center;
                    font-size: 12PX;
                    height: 72px;
                    .assets_item {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        flex-direction: column;
                        justify-content: space-around;
                        .assets_item_key {
                            font-size: 12PX;
                            color: #262626;
                            white-space: nowrap;
                        }
                        .assets_item_val {
                            font-size: 22PX;
                            color: #262626;
                            font-weight: 700;
                            white-space: nowrap;
                        }
                    }
                    .dot dot_spe {
                    }
                    .assets-all {
                        position: relative;
                        flex: 1.2;
                        padding: 5px 0;
                        &:before {
                            position: absolute;
                            z-index: 1;
                            top: 0;
                            left: -5px;
                            width: 10px;
                            height: 72px;
                            background: url('../../assets/images/order-all-bg.png');
                            background-size: 10px;
                            content: "";
                        }
                        i {
                            font-size: 26px;
                            color: $color-theme-light;
                        }
                    }
                }
                .serve-wrap {
                    margin-top: 10px;
                    background-color: white;
                    border-radius: 15px;
                    box-sizing: border-box;
                    .activity-title {
                        font-size: 16PX;
                        font-weight: 700;
                        padding-left: 10px;
                        line-height: 40px;
                        border-bottom: 1px solid #eee;
                    }
                    .serve_container {
                        font-size: 12PX;
                        font-weight: 500;
                        display: flex;
                        flex-wrap: wrap;
                        padding: 10px 0;
                        align-items: center;
                        .serve_item {
                            flex-shrink: 0;
                            width: 25%;
                            justify-content: center;
                            text-align: center;
                            .tools_icon1 {
                                width: 40px;
                                height: 40px;
                                margin: 0 auto;
                                text-align: center;
                                background: url("../../assets/images/custom-serve.png") 0px 0px / 100% 100% no-repeat;
                            }
                            .tools_icon2 {
                                width: 40px;
                                height: 40px;
                                margin: 0 auto;
                                background: url("../../assets/images/my_appointment_serve.png") 0px 0px / 100% 100% no-repeat;
                            }
                            .tools_icon3 {
                                width: 40px;
                                height: 40px;
                                margin: 0 auto;

                                background: url("../../assets/images/my_answers_serve.png") 0px 0px / 100% 100% no-repeat;
                            }
                            .tools_icon4 {
                                width: 40px;
                                height: 40px;
                                margin: 0 auto;

                                background: url("../../assets/images/resev_serve.png") 0px 0px / 100% 100% no-repeat;
                            }
                            .tools_icon5 {
                                width: 40px;
                                height: 40px;
                                margin: 0 auto;

                                background: url("../../assets/images/pay_serve.png") 0px 0px / 100% 100% no-repeat;
                            }
                            .tools_icon6 {
                                width: 40px;
                                height: 40px;
                                margin: 0 auto;
                                background: url("../../assets/images/my_appointment_serve.png") 0px 0px / 100% 100% no-repeat;
                            }
                            .tools_item_key {
                                line-height: 40px;
                            }
                        }
                    }
                }
                .recommend {
                    .recommend_title {
                        position: relative;
                        margin: 15px 0;
                        height: 1px;
                        line-height: 1px;
                        text-align: center;
                        font-size: 12px;
                        color: #999;
                        top: 0;
                        background-color: #ccc;
                        .recommend_title_text {
                            z-index: 2;
                            position: relative;
                            padding: 0 10px;
                            background-color: #f1f1f1;
                            &:before {
                                content: "";
                                position: absolute;
                                top: 50%;
                                margin-top: -2px;
                                left: -5px;
                                width: 6px;
                                height: 6px;
                                border-radius: 50%;
                                background-color: #ccc;
                            }
                            &:after {
                                content: "";
                                position: absolute;
                                top: 50%;
                                margin-top: -2px;
                                right: -5px;
                                width: 6px;
                                height: 6px;
                                border-radius: 50%;
                                background-color: #ccc;

                            }

                        }
                    }
                    .recommend-list {
                    }
                }

            }
        }
    }
</style>
