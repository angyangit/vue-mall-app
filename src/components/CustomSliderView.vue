<template>
    <div class='pro-imgs-lwrapper'
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd">
        <ul class='imgs-container'
            ref='slideContainer'>
            <li class='imgs-item'
                v-for='(item,index) in dataList'
                :key='index'>
                <img v-lazy='item' class='img-pro'>
            </li>
        </ul>
        <span class='count-tip'>{{getTip}}</span>
    </div>
</template>

<script>
    import {prefixStyle} from '../utils/dom';

    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')

    export default {
        name: "CustomSliderView",
        props: {
            dataList: {
                type: Array,
                default: []
            }
        },
        computed: {
            getTip() {
                return `${this.curIndex + 1}/${this.dataList.length}`
            }
        },
        data() {
            return {
                curIndex: 0
            }
        },
        created() {
            this.touchInfo = {windowW: window.innerWidth, index: 0}
        },
        methods: {
            touchStart(e) {
                this.touchInfo.startX = e.touches[0].pageX
                this.touchInfo.startY = e.touches[0].pageY
                this.touchInfo.touchInit = true
            },
            touchMove(e) {
                if (!this.touchInfo.touchInit) return
                const deltaX = e.touches[0].pageX - this.touchInfo.startX
                const deltaY = e.touches[0].pageY - this.touchInfo.startY
                if (Math.abs(deltaX) < Math.abs(deltaY)) {
                    return
                }
                e.preventDefault()
                this.touchInfo.deltaX = deltaX

                this.$refs.slideContainer.style[transform] = `translateX(${this.touchInfo.finalDeltaX + deltaX}px)`
                this.$refs.slideContainer.style[transitionDuration] = null
                console.log(this.touchInfo.deltaX)
            },
            touchEnd() {
                this.touchInfo.touchInit = false
                if (Math.abs(this.touchInfo.deltaX) > this.touchInfo.windowW / 3) {
                    if (this.touchInfo.deltaX > 0) {
                        if (this.curIndex === 0) {
                            this.curIndex = 0
                        } else {
                            this.curIndex--
                        }
                    } else {
                        if (this.curIndex === this.dataList.length-1) {
                            this.curIndex = this.dataList.length - 1
                        } else {
                            this.curIndex++
                        }
                    }
                }
                this.touchInfo.finalDeltaX = -(this.touchInfo.windowW * this.curIndex)
                this.$refs.slideContainer.style[transform] = `translateX(${this.touchInfo.finalDeltaX}px)`
                this.$refs.slideContainer.style[transitionDuration] = '500ms'
            },
        }
    }
</script>

<style scoped lang='scss'>
    .pro-imgs-lwrapper {
        width: 100%;
        position: relative;
        .imgs-container {
            display: flex;
            flex-wrap: nowrap;
            height: 300px;
            .imgs-item {
                width: 100%;
                height: 100%;
                display: inline-block;
                background-color: white;
                text-align: center;
                margin: 0 auto;
                flex-shrink: 0;
                .img-pro {
                    text-align: center;
                    height: 100%;
                }
            }
        }
        .count-tip {
            position: absolute;
            right: -6px;
            padding: 0 10px;
            font-size: 16px;
            display: inline-block;
            line-height: 20px;
            bottom: 30px;
            color: white;
            font-weight: 600;
            border-radius: 10px;
            background-color: #ccc;
        }
    }
</style>
