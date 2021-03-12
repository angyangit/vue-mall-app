<template>
    <div class='home-root'>
        <search-bar
                :bgColorPercent='bgColorPercent'
                pageType='home'></search-bar>
        <scroll-view
                class="home-srcoll"
                ref='homeScroll'
                :listenScroll='true'
                :probeType='3'
                :pullup='true'
                @scroll='scrollListener'
                @pullUp='pullUpListener'
                :refreshDelay='20'
                :data='getData'>
            <div class="home-warrper">
                <div class='home-header'>
                    <header class="banner-wrapper">
                        <slider-view ref='slider' :sliderData='advertiseList'></slider-view>
                    </header>
                </div>
                <div class="cate-wrapper">
                    <div class="cate-bg">
                        <img :src="require('../../assets/images/bg-cate.png')" class="opa1"/>
                    </div>
                    <div
                            class="cate-container"
                            ref="cateWrapper"
                            @touchstart="cateTouchStart"
                            @touchmove="cateTouchMove"
                            @touchend="cateTouchEnd"
                    >
                        <!-- touchstart触摸时间不能在 cate-frist盒子上,否则会出现左右滑动，上下跟着滑动
                      因为当cate-frist滑动出屏幕后，滑动的是其外层盒子-->
                        <div class="cate-frist">
                            <a
                                    class="cate-item"
                                    href=""
                                    v-for="(item, index) in getFristCats"
                                    :key="index"
                                    @click.prevent=""
                            >
                                <img class="cate-icon" :src="item.icon"/>
                                <span class="cate-name">{{ item.name }}</span>
                            </a>
                        </div>
                        <div class="cate-second">
                            <a
                                    class="cate-item"
                                    href=""
                                    v-for="(item, index) in getSecondCats"
                                    :key="index"
                                    ref="disLink"
                            >
                                <img class="cate-icon" v-lazy="item.icon"/>
                                <span class="cate-name">{{ item.name }}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                        class="dis-wrapper"
                        @touchstart="disTouchStart"
                        @touchmove="disTouchMove"
                        @touchend="disTouchEnd"
                >
                    <div class='dis-root'>
                        <div class="dis-container" ref="disWrapper">
                            <a
                                    class="dis-item"
                                    v-for="(item, index) in disList"
                                    :href="item.href"
                                    :key="index"
                                    :style="setStyle(index)"
                            >
                                <img
                                        :style="getImgWidth(index)"
                                        class="dis-img"
                                        :src="item.icon"
                                        ref="disImg"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div class='home-goods-list-wrapper'>
                    <goods-list-view :multipleShow='multipleShow' :goodsList='recommendList'></goods-list-view>
                </div>
            </div>
        </scroll-view>
        <a class='up-top-wrapper' @click.prevent='upTop' v-show='isUpTopShow'>
            <img :src='require("../../assets/images/up_top.png")'>
        </a>
    </div>
</template>

