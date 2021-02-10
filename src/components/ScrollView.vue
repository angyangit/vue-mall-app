<template>
    <div ref="wrapper">
        <div class='scroll-content'>
            <slot></slot>
            <div class="swipe-up-wrapper" v-if='pullup'>
                <div class="loading" v-if='isPullTypeBack===1'>
                    <i>加载中...</i>
                </div>
                <div class="loading" v-else-if='isPullTypeBack===2'>
                    没有更多数据
                </div>
                <div class="loading" v-else>
                    加载失败,请重试
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from '@better-scroll/core'
    import Pullup from '@better-scroll/pull-up'

    BScroll.use(Pullup)
    export default {
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        data() {
            return {
                isPullTypeBack: 1
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    pullUpLoad: this.pullup
                })

                if (this.listenScroll) {
                    let me = this
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }

                if (this.pullup) {
                    this.scroll.on('pullingUp', () => {
                        this.$emit('pullUp')
                    })
                }

                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
            /**
             * 上拉加载通知
             * @param isSucc 1-加载成功 2-加载成功，没有更多数据 3-加载失败
             */
            pullLoadFinish(isPullTypeBack) {
                this.isPullTypeBack = isPullTypeBack
                console.log('this.isPullTypeBack', this.isPullTypeBack)

                this.scroll.finishPullUp()
                this.scroll.refresh()
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style scoped lang='scss'>
    .swipe-up-wrapper {
        padding-bottom: 10px;
        box-sizing: border-box;
        .loading {
            width: 33%;
            display: block;
            margin: 0 auto;
            text-align: center;
            font-size: 14px;
            color: #b2b2b2;
            i {
                font-style: normal;
                background: url('../assets/images/loading.gif') no-repeat 0;
                background-size: 25px 25px;
                padding-left: 31px;
                height: 25px;
                display: inline-block;
                line-height: 25px;
            }
        }
    }

</style>
