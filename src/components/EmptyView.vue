<template>
    <div class='empty-wrapper'>
        <div class='empty-content'>
            <img :src='setBg' class='empty-icon'></img>
            <p class='empty-tip'>{{getTip}}</p>
        </div>
    </div>
</template>

<script>
    const SHOPCAR_TYPE = 'shopCar'
    export default {
        name: "EmptyView",
        props: {
            pageType: {
                type: String,
                default: 'empty'
            }
        },
        computed: {
            setBg() {
                return this.pageType === SHOPCAR_TYPE ?
                    require('../assets/images/shopcar.png')
                    : require('../assets/images/empty.png')
            },
            getTip() {
                return this.pageType === SHOPCAR_TYPE ?
                    '登录后同步购物车数据' : '没有查到数据哦!'
            }
        }
    }
</script>

<style scoped lang='scss'>
    .empty-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .empty-content {
            .empty-icon {
                display: block;
                width: 150px;
                height: 150px;
            }
            .empty-tip {
                font-size: 16px;
                color: #ddd;
                padding-top: 10px;
                text-align: center;
            }
        }
    }
</style>
