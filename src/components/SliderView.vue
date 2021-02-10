<template>
    <div class='slider-wrapper' ref='sliderWrapper'>
        <div class='slider-container' v-show='sliderData.length>0'>
            <div
                    class='slider-item'
                    v-for='(item,index) in sliderData'
                    @click=''
                    :key='index'>
                <img class='slider-img' :src='item.pic' alt=''>
            </div>
        </div>
        <div class='point-wrapper'>
            <span class='default-point' v-for='(item,index) in sliderData'
                  :class='{"point-active":curIndex===index}'></span>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import Slide from '@better-scroll/slide'

    BScroll.use(Slide)
    export default {
        name: "SliderView",
        props: {
            sliderData: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                curIndex: 0
            }
        },
        beforeDestroy() {
            this.slideView.destroy()
        },
        methods: {
            initBScroll() {
                console.log('initBScroll')
                this.slideView = new BScroll(this.$refs.sliderWrapper, {
                    scrollX: true,
                    scrollY: false,
                    slide: true,
                    momentum: false,
                    bounce: false,
                    probeType: 3,
                    click: true
                })
                this.slideView.on('slidePageChanged', (page) => {
                    this.curIndex = page.pageX
                })
            },
            refresh() {
                console.log('refresh', this.sliderData)

                this.slideView && this.slideView.refresh()
            }
        },
        watch: {
            sliderData(newSliderData) {
                console.log('newSliderData----', newSliderData)
                if (this.slideView) {
                    this.refresh();
                    return
                }
                setTimeout(() => {
                    // this.refresh()
                    this.initBScroll()
                }, 20)
            }
        }
    }
</script>

<style scoped lang='scss'>
    .slider-wrapper {
        position: relative;
        overflow: hidden;
        .slider-container {
            box-sizing: border-box;
            white-space: nowrap;
            .slider-item {
                display: inline-block;
                height: 200px;
                padding: 0 20px;
                width: 100%;
                box-sizing: border-box;
                .slider-img {
                    border-radius: 10px;
                    width: 100%;
                    height: 200px;
                }
            }
        }
        .point-wrapper {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            .default-point {
                width: 6px;
                height: 6px;
                border-radius: 3px;
                margin: 0 2px 10px 2px;
                display: inline-block;
                background-color: white;
            }
            .point-active {
                width: 12px;
                background-color: red;
            }
        }
    }


</style>
