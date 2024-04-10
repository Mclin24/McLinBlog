<template lang="">
    <div class="view-container" :style="{ height: viewHeight + 'px' }">
        <div
            class="virtual-content-container"
            @scroll="handleScroll"
            ref="contentContainerRef"
        >
            <div
                class="virtual-item-list"
                :style="{
                    height: `${data.length * itemHeight - startIndex * itemHeight}px`,
                    transform: `translate3d(0, ${startIndex * itemHeight}px, 0)`
                }"
            >
                <div
                    class="virtual-item"
                    :style="{
                        height: itemHeight + 'px'
                    }"
                    v-for="(item, index) in showData"
                    :key="index"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { rafThrottle } from '../utils/tool'
const data = new Array(100).fill(0).map((_, i) => i) // 源数据
const viewHeight = ref(1200) // 虚拟滚动可视区元素的高度
const itemHeight = ref(120) // 每一项高度
const showData = ref<number[]>([]) // 虚拟滚动区域要显示的数据数量
const maxShowCount = Math.ceil(viewHeight.value / itemHeight.value) + 1
showData.value = data.slice(0, maxShowCount)

const contentContainerRef = ref<HTMLDivElement | null>(null) // 虚拟滚动容器
const scrollTop = ref(0) // 滚动高度
const startIndex = ref(0) // 数据切片开始索引
let lastStartIndex = startIndex.value // 记录上一次的索引，用于缓存，解决不必要的重绘

const handleScroll = rafThrottle((e: any) => {
    scrollTop.value = e.target.scrollTop
    // 通过判断滚动高度来决定开始和结束的索引
    startIndex.value = Math.floor(e.target.scrollTop / itemHeight.value)
    if (lastStartIndex === startIndex.value) return
    lastStartIndex = startIndex.value
    let endIndex = startIndex.value + maxShowCount
    if (endIndex >= data.length) {
        for (let index = 0; index < maxShowCount; index++) {
            data.push(data.length + 1)
        }
    }
    endIndex = data[endIndex] ? endIndex : data.length
    showData.value = data.slice(startIndex.value, endIndex)
})
</script>
<style lang="scss">
.view-container {
    width: 400px;
    height: 600px;
    border: 1px solid red;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.virtual-content-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.virtual-item-list {
    width: 100%;
}

.virtual-item {
    width: 100%;
    text-align: center;
    background-color: lightblue;
    border-bottom: 1px solid #eee;
}
</style>
