<template>
    <div class='count-wrapper'>
        <span class='reduce' @click.stop='reduce'
              :class='{"stop-reduce":count===1}'>-</span>
        <input class='count-ipt'
               type='text' v-model='count'
               value='count'
               ref='ipt'
               oninput="value=value.replace(/[^\d]/g,'')">
        <span class='add' @click.stop='add'>+</span>
    </div>
</template>

<script>
    export default {
        name: "CountView",
        props: {
            maxCount: {
                type: Number,
                default: 0
            },
            innerCount: {
                type: Number,
                default: 1
            },
            listIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                count: this.innerCount
            }
        },
        methods: {
            reduce() {
                if (this.count === 1) return
                this.count--
            },
            add() {
                this.count++
            },
            onFocus() {
                this.$refs.ipt.focus()
            },
            getVal() {
                return this.count
            }

        },
        watch: {
            count(newVal) {
                if (newVal > this.maxCount && !this.innerCount) this.count = this.maxCount
                this.$emit('countChange', newVal, this.listIndex)
            }

        }

    }
</script>

<style scoped lang='scss'>
    .count-wrapper {
        .reduce {
            font-size: 20px;
            font-weight: 800;
            padding: 5px 8px;
            color: #333333;
        }
        .stop-reduce {
            color: #dddddd;
        }
        .add {
            font-weight: 800;
            font-size: 16px;
            padding: 5px 8px;
            color: #333333;

        }
        .count-ipt {
            border: 0;
            width: 40px;
            font-size: 14px;
            padding: 2px 0;
            outline: none;
            text-align: center;
            box-sizing: border-box;
            vertical-align: middle;
            background-color: #eee;
        }
    }
</style>
