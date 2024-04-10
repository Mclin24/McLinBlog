<template>
    <div class="ImageFall">
        相册页面{{ enterCount }}
        <button @click="handleClick">按钮</button>
        <div class="triAngel">三角形</div>
        <div v-for="(item, index) in testArr" :key="index">{{ item }}</div>
        <button @click="handleTest">点击测试</button>
    </div>
</template>
<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import _LazyMan from '@/utils/LazyMan'
let timer: any = null
let canRun: boolean = true
export default defineComponent({
    data() {
        return {
            enterCount: 0,
            arr: [[12, 21, [2, 3, 4]], [{ a: 1, b: 2 }], 2, 3],
            testArr: [1, 2, 3, 4, 5]
        }
    },
    created() {
        // const result = this.flatten(this.arr)
        // const result2 = this.reduceFlat(this.arr)
        // console.log(result)
        // console.log(result2)
        let lazyMan = (name: string) => new _LazyMan(name)
        lazyMan('mclin24').sleepFirst(3).eat('she')
    },
    methods: {
        Count() {
            this.enterCount++
        },
        // 数组扁平化, 递归的方法
        flatten(arr: Array<any>): Array<any> {
            let result: Array<any> = []
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    result = result.concat(this.flatten(arr[i]))
                } else {
                    result.push(arr[i])
                }
            }
            return result
        },
        // reduce方法
        reduceFlat(arr: Array<any>): Array<any> {
            return arr.reduce((acc: Array<any>, cur) => {
                return acc.concat(
                    Array.isArray(cur) ? this.reduceFlat(cur) : cur
                )
            }, [])
        },
        // 防抖 (多次触发，目标函数只会执行一次)
        debonce(fn: Function, delay: number) {
            const that = this
            return function (num: number) {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    fn.apply(that, arguments)
                }, delay)
            }
        },
        handleClick() {
            this.debonce(this.consoleSomething, 1000)(123)
            this.throttle(this.consoleSomething, 1000)(456)
            this.$router.push({
                path: '/robot'
            })
        },
        consoleSomething(args: number) {
            console.log(args)
        },
        // 节流 （多次触发，目标函数在设定的delay延时中只会执行一次）
        throttle(fn: Function, delay: number) {
            const that = this
            return function (params?: number) {
                if (!canRun) return
                canRun = false
                setTimeout(() => {
                    fn.apply(that, arguments)
                    canRun = true
                }, delay)
            }
        },
        handleTest() {
            this.testArr[0] = 0
            // this.testArr.push(6)
        }
    }
})
</script>
<style lang="scss" scope>
.ImageFall {
    width: 100%;
    height: 100%;
    background: white;
    padding: 100px;
    .triAngel {
        width: 100px;
        position: relative;
    }
    .triAngel:before {
        content: '';
        position: absolute;
        left: -20px;
        border-left: 11px solid red;
        border-right: 11px solid transparent;
        border-top: 11px solid transparent;
        border-bottom: 11px solid transparent;
    }
}
</style>
