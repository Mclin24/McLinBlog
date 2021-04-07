<template>
    <div class="ImageFall">
        相册页面{{enterCount}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            enterCount: 0,
            arr: [[12,21, [2,3,4]], [{a: 1, b:2}], 2, 3]
        }
    },
    created() {
        const result = this.flatten(this.arr)
        const result2 = this.reduceFlat(this.arr)
        console.log(result)
        console.log(result2)
    },
    methods: {
        Count () {
            this.enterCount++
        },
        // 数组扁平化, 递归的方法
        flatten (arr: Array<any>): Array<any> {
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
        reduceFlat (arr: Array<any>): Array<any> {
            return arr.reduce((acc: Array<any>, cur) =>{
                return acc.concat((Array.isArray(cur) ? this.reduceFlat(cur) : cur))
            }, [])
        }
    }
})
</script>
<style lang="scss" scope>
    .ImageFall {
        width: 100%;
        height: 100%;
        background: white;
    }
</style>
