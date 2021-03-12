<template>
    <div id='goods-detail-container'>
        <header class='goods-header' ref='goodsHeader'>
            <span class='header-icon-l' @click='back'>
                <i class='icon-cebianlanshouqi'></i>
            </span>
            <div class='header-tab' @click='tabClick' ref='goodsTab'>
                <span idx="0" :class='{"tab-active":tabIndex==0}'>商品</span>
                <span idx="1" :class='{"tab-active":tabIndex==1}'>评价</span>
                <span idx="2" :class='{"tab-active":tabIndex==2}'>详情</span>
                <span idx="3" :class='{"tab-active":tabIndex==3}'>推荐</span>
            </div>
            <span class='header-icon-r'
                  @click.stop='rightClick'>
                    <i class="icon-haofangtuoiconfont_dianpu"></i>
                    <div class='pop-mask' v-show='isShowPop'
                         @click.stop='cancelPop'>
                        <div class="m_header_nav" style="" @click='popClick'>
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
        <scroll-view class='goods-detail-scroll' ref='proDetailScroll'
                     :data='getData'
                     :refreshDelay='20'
                     :listenScroll='true'
                     :probeType='3'
                     @scroll='scrollListener'>
            <div>
                <div class='pro-info-wrapper' ref='topWrapper'>
                    <div class='pro-top'>
                        <custom-slider-view :dataList='proImgList'></custom-slider-view>
                        <div class='pro-info-container'>
                            <div class='frist-wrapper'>
                            <span class="price ">
                                ¥<em class='large_size'>{{proInfo.price}}</em><span class="price_decimals">.00</span>
                            </span>
                                <span class="old_price"> ¥{{proInfo.originalPrice}}</span>
                                <span class='collect'>
                                <i class='icon-cebianlan-wodeshoucang-weixuanzhong'></i>
                                <em>收藏</em>
                            </span>
                            </div>
                            <div class='sec-wrapper'>
                                <img src='../../../assets/images/jd-market.png' alt=''>
                                <span>一站式囤生活好物</span>
                            </div>
                            <p class='third-wrapper'>{{proInfo.name}}</p>
                            <p class='four-wrapper' style='font-size: 16px;color: #ccc;margin-top: 10px'>
                                {{proInfo.subTitle}}</p>
                        </div>
                    </div>
                    <div class='dis-info-wrapper' @click.stop='showDisPop'>
                        <div class="mod_discount">
                            <span class="title">优惠</span>
                            <div class="content">
                                <div class="detail_prom" style="">
                                    <div class="de_row prom_item">
                                        <div class="de_tag" tag="10"><em class="gift_red_icon">赠品</em></div>
                                        <div class="de_span line1"><span><span id="giftDefaultGiftDesc">购买立享2件赠品（条件：购买2件及以上，赠完即止）</span></span>
                                        </div>
                                    </div>
                                    <div class="de_row prom_item">
                                        <div class="de_tag" tag="3"><em class="hl_red_bg">限购</em></div>
                                        <div class="de_span line1"><span>购买1-12件时享受单件价￥269，超出数量以结算价为准</span></div>
                                    </div>
                                    <div class="de_row prom_item">
                                        <div class="de_tag" tag="0"><em class="hl_red_bg">满额返券</em></div>
                                        <div class="de_span line1"><span>购母婴玩具食品清洁个护生鲜电脑数码家电医药酒水图书汽车部分自营商品满1元返券包</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='comment-wrapper' ref='commentWrapper'>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                    <p>djkdj</p>
                </div>
                <div class='recommend-wrapper'
                     ref='recommendWrapper'
                     @touchstart="cateTouchStart"
                     @touchmove="cateTouchMove"
                     @touchend="cateTouchEnd">
                    <p class='guess-like-wrapper'><span></span>猜你喜欢</p>
                    <div class='recommend-container'
                         ref="cateWrapper">
                        <div class='recommend-item'
                             v-for='(item,index) in recommendList'
                             :style='setStyle(index)'>
                            <div class='recommend-child-item'
                                 v-for='(child,cdex) in item'>
                                <a class="pro-item"
                                   href=""
                                   @click.prevent="">
                                    <img class="pro-img" v-lazy="child.pic"/>
                                    <span class="pro-name">                                    {{index}}
                                    {{index}}-{{ child.name }}</span>
                                    <span class="pro-price">{{ child.price }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='detail-wrapper' ref='detailWrapper'
                     v-html='proInfo.detailHtml'>
                </div>
            </div>
        </scroll-view>
        <div class='dis-pop' v-if='isShowDisPop' @click.stop='hideDisPop'>
            <transition name="slide">
                <div class="dis-main" @click.stop v-if='isShowDisPop'>
                    <div class="header">
                        优惠
                        <i class="icon-iconfontclose2" @click.stop='hideDisPop'></i>
                    </div>
                    <div class="dis-body">
                        <div class="floor floor_promo" style="">
                            <div class="title">促销</div>
                            <div class="info" style="display: none;"></div>
                            <div class="detail_prom">
                                <div id="fanxianPromo" style="display: none;"></div>
                                <div id="baitiaoPromo" style="display:none;"></div>
                                <div id="promoteList" style="">
                                    <div class="de_row prom_item">
                                        <div class="de_tag" style='border: 0'>
                                            <em class="gift_red_icon" style='border: 1px solid red'>赠品</em>
                                        </div>
                                        <div class="de_span">
                                            <div class="gift_title" id="giftDefaultGiftTitle">
                                                <span class="txt">购买立享2件赠品（条件：购买2件及以上，赠完即止）</span>
                                            </div>
                                            <div class="gift_list">
                                                <div class="gift_list_item item "
                                                     tourl="//item.m.jd.com/product/100010045393.html?ptag=7001.1.52">
                                                    <div class="name">奥迪双钻酷变车队反反野兽大脚车系列赠品（颜色以实际收到为准）</div>
                                                    <div class="num">x2</div>
                                                    <i class="icon_point"></i>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div tourl="" class="de_row prom_item " promotionid="200051223633">
                                        <div class="de_tag" tag="3"><em class="hl_red_bg">限购</em></div>
                                        <div class="de_span"><span>该商品购买1-12件时享受单件价￥269.00，超出数量以结算价为准</span></div>
                                    </div>
                                    <div tourl="//pro.m.jd.com/mall/active/3Fh9CrKeyMeDxf71AwtvLycFDGXP/index.html?PTAG=37287.6.5&amp;sceneval=2&amp;jxsid=16130106200461649515"
                                         class="de_row prom_item " promotionid="200055803256">
                                        <div class="de_tag" tag=""><em class="hl_red_bg">满额返券</em></div>
                                        <div class="de_span"><span>购母婴玩具食品清洁个护生鲜电脑数码家电医药酒水图书汽车部分自营商品满1元返券包</span></div>
                                        <div class="de_point"><i class="icon_point"></i></div>
                                    </div>
                                </div>
                                <div class="de_row prom_item" id="relatedEnter2" ptag="7001.1.48" style="display:none;">
                                    <div class="de_tag">
                                        <em class="hl_red_bg">优惠套装</em>
                                    </div>
                                    <div class="de_span">
                                        <div class="prom_flex_box">
                                            <span id="relatedNotice2"></span>
                                            <div class="de_point">
                                                <i class="icon_point"></i>
                                            </div>
                                        </div>
                                        <div class="scroll_box"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="floor floor_coupon" style="display:none;">
                            <div class="title">领券</div>
                            <div id="couponList"></div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class='pro-select-pop' v-show='isShowSkuPop'
             @click.stop='hideSkuPop'>
            <transition name="slide">
                <div class='pro-select-pop-container'
                     v-show='isShowSkuPop'>
                    <div class='pro-info'>
                        <img class='pro-img' :src='proInfo.pic'>
                        <div class='pro-sku'>
                            <p class="price ">
                                ¥<em class='large_size'>{{selectSkuBean&&selectSkuBean.price}}</em><span
                                    class="price_decimals">.00</span>
                            </p>
                            <p class="sku-tip">
                                已选 <span>{{getSkuTip}}</span>
                            </p>
                        </div>
                        <i class="icon-iconfontclose2 close-icon"
                           @click='hideSkuPop'></i>
                    </div>
                    <div class='pro-content'>
                        <div class='pro-content-container'>
                            <div class='pro-sku'>
                                <div class='pro-sku-item' v-for='(val,key) in skuStockListUi'>
                                    <p class='sku-name'>{{key}}</p>
                                    <div class='sku-val-wraper'>
                            <span class='sku-val' v-for='(skuVal) in val'
                                  :class='{"select-sku":setSelectSkuStyle(skuVal,key)}'
                                  @click.stop='selectSku(skuVal,val,key)'>{{skuVal}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class='pro-count-wrapper'>
                            <span class='count-tip'>
                                数量
                            </span>
                                <count-view @countChange='countChange'
                                            ref='countView'
                                            :maxCount='selectSkuBean&&selectSkuBean.stock'></count-view>
                            </div>
                        </div>
                    </div>
                    <div class='btn-confirm'
                         @click='addShopCar'><span>确认</span></div>
                </div>
            </transition>
        </div>
        <div class='shopcar-bar'>
            <div class='car-l'>
                <div class='store-wraper'>
                    <i class='icon-haofangtuoiconfont_dianpu'></i>
                    <span>店铺</span>
                </div>
                <div class='shopcar-wraper' @click.stop='goShopCar'>
                    <i class='icon-iconfontcart'></i>
                    <span>购物车</span>
                    <span class='car-count'>0</span>
                </div>
            </div>
            <div class='car-r'>
                <div class="add-shopcar" @click='toBuy(0)'>
                    <span class="txt">加入购物车</span>
                </div>
                <div class="to-buy" @click='toBuy(1)'>
                    <span class="txt">立即购买</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollView from '../../../components/ScrollView';
    import ProductAip from '../../../request/product';
    import SliderView from '../../../components/SliderView';
    import CustomSliderView from '../../../components/CustomSliderView';
    import {prefixStyle} from '../../../utils/dom';
    import CountView from '../../../components/CountView';
    import ShopCarAip from '../../../request/shopcar';
    import {mapGetters, mapMutations} from 'vuex'
    import {memberInfo} from '../../../store/getters';
    import {SET_TO_LOGIN_PAGE} from '../../../store/mutation-types';

    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')

    export default {
        name: 'proDetail',
        components: {
            ScrollView,
            SliderView,
            CustomSliderView,
            CountView
        },
        data() {
            return {
                isShowPop: false,
                tabIndex: 0,
                proImgList: [],
                proInfo: {},
                isShowDisPop: false,
                isShowSkuPop: false,
                recommendList: [],
                recomendPageIndex: 0,
                originSkuStockList: [],
                skuStockList: [],
                skuStockListUi: [],
                selectSkuArr: [],
                selectSkuBean: undefined,
                buyCount: 1
            }
        },
        computed: {
            getData() {
                return this.proImgList.concat(this.recommendList)
            },
            getSkuTip() {
                if (!this.selectSkuBean) return ''
                const spDataJson = JSON.parse(this.selectSkuBean.spData)
                return spDataJson.map(item => {
                    return item.key + ":" + item.value
                }).join('  ,  ')
            },
            ...mapGetters(['memberInfo'])
        },
        created() {
            this.cateTouchInfo = {windowW: window.innerWidth}
            if (this.$route.params.id <= 0) {
                this.$router.back()
            } else {
                this._productDetail(this.$route.params.id)
                this._productSearch(this.$route.query.productCategoryId)
            }
        },
        methods: {
            cateTouchStart(e) {
                this.cateTouchInfo.deltaX = 0
                this.cateTouchInfo.cateStartX = e.touches[0].pageX
                this.cateTouchInfo.cateStartY = e.touches[0].pageY
                this.cateTouchInfo.cateTouchInit = true
            },
            cateTouchMove(e) {
                if (!this.cateTouchInfo.cateTouchInit) return
                const deltaX = e.touches[0].pageX - this.cateTouchInfo.cateStartX
                const deltaY = e.touches[0].pageY - this.cateTouchInfo.cateStartY
                if (Math.abs(deltaX) < Math.abs(deltaY)) {
                    return
                }
                const offsetPageX = -this.recomendPageIndex * this.cateTouchInfo.windowW
                const offsetTotal = deltaX + offsetPageX
                this.cateTouchInfo.offsetTotal = offsetTotal
                this.cateTouchInfo.deltaX = deltaX
                this.$refs.cateWrapper.style[transform] = `translateX(${offsetTotal}px)`
                this.$refs.cateWrapper.style[transitionDuration] = null
            },
            cateTouchEnd() {
                this.cateTouchInfo.cateTouchInit = false
                const deltaX = this.cateTouchInfo.deltaX
                if (Math.abs(deltaX) < 10) return
                let index = this.recomendPageIndex
                if (deltaX > 0) {
                    if (index === 0) {
                        this.recomendPageIndex = 0
                    } else {
                        this.recomendPageIndex--
                    }
                } else {
                    if (index === this.recommendList.length - 1) {
                        this.recomendPageIndex = this.recommendList.length - 1
                    } else {
                        this.recomendPageIndex++
                    }
                }
                const offsetPageX = -this.recomendPageIndex * this.cateTouchInfo.windowW
                this.$refs.cateWrapper.style[transform] = `translateX(${offsetPageX}px)`
                this.$refs.cateWrapper.style[transitionDuration] = '500ms'
            },
            _productDetail(id) {
                ProductAip.productDetail(id).then(res => {
                    this.handlerRes(res);
                    this.handlerSkuList(res)
                })
            },
            _productSearch(productCategoryId) {
                if (this.productCategoryId <= 0) return
                const productSearchOption = {
                    pageNum: 1,
                    pageSize: 32,
                    productCategoryId: productCategoryId
                }
                ProductAip.productSearch(productSearchOption).then(res => {
                    this.getRecommendList(res.list)
                })
            },
            getRecommendList(list) {
                const length = Math.ceil(list.length / 6)
                let arr = []
                for (let i = 0; i < length; i++) {
                    arr.push(list.slice(i * 6, i * 6 + 6))
                }
                this.recommendList = arr
            },
            handlerRes(res) {
                if (res.product.pic) {
                    this.proImgList.push(res.product.pic)
                }
                if (res.product && res.product.albumPics) {
                    this.proImgList = this.proImgList.concat(res.product.albumPics.split(','))
                }
                this.proInfo = res.product
                console.log('--proInfo--', this.proImgList)
            },
            handlerSkuList(res) {
                const skuStockList = res.skuStockList
                this.originSkuStockList = skuStockList
                let skuStockListOnce = []
                skuStockList.forEach((item, index) => {
                    const spData = item.spData
                    const spDataJson = JSON.parse(spData)
                    if (index === 0) {
                        this.selectSkuBean = item
                        spDataJson.forEach(item => {
                            this.selectSkuArr.push(item)
                        })
                    }
                    skuStockListOnce = skuStockListOnce.concat(spDataJson)
                })
                this.skuStockList = skuStockListOnce
                const arr = {}
                const keyArr = []
                this.skuStockList.forEach(item => {
                    const key = item.key
                    const val = item.value
                    const hasKey = keyArr.findIndex(item => {
                        return item === key
                    })
                    if (hasKey === -1) {
                        keyArr.push(key)
                        arr[key] = []
                    } else {
                        if (arr[key].findIndex(item => {
                            return item === val
                        }) === -1) {
                            arr[key].push(val)
                        }
                    }
                })
                this.skuStockListUi = arr

            },
            selectSku(skuVal, val, keyVal) {
                const bolVal = this.selectSkuArr.findIndex(item => {
                    return item.value === skuVal
                })
                if (bolVal !== -1) {
                    return
                }
                let oldSelIndex = -1
                this.selectSkuArr.forEach((item, index) => {
                    val.forEach(valItem => {
                        if (item.value === valItem) oldSelIndex = index
                    })
                })
                this.selectSkuArr.splice(oldSelIndex, 1);
                const mySku = {
                    key: keyVal,
                    value: skuVal
                }
                this.selectSkuArr.push(mySku)

                let selIndx = -1;
                this.originSkuStockList.forEach((item, index) => {
                    const spData = item.spData
                    const spDataJson = JSON.parse(spData)
                    let match = 0
                    spDataJson.forEach(sku => {
                        this.selectSkuArr.forEach(selSku => {
                            console.log(sku.value, selSku.value)
                            if (sku.value == selSku.value) match++
                        })

                    })
                    if (match === this.selectSkuArr.length) {
                        selIndx = index
                        return
                    }
                })
                this.selectSkuBean = this.originSkuStockList[selIndx]

                console.log('selectSkuBean', this.selectSkuBean)

            },
            setSelectSkuStyle(skuVal, key) {
                let bo = false
                this.selectSkuArr.forEach(item => {
                    if (skuVal === item.value) {
                        bo = true
                    }
                })
                return bo
            },
            setStyle(index) {
                let precentLeft = 100 * index
                return `left:${precentLeft}%`
            },
            tabClick(e) {
                let event = e || window.event;
                this.tabIndex = event.target.getAttribute('idx')
                let el = this.$refs.topWrapper
                if (this.tabIndex == 0) {
                    el = this.$refs.topWrapper
                } else if (this.tabIndex == 1) {
                    el = this.$refs.commentWrapper
                } else if (this.tabIndex == 2) {
                    el = this.$refs.detailWrapper
                } else if (this.tabIndex == 3) {
                    el = this.$refs.recommendWrapper

                }
                this.$refs.proDetailScroll.scrollToElement(el, 200)
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
            showDisPop() {
                console.log('aaaa')
                this.isShowDisPop = true
            },
            hideDisPop() {
                this.isShowDisPop = false
            },
            hideSkuPop() {
                this.isShowSkuPop = false
            },
            rightClick() {
                this.isShowPop = true
            },
            cancelPop() {
                this.isShowPop = false
            },
            back() {
                this.$router.back()
            },
            scrollListener(pos) {
                const currentY = pos.y
                if (currentY > 0) {
                    this.tabIndex = 0
                    return
                }
                console.log('currentY', currentY)
                const topWrapperH = this.$refs.topWrapper.clientHeight
                const commentWrapperH = this.$refs.commentWrapper.clientHeight
                const recommendWrapperH = this.$refs.recommendWrapper.clientHeight
                const disX = (-currentY)
                if (disX > topWrapperH + commentWrapperH + recommendWrapperH) {
                    this.tabIndex = 2
                    return;
                }
                if (disX > topWrapperH + commentWrapperH) {
                    this.tabIndex = 3
                    return;
                }
                if (disX > topWrapperH) {
                    this.tabIndex = 1
                    return;
                }
                const op = Math.abs(currentY) > 100 ? 1 : Math.abs(currentY) / 100
                this.$refs.goodsHeader.style.backgroundColor = `rgba(255,255,255,${op})`
                this.$refs.goodsTab.style.opacity = `${op}`

            },
            countChange(count) {
                this.buyCount = count
            },
            toBuy(type) {
                this.isShowSkuPop = true
            },
            addShopCar() {
                // id: 110
                // lockStock: 0
                // price: 3788
                // productId: 26
                // skuCode: "201806070026001"
                // spData: "[{"key":"颜色","value":"金色"},{"key":"容量","value":"16G"}]"
                // stock: 499

                // birthday: "2009-05-31T16:00:00.000+00:00"
                // city: "上海"
                // createTime: "2018-08-02T10:35:44.000+00:00"
                // gender: 1
                // id: 1
                // integration: 5000
                // job: "学生"
                // memberLevelId: 4
                // nickname: "windir"
                // password: "$2a$10$NZ5o7r2E.ayT2ZoxgjlI.eJ6OEYqjH7INR/F.mXDbjZJi9HF0YCVG"
                // personalizedSignature: "test"
                // phone: "18061581849"
                // status: 1
                // username: "test"
                const memberInfo = this.memberInfo
                const selectSkuBean = this.selectSkuBean
                const proInfo = this.proInfo
                console.log('proInfo', this.proInfo)
                console.log('selectSkuBean', this.selectSkuBean)
                console.log('memberInfo', memberInfo)

                if (this.buyCount <= 0) {
                    return
                }
                if (memberInfo === null) {
                    this.setToLoginPage(true)
                    return;
                }
                const omsCartItem = {
                    productId: selectSkuBean.productId,
                    productSkuId: selectSkuBean.id,
                    memberId: memberInfo.id,
                    quantity: this.$refs.countView.getVal(),
                    price: selectSkuBean.price,
                    productPic: proInfo.pic,
                    productName: proInfo.name,
                    productSubTitle: proInfo.subTitle,
                    productSkuCode: selectSkuBean.skuCode,
                    memberNickname: memberInfo.nickname,
                    productCategoryId: proInfo.productCategoryId,
                    productBrand: proInfo.brandName,
                    productAttr: selectSkuBean.spData,
                }

                ShopCarAip.addShopCar(omsCartItem).then(res => {

                })
            },
            goShopCar(){
                this.$router.push('/shopcar')
            },
            ...mapMutations({
                setToLoginPage: SET_TO_LOGIN_PAGE
            })
        },

    }
</script>

<style scoped lang='scss'>
    @import "../../../styles/variables";

    #goods-detail-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        .slide-enter-active, .slide-leave-active {
            transition: 0.5s;
        }
        .slide-enter, .slide-leave-to {
            transform: translate3d(0, 100%, 0)
        }
        .goods-header {
            height: 50px;
            line-height: 50px;
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            width: 100%;
            .header-tab {
                display: flex;
                justify-content: space-around;
                flex-grow: 1;
                font-size: 14px;
                margin: 0 30px;
                opacity: 0;
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
        .goods-detail-scroll {
            height: 100%;
            width: 100%;
            overflow: hidden;
            .pro-info-wrapper {
                .pro-top {
                    background-color: white;
                    padding: 20px 10px;
                    border-bottom-left-radius: 15px;
                    border-bottom-right-radius: 15px;
                    .frist-wrapper {
                        .price {
                            color: $color-theme-light;
                            font-size: 16px;
                            font-weight: 700;
                            display: inline-block;
                            .large_size {
                                font-size: 26px;
                            }
                            .price_decimals {
                                font-size: 16px;
                            }
                        }
                        .old_price {
                            color: $color-text-gray;
                            text-decoration: line-through;
                            font-size: 14px;
                        }
                        .collect {
                            float: right;
                            font-size: 14px;
                            color: #ddd;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            width: 60px;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                    .sec-wrapper {
                        font-size: 14px;
                        margin-top: 12px;
                        img {
                            height: 14px;
                            vertical-align: baseline;

                        }
                    }
                    .third-wrapper {
                        font-size: 22px;
                        font-weight: 700;
                        margin-top: 12px;
                    }
                }
                .dis-info-wrapper {
                    margin-top: 15px;
                    border-radius: 15px;
                    background-color: white;
                    padding: 10px;
                    .mod_discount {
                        padding: 10px 30px 0 30px;
                        position: relative;
                        .title {
                            position: absolute;
                            top: 10px;
                            left: 0;
                            font-weight: 700;
                            color: black;
                            font-size: 16px;
                        }
                        .content {
                            padding-left: 10px;
                            .detail_prom {
                                .de_row {
                                    display: flex;
                                    font-size: 12px;
                                    padding-bottom: 10px;
                                    .de_tag {
                                        border: 1px solid $color-theme-light;
                                        color: $color-theme-light;
                                        display: inline-block;
                                        flex-shrink: 0;
                                    }
                                    .de_span {
                                        padding-left: 5px;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                }
                            }
                            &:after {
                                content: '';
                                position: absolute;
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                right: 0;
                                top: 0;
                                background-image: url("../../../assets/images/pop_icon.png");
                                background-repeat: no-repeat;
                                background-size: 20px;
                            }
                        }

                    }

                }
            }
            .recommend-wrapper {
                width: 100%;
                overflow: hidden;
                margin-top: 20px;
                border-radius: 15px;
                display: flex;
                background-color: white;
                flex-direction: column;
                .guess-like-wrapper {
                    font-size: 16px;
                    font-weight: 700;
                    position: relative;
                    top: 0;
                    left: 0;
                    line-height: 40px;
                    padding-left: 20px;
                    &:before {
                        display: block;
                        position: absolute;
                        content: "";
                        width: 5px;
                        height: 18px;
                        position: absolute;
                        top: 12px;
                        left: 10px;
                        background-image: -webkit-gradient(linear, left top, right bottom, from(#fa503a), to(#fad1cb));
                        background-image: -webkit-linear-gradient(top, #f5503a, #fad1cb);
                        background-image: linear-gradient(180deg, #f5503a, #fad1cb);
                        bottom: 6px;
                    }
                }
                .recommend-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    min-height: 400px;
                    .recommend-item {
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                        position: absolute;
                        .recommend-child-item {
                            width: 33.33%;
                            display: flex;
                            padding: 10px;
                            box-sizing: border-box;
                            flex-direction: column;
                            .pro-item {
                                text-decoration: none;
                                width: 100%;
                                .pro-img {
                                    width: 100%;
                                }
                                .pro-name {
                                    box-sizing: border-box;
                                    height: 32PX;
                                    font-size: 13PX;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    word-break: break-all;
                                    color: #1a1a1a;
                                    line-height: 16PX;
                                }
                                .pro-price {
                                    font-weight: 700;
                                    color: $color-theme-light;
                                    font-size: 20PX;
                                }
                            }
                        }
                    }

                }
            }
            .comment-wrapper {
                margin-top: 20px;
                background-color: white;
                border-radius: 15px;
            }
            .detail-wrapper {
                width: 100%;
                background-color: white;
                border-radius: 15px;
                margin-top: 20px;
                img {
                    width: 300px !important;
                }
            }
        }
        .dis-pop {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            z-index: 1000;
            background-color: rgba(0, 0, 0, .7);
            .dis-main {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 300px;
                background-color: white;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                overflow: hidden;
                .header {
                    padding-top: 10px;
                    font-size: 16px;
                    font-weight: 700;
                    color: black;
                    text-align: center;
                    line-height: 30px;
                    height: 30px;
                    position: relative;
                    i {
                        position: absolute;
                        right: 10px;
                        color: $color-text-thin;
                    }
                }
                .dis-body {
                    height: 300px;
                    overflow: auto;
                    font-size: 16px;
                    padding: 10px 10px;
                    .title {
                        font-weight: 700;
                        color: black;
                        margin-bottom: 10px;
                    }
                    .de_row {
                        display: flex;
                        font-size: 14px;
                        padding-bottom: 10px;
                        .de_tag {
                            border: 1px solid $color-theme-light;
                            color: $color-theme-light;
                            flex-shrink: 0;
                            flex-wrap: nowrap;
                            display: inline-block;
                        }
                        .de_span {
                            padding-left: 5px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
        .pro-select-pop {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            z-index: 1000;
            background-color: rgba(0, 0, 0, .7);
            .pro-select-pop-container {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: white;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                .pro-content {
                    max-height: 300px;
                    overflow-y: auto;
                    .pro-content-container {
                        padding: 10px 20px;
                        .pro-sku {
                            .pro-sku-item {
                                margin-top: 10px;
                                .sku-name {
                                    font-weight: 700;
                                    font-size: 16PX;
                                }
                                .sku-val-wraper {
                                    margin-top: 10px;
                                    display: flex;
                                    flex-wrap: wrap;
                                    justify-content: left;
                                    .sku-val {
                                        display: inline-block;
                                        padding: 0 20px;
                                        line-height: 30px;
                                        margin-left: 20px;
                                        background-color: #eee;
                                        border-radius: 15px;
                                        margin-bottom: 10px;
                                        font-size: 16PX;

                                    }
                                    .select-sku {
                                        background: #fcedeb;
                                        color: $color-theme-light;
                                        font-weight: 700;
                                        border: 1px solid $color-theme-light;
                                    }
                                }
                            }
                        }
                        .pro-count-wrapper {
                            display: flex;
                            line-height: 50px;
                            justify-content: space-between;
                            .count-tip {
                                font-size: 16px;
                                font-weight: 700;
                            }
                        }
                    }
                }

                .pro-info {
                    position: relative;
                    padding: 10px 10px;
                    display: flex;
                    align-items: flex-end;
                    .pro-img {
                        width: 100px;
                        height: 100px;
                    }
                    .pro-sku {
                        vertical-align: bottom;
                        margin-left: 20px;
                        .price {
                            font-size: 14PX;
                            font-weight: 700;
                            color: $color-theme-light;
                            .large_size {
                                font-size: 24PX;
                            }
                        }
                        .sku-tip {
                            margin-top: 10px;
                            font-size: 14PX;
                            font-weight: 700;
                            color: #ddd;
                            span {
                                color: #080808;
                            }
                        }
                    }

                    .close-icon {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        color: #ccc;
                    }
                }
                .btn-confirm {
                    padding: 10px 20px;
                    span {
                        display: inline-block;
                        width: 100%;
                        height: 35px;
                        line-height: 35px;
                        font-weight: 700;
                        font-size: 16PX;
                        color: white;
                        text-align: center;
                        border-radius: 20px;
                        background-image: -webkit-linear-gradient(
                                        315deg, #f2140c, #f2270c 70%, #f24d0c);
                        background-image: linear-gradient(
                                        135deg, #f2140c, #f2270c 70%, #f24d0c);
                    }
                }
            }
        }
        .shopcar-bar {
            background-color: white;
            position: fixed;
            left: 0;
            bottom: 0;
            display: flex;
            font-size: 14px;
            width: 100%;
            padding: 10px 0;
            justify-content: space-around;
            .car-l {
                display: flex;
                flex-grow: 1;
                justify-content: space-around;
                .store-wraper {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    justify-content: space-between;
                    span {
                        font-size: 12px;
                    }
                    i {
                        color: $color-theme;
                    }
                }
                .shopcar-wraper {
                    display: flex;
                    text-align: center;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    span {
                        font-size: 12px;
                    }
                    .car-count {
                        position: absolute;
                        top: 0;
                        left: 20px;
                        line-height: 12px;
                        font-size: 12PX;
                        padding: 0 3px;
                        font-weight: 700;
                        color: $color-theme;
                        box-sizing: border-box;
                        border: 1px solid $color-theme;
                        border-radius: 7px;
                    }
                }
            }
            .car-r {
                display: flex;
                order: 1;
                justify-content: space-around;
                padding-right: 20px;
                .add-shopcar {
                    line-height: 40px;
                    border-radius: 20px;
                    color: white;
                    font-size: 16PX;
                    padding: 0 10px;
                    margin-left: 30px;
                    margin-right: 10px;
                    font-weight: 700;
                    background-image: -webkit-linear-gradient(
                                    315deg, #f2140c, #f2270c 70%, #f24d0c);
                    background-image: linear-gradient(
                                    135deg, #f2140c, #f2270c 70%, #f24d0c);
                }
                .to-buy {
                    line-height: 40px;
                    border-radius: 20px;
                    color: white;
                    font-size: 16PX;
                    padding: 0 10px;
                    font-weight: 700;
                    background-image: -webkit-linear-gradient(
                                    315deg, #ffba0d, #ffc30d 69%, #ffcf0d);
                    background-image: linear-gradient(
                                    135deg, #ffba0d, #ffc30d 69%, #ffcf0d);
                }
            }

        }

    }

</style>
