<template>
    <div class='goods-list-wrapper' v-if='goodsList.length>0'>
        <template v-if='multipleShow'>
            <div class='multiple-wrapper clearfix'>
                <div class='multiple-container'
                     v-for='item in goodsList'
                     @click='selectProduct(item.id,item.productCategoryId)'
                >
                    <div class='multiple-content'>
                        <img class='multiple-img' v-lazy='item.pic'>
                        <p class='multiple-name'>{{item.name}}</p>
                        <p class='multiple-price-wrapper'>
                            <span class='multiple-price'>{{item.price}}</span>
                            <span class='multiple-tip'>
                            {{item.recommandStatus===1?'推荐':'闪购'}}
                        </span>
                            <span class='multiple-like'>看相似</span>
                        </p>
                        <p class='multiple-ori-price'>
                            <del>{{item.originalPrice}}</del>
                        </p>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class='single-wrapper'
                 v-for='item in goodsList'
                 @click='selectProduct(item.id)'
            >
                <div class='single-content'>
                    <img class='single-img' v-lazy='item.pic'>
                    <div class='single-info'>
                        <p class='single-name'>{{item.name}}</p>
                        <p class='single-price-wrapper'>
                            <span class='single-price'>{{item.price}}</span>
                            <span class='single-tip'>
                            {{item.recommandStatus===1?'推荐':'闪购'}}
                        </span>
                            <span class='single-like'>看相似</span>
                        </p>
                        <p class='single-ori-price'>
                            <del>{{item.originalPrice}}</del>
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<!--albumPics: ""-->
<!--brandId: 6-->
<!--brandName: "小米"-->
<!--deleteStatus: 0-->
<!--description: "小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待"-->
<!--detailTitle: ""-->
<!--feightTemplateId: 0-->
<!--giftGrowth: 2699-->
<!--giftPoint: 2699-->
<!--id: 27-->
<!--keywords: ""-->
<!--lowStock: 0-->
<!--name: "小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待"-->
<!--newStatus: 1-->
<!--note: ""-->
<!--originalPrice: 2699-->
<!--pic: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg"-->
<!--previewStatus: 0-->
<!--price: 2699-->
<!--productAttributeCategoryId: 3-->
<!--productCategoryId: 19-->
<!--productCategoryName: "手机数码"-->
<!--productSn: "7437788"-->
<!--promotionPerLimit: 0-->
<!--promotionType: 3-->
<!--publishStatus: 1-->
<!--recommandStatus: 1-->
<!--sale: 0-->
<!--serviceIds: ""-->
<!--sort: 0-->
<!--stock: 100-->
<!--subTitle: "骁龙845处理器，红外人脸解锁，AI变焦双摄，AI语音助手小米6X低至1299，点击抢购"-->
<!--unit: ""-->
<!--usePointLimit: 0-->
<!--verifyStatus: 0-->
<!--weight: 0-->
<script>
    export default {
        name: "GoodsListView",
        props: {
            goodsList: {
                type: Array,
                default: []
            },
            multipleShow: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            selectProduct(id,productCategoryId) {
                this.$router.push({path:`/product/${id}`,query:{productCategoryId}})
            }
        }
    }
</script>

<style scoped lang='scss'>
    .goods-list-wrapper {
        .multiple-wrapper {
            padding: 0 10px;
            .multiple-container {
                float: left;
                width: 50%;
                box-sizing: border-box;
                padding-bottom: 10px;
                position: relative;
                &:nth-child(odd) {
                    padding-right: 5px;
                }
                &:nth-child(2n) {
                    padding-left: 5px;
                }
                .multiple-content {
                    border-radius: 10px;
                    background: white;
                    overflow: hidden;
                    box-sizing: border-box;
                    .multiple-img {
                        width: 100%;
                        height: 175px;
                    }
                    .multiple-name {
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
                    .multiple-price-wrapper {
                        height: 25px;
                        position: relative;
                        width: 100%;
                        overflow: hidden;
                        .multiple-price {
                            top: 0;
                            color: #fa2c19;
                            display: inline-block;
                            padding: 0 5px 0 4px;
                            position: relative;
                            vertical-align: top;
                            height: 25px;
                            line-height: 25px;
                            font-size: 16PX;
                            font-weight: 800;
                        }
                        .multiple-tip {
                            font-size: 10px;
                            border: 0.5PX solid #fa2c19;
                            color: #fa2c19;
                            height: 25px;
                            line-height: 25px;
                            vertical-align: top;
                            border-radius: 4px;
                        }
                        .multiple-like {
                            display: block;
                            position: absolute;
                            right: -5px;
                            top: 4px;
                            text-align: center;
                            color: grey;
                            font-size: 10PX;
                            vertical-align: top;
                            height: 18px;
                            line-height: 18px;
                            padding: 0 4px;
                            background-color: #f0f2f5;
                            border-radius: 10px;
                        }
                    }
                    .multiple-ori-price {
                        color: #ccc;
                        padding: 0 5px 10px 4px;
                        font-size: 14PX;
                        font-family: JDZhengHT-EN-Regular;
                    }
                }
            }
        }
        .single-wrapper {
            position: relative;
            .single-content {
                background: white;
                box-sizing: border-box;
                display: flex;
                &::after {
                    content: '';
                    width: 72%;
                    position: absolute;
                    height: 1px;
                    right: 0;
                    display: inline-block;
                    background: #eee;
                }
                .single-img {
                    width: 30%;
                    height: 100px;
                    padding: 10px;
                }
                .single-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 10px 0;
                    .single-name {
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
                    .single-price-wrapper {
                        height: 25px;
                        position: relative;
                        overflow: hidden;
                        .single-price {
                            top: 0;
                            color: #fa2c19;
                            display: inline-block;
                            padding: 0 5px 0 4px;
                            position: relative;
                            vertical-align: top;
                            height: 25px;
                            font-size: 16PX;
                            font-weight: 800;
                            line-height: 25px;
                        }
                        .single-tip {
                            font-size: 10px;
                            border: 0.5PX solid #fa2c19;
                            color: #fa2c19;
                            height: 25px;
                            line-height: 25px;
                            vertical-align: top;
                            border-radius: 4px;
                        }
                        .single-like {
                            display: block;
                            position: absolute;
                            right: 5px;
                            top: 4px;
                            text-align: center;
                            color: grey;
                            font-size: 10PX;
                            height: 18px;
                            line-height: 18px;
                            padding: 0 4px;
                            background-color: #f0f2f5;
                            border-radius: 10px;
                        }
                    }
                    .single-ori-price {
                        color: #ccc;
                        padding: 0 5px 10px 4px;
                        font-size: 14PX;
                        font-family: JDZhengHT-EN-Regular;
                    }
                }
            }
        }
    }
</style>