<script>
    import SearchBar from '../../components/SearchBar.vue'
    import {prefixStyle} from '../../utils/dom'
    import HomeAip from '../../request/home'
    import SliderView from '../../components/SliderView';
    import GoodsListView from '../../components/GoodsListView';
    import ScrollView from '../../components/ScrollView';
    import {cateList, disList} from '../../common/constant';

    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')
    export default {
        components: {SearchBar, SliderView, GoodsListView, ScrollView},
        name: 'home',
        computed: {
            getFristCats() {
                return cateList.slice(0, 10)
            },
            getSecondCats() {
                return cateList.slice(10)
            },
            getData() {
                return this.advertiseList.concat(this.recommendList)
            }
        },
        data() {
            return {
                cateList: cateList,
                cateIndex: 0,
                disList: disList,
                disLeftIndex: 3,
                advertiseList: [],
                brandList: [],
                hotProductList: [],
                newProductList: [],
                subjectList: [],
                multipleShow: true,
                bgColorPercent: 0,
                isUpTopShow: false,
                recommendPageSize: 4,
                recommendPageNum: 1,
                recommendList: [],
                isLoadMoreFlish: false

            }
        },
        created() {
            // this.cateTouchInfo = {windowW: window.innerWidth}
            // this.disTouchInfo = {distant: 0}
            // this.getHomeAllInfo()
        },
        activated() {
            console.log('home activated')
            this.cateTouchInfo = {windowW: window.innerWidth}
            this.disTouchInfo = {distant: 0}
            this.initDisOrginLocation()
            this.getHomeAllInfo()
        },
        methods: {
            cateTouchStart(e) {
                this.cateTouchInfo.cateStartX = e.touches[0].pageX
                this.cateTouchInfo.cateStartY = e.touches[0].pageY
                this.cateTouchInfo.cateTouchInit = true
            },
            cateTouchMove(e) {
                if (!this.cateTouchInfo.cateTouchInit) return
                const deltaX = e.touches[0].pageX - this.cateTouchInfo.cateStartX
                const deltaY = e.touches[0].pageY - this.cateTouchInfo.cateStartY
                if (Math.abs(deltaX) < Math.abs(deltaY)) {
                    this.cateTouchInfo.cateMovePercent = 0
                    return
                }
                e.preventDefault()
                if (
                    (this.cateIndex === 0 && deltaX > 0) ||
                    (this.cateIndex === 1 && deltaX < 0)
                ) {
                    this.cateTouchInfo.cateMovePercent = 0
                    return
                }
                const left = this.cateIndex === 0 ? 0 : -this.cateTouchInfo.windowW
                const offsetWidth = Math.min(
                    0,
                    Math.max(-this.cateTouchInfo.windowW, left + deltaX)
                )
                this.$refs.cateWrapper.style[transform] = `translateX(${offsetWidth}px)`
                this.$refs.cateWrapper.style[transitionDuration] = null
                this.cateTouchInfo.cateMovePercent = Math.abs(
                    deltaX / this.cateTouchInfo.windowW
                )
                console.log(deltaX)
            },
            cateTouchEnd() {
                this.cateTouchInfo.cateTouchInit = false
                if (this.cateTouchInfo.cateMovePercent === 0) return
                if (this.cateIndex === 0) {
                    if (this.cateTouchInfo.cateMovePercent > 0.2) {
                        this.cateIndex = 1
                        this.$refs.cateWrapper.style[transform] = `translateX(${-this
                            .cateTouchInfo.windowW}px)`
                    } else {
                        this.$refs.cateWrapper.style[transform] = 'translateX(0px)'
                    }
                } else {
                    if (this.cateTouchInfo.cateMovePercent > 0.2) {
                        this.$refs.cateWrapper.style[transform] = 'translateX(0px)'
                        this.cateIndex = 0
                    } else {
                        this.$refs.cateWrapper.style[transform] = `translateX(${-this
                            .cateTouchInfo.windowW}px)`
                    }
                }
                this.$refs.cateWrapper.style[transitionDuration] = '500ms'
            },
            disTouchStart(e) {
                this.disTouchInfo.disStartX = e.touches[0].pageX
                this.disTouchInfo.disStartY = e.touches[0].pageY
                this.disTouchInfo.disTouchInit = true
            },
            disTouchMove(e) {
                const deltaX = e.touches[0].pageX - this.disTouchInfo.disStartX
                const deltaY = e.touches[0].pageY - this.disTouchInfo.disStartY
                if (Math.abs(deltaX) < Math.abs(deltaY)) {
                    this.disTouchInfo.stop = true
                    return
                }
                this.disTouchInfo.stop = false
                e.preventDefault()
                const reqDeltaX = this.disTouchInfo.distant + deltaX
                this.disTouchInfo.reqDeltaX = reqDeltaX
                this.$refs.disWrapper.style[transform] = `translateX(${reqDeltaX}px)`
                this.$refs.disWrapper.style[transitionDuration] = null
            },
            disTouchEnd(e) {
                if (this.disTouchInfo.stop) return
                const percent = Math.round(
                    Math.abs(this.disTouchInfo.distant - this.disTouchInfo.reqDeltaX) /
                    (window.innerWidth / 3)
                )
                if (this.disTouchInfo.reqDeltaX > this.disTouchInfo.distant) {
                    this.disTouchInfo.distant += (this.$refs.disWrapper.clientWidth / 3) * percent
                    this.disLeftIndex = this.disLeftIndex - percent
                    if (this.disLeftIndex <= 0) {
                        this.initDisOrginLocation()
                    } else {
                        this.$refs.disWrapper.style[transitionDuration] = '500ms'
                        this.$refs.disWrapper.style[
                            transform
                            ] = `translateX(${this.disTouchInfo.distant}px)`
                    }
                } else {

                    this.disTouchInfo.distant -= ((this.$refs.disWrapper.clientWidth / 3)) * percent
                    this.disLeftIndex = this.disLeftIndex + percent
                    console.log('percent11', this.disTouchInfo.distant)
                    if (this.disLeftIndex >= 6) {
                        this.initDisOrginLocation()
                    } else {
                        this.$refs.disWrapper.style[
                            transform
                            ] = `translateX(${this.disTouchInfo.distant}px)`
                        this.$refs.disWrapper.style[transitionDuration] = '500ms'
                    }
                }
            },
            initDisOrginLocation() {
                this.disLeftIndex = 3
                this.disTouchInfo.distant = -this.$refs.disWrapper.clientWidth
                // this.$refs.disWrapper.style[transitionDuration] = '1ms'
                this.$refs.disWrapper.style[
                    transform
                    ] = `translateX(${this.disTouchInfo.distant}px)`
            },
            setStyle(index) {
                if (index === this.disLeftIndex) {
                    return 'text-align: left;'
                } else if (index === this.disLeftIndex + 1) {
                    return 'text-align: center;'
                } else if (index === this.disLeftIndex + 2) {
                    return 'text-align: right;'
                } else {
                    return 'text-align: center;'
                }
            },
            getImgWidth(index) {
                if (index === this.disLeftIndex + 1) {
                    return 'width:100%;'
                }
            },
            getHomeAllInfo() {
                this._getHomeInfo()
                this._recommendProductList()
            },
            _getHomeInfo() {
                HomeAip.homeInfo().then((res) => {
                    this.advertiseList = res.advertiseList;
                    this.brandList = res.brandList
                    this.hotProductList = res.hotProductList
                    this.newProductList = res.newProductList
                    this.subjectList = res.subjectList
                })
            },
            _recommendProductList() {
                const params = {
                    pageSize: this.recommendPageSize,
                    pageNum: this.recommendPageNum
                }
                HomeAip.recommendProductList(params).then(res => {
                    this.recommendList = this.recommendList.concat(res)
                    console.log('leng', res.length)
                    let pullBack = 1
                    if (res.length < this.recommendPageSize) {
                        this.isLoadMoreFlish = true
                        pullBack = 2
                    }
                    this.$refs.homeScroll.pullLoadFinish(pullBack)
                }).catch(err => {
                    this.recommendPageNum--
                    this.$refs.homeScroll.pullLoadFinish(3)
                })
            },
            scrollListener(pos) {
                const y = pos.y
                if (y > 0) {
                    this.bgColorPercent = 0
                } else if (y < -255) {
                    this.bgColorPercent = 1
                } else {
                    this.bgColorPercent = Math.floor(Math.abs(y)) / 255
                }

                if (y < -500) {
                    this.isUpTopShow = true
                } else {
                    this.isUpTopShow = false
                }
                console.log(this.bgColorPercent)
            },
            pullUpListener() {
                if (this.isLoadMoreFlish) return
                this.recommendPageNum++
                this._recommendProductList()
            },
            upTop() {
                this.$refs.homeScroll.scrollTo(0, 0, 300)
            }
        },
    }
