<template>
    <section class='tag-container-root'>
        <section
                class='tag-warpper'
                ref='tagWarpper'>
            <ul v-if='tagList.length>0'
                ref='tagContainer'>
                <li v-for='(item,index) in tagList' :key='index'
                    class='tag-item'
                    ref='tagItem'
                    @click='selectTag(item)'>
                    {{item}}
                </li>
            </ul>
        </section>
        <section class='toggle-warper'>
            <i class='icon-shouqi1 icon-back icon-toggle'
               ref='toggleBtn'
               @click='toggleHeight'></i>
        </section>
    </section>
</template>

<script>
    import {prefixStyle} from '../utils/dom'

    const transform = prefixStyle('transform')

    const reqHeight = 35
    export default {
        name: 'TagContainer',
        props: {
            tagList: {
                type: Array,
                default: null
            },
            showRow: {
                type: Number,
                default: 2
            }
        },
        data() {
            return {
                showAll: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.tagWarpper.style.height = `${reqHeight * this.showRow}px`
                const tagWarpperH = this.$refs.tagContainer.clientHeight
                if (tagWarpperH > 0) this.originHeight = tagWarpperH
            })
        },
        methods: {
            selectTag(item) {
                this.$emit('selectTag', item)
            },
            toggleHeight() {
                console.log('toggleHeight', this.showAll)
                this.showAll = !this.showAll
                this.$refs.tagWarpper.style.transition = 'all 0.3s'
                this.$refs.toggleBtn.style.transition = 'all 0.3s'
                if (this.showAll) {
                    this.$refs.toggleBtn.style[transform] = 'rotate(0deg)'
                    this.$refs.tagWarpper.style.height = `${this.originHeight}px`
                    this.showAll = true
                } else {
                    this.$refs.toggleBtn.style[transform] = 'rotate(180deg)'
                    this.$refs.tagWarpper.style.height = `${reqHeight * this.showRow}px`
                    this.showAll = false
                }
                this.$emit('toggleHeight')
            }
        },
        watch: {
            tagList(newList) {
                console.log('newList', newList, this.$refs.tagWarpper)
                if (newList.length > 0 && this.$refs.tagWarpper) {
                    this.$nextTick(() => {
                        const tagWarpperH = this.$refs.tagContainer.clientHeight
                        if (tagWarpperH > 0) this.originHeight = tagWarpperH
                    })
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import "../styles/variables";

    .tag-container-root {
        padding-top: 10px;
        padding-bottom: 30px;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        width: 100%;
        .toggle-warper {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 20px;
            bottom: 0;
            text-align: center;
            background-color: white;
            .icon-toggle {
                font-size: 18px;
                line-height: 20px;
                height: 20px;
                vertical-align: top;
                display: inline-block;
                transform: rotate(-180deg);
                color: #ddd;
                font-weight: 700;
                font-size: 22px;
            }
        }

        .tag-warpper {
            overflow: hidden;
            padding: 0 10px;
            .tag-item {
                padding: 0 10px;
                background-color: #f9f9f9;
                color: #999;
                height: 25px;
                font-size: 14px;
                line-height: 25px;
                font-weight: 600;
                border-radius: 5px;
                margin: 0 0 10px 10px;
                display: inline-block;
            }
        }
    }
</style>