</script>
//https://m.360buyimg.com/mobilecms/s1125x939_jfs/t1/171188/40/5449/67605/601a733eE9eb166b1/2440ac201ce1c627.jpg
<style scoped lang="scss">
    .home-root {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        .home-srcoll {
            height: 100%;
            width: 100%;
            overflow: hidden;
            .home-warrper {
                .home-header {
                    height: 260px;
                    background: url('../../assets/images/banner-bg.jpg') no-repeat center;
                    background-size: 100% 100%;
                    .banner-wrapper {
                        position: relative;
                        top: 50px;
                        left: 0;
                    }
                }
                .cate-wrapper {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    .cate-bg {
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        position: relative;
                        min-height: 150px;
                        img {
                            width: 100%;
                            position: absolute;
                            height: 100%;
                        }
                    }
                    .cate-container {
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        position: absolute;
                        .cate-frist {
                            position: absolute;
                            top: 0;
                            left: 0%;
                            width: 100%;
                            height: 100%;
                        }
                        .cate-second {
                            position: absolute;
                            top: 0;
                            left: 100%;
                            width: 100%;
                            height: 100%;
                        }
                        .cate-item {
                            width: 20%;
                            float: left;
                            height: 50%;
                            text-align: center;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            text-decoration: none;
                            .cate-icon {
                                width: 30px;
                                height: 30px;
                                vertical-align: middle;
                            }
                            .cate-name {
                                line-height: 30px;
                                display: block;
                                font-size: 10px;
                            }
                        }
                    }
                }
                .dis-wrapper {
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    padding: 10px 10px;
                    box-sizing: border-box;
                    .dis-root {
                        background-color: white;
                        overflow: hidden;
                        padding: 5px 5px;
                        border-radius: 10px;
                        box-sizing: border-box;
                        .dis-container {
                            white-space: nowrap;
                            width: 100%;
                            .dis-item {
                                display: inline-block;
                                width: 33.33%;
                                overflow: hidden;
                                .dis-img {
                                    width: 80%;
                                    vertical-align: baseline;
                                }
                            }
                        }
                    }
                }
            }
        }
        .up-top-wrapper {
            position: absolute;
            bottom: 100px;
            right: 10px;
            img {
                width: 40px;
                height: 40px;
            }
        }
    }
</style>
