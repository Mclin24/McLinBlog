<template>
    <div
        class="mc-water-fall-container"
        ref="containerRef"
        @scroll="handleScroll"
    >
        <div class="mc-water-fall-list" ref="listRef">
            <div
                class="mc-water-fall-item"
                v-for="(item, index) in reativeData.listData"
                :key="item.id"
                :style="{
                    width: reativeData.flowItemPosition[index]?.width + 'px',
                    transform: `translate3d(${reativeData.flowItemPosition[index]?.x}px, ${reativeData.flowItemPosition[index]?.y}px, 0)`
                }"
            >
                <slot
                    name="item"
                    :item="item"
                    :index="index"
                    :imageHeight="
                        Math.floor(
                            (reativeData.flowItemWidth * item.height) /
                                item.width
                        )
                    "
                ></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    reactive,
    onMounted,
    onUnmounted,
    watch,
    ref,
    nextTick,
    computed
} from 'vue'
import type { flowProps, flowItemInfo, imageInfo } from '@/utils/fallFlowType'
import { debounce, throttle } from '@/utils/tool'
const containerRef = ref<HTMLDivElement | null>(null)
const listRef = ref<HTMLDivElement | null>(null)
const props = defineProps<flowProps>()
const emit = defineEmits(['getData'])
const reativeData = reactive({
    page: 1,
    pageSize: 20,
    flowItemWidth: 0,
    listData: [] as imageInfo[],
    flowItemPosition: [] as flowItemInfo[],
    flowColumnHeight: new Array(props.column).fill(0) as number[] // 记录每一行的高度，贪心算法
})

defineSlots<{
    item(props: { item: imageInfo; index: number; imageHeight: number }): any
}>()

const getData = () => {
    emit('getData', {
        page: reativeData.page,
        pageSize: reativeData.pageSize
    })
}

// 获取每列的最小高度
const minColumnHeight = computed(() => {
    let minHeight = Infinity
    let minIndex = -1
    reativeData.flowColumnHeight.forEach((item, index) => {
        if (item < minHeight) {
            minHeight = item
            minIndex = index
        }
    })
    return {
        minHeight,
        minIndex
    }
})
// 1、卡片大小由图片等比例缩放得到
// TODO: BUG: 由于加了过渡，导致getBoundingClientRect()获取的height不准确
const computeFallItemImageHeight = (list: imageInfo[]) => {
    list.forEach((item) => {
        const imageHeight = Math.floor(
            (reativeData.flowItemWidth * item.height) / item.width
        )
        // 每个卡片内图片的高度
        reativeData.flowItemPosition.push({
            width: reativeData.flowItemWidth,
            height: 0,
            imageHeight,
            x: 0,
            y: 0
        })
    })
}
// 2、根据贪心算法，算出每个卡片的位置
const computeFallItemPosition = (list: imageInfo[]) => {
    const children = listRef.value!.children // 每个瀑布流DOM元素
    list.forEach((_, index) => {
        const currentFallItemHeight = Math.floor(
            children[index].getBoundingClientRect().height
        )
        if (index < props.column) {
            // 第一行特殊处理
            reativeData.flowItemPosition[index].height = currentFallItemHeight
            reativeData.flowItemPosition[index].x =
                index % props.column == 0
                    ? 0
                    : (reativeData.flowItemWidth + props.gap) * index
            reativeData.flowItemPosition[index].y = 0
            reativeData.flowColumnHeight[index] =
                currentFallItemHeight + props.gap
        } else {
            const { minHeight, minIndex } = minColumnHeight.value
            reativeData.flowItemPosition[index].height = currentFallItemHeight
            reativeData.flowItemPosition[index].x =
                minIndex % props.column == 0
                    ? 0
                    : (reativeData.flowItemWidth + props.gap) * minIndex
            reativeData.flowItemPosition[index].y = minHeight
            reativeData.flowColumnHeight[minIndex] +=
                currentFallItemHeight + props.gap
        }
    })
}
const renderFallFlow = (list: imageInfo[]) => {
    console.log('renderFallFlow')
    computeFallItemImageHeight(list)
    nextTick(() => {
        computeFallItemPosition(list)
    })
}
// 3、监听页面宽度缩放，重新求出每一项卡片宽度
const handleResize = debounce(() => {
    if (containerRef.value) {
        const containerWidth = containerRef.value!.clientWidth || 0
        reativeData.flowItemWidth = Math.floor(
            (containerWidth - (props.column - 1) * props.gap) / props.column
        )
        reativeData.flowColumnHeight = new Array(props.column).fill(0)
        reativeData.flowItemPosition = []
        renderFallFlow(reativeData.listData)
    }
})
// 4、滑动加载更多
const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.value!
    const bottom = scrollHeight - clientHeight - scrollTop
    if (bottom < props.bottom) {
        getData()
    }
}, 500)
const resizeObserver = new ResizeObserver(() => {
    handleResize()
})
watch(
    () => props.list,
    (newList) => {
        console.log('数据发生变化了')
        reativeData.listData = reativeData.listData.concat(newList)
        console.log('🚀 ~ reativeData.listData:', reativeData.listData)
        renderFallFlow(reativeData.listData)
    }
)
watch(
    () => props.column,
    (newColumn) => {
        console.log('每一列数量变了', newColumn)
        handleResize()
    }
)

const init = () => {
    getData()
    if (containerRef.value) {
        const containerWidth = containerRef.value!.clientWidth || 0
        reativeData.flowItemWidth =
            (containerWidth - (props.column - 1) * props.gap) / props.column
        resizeObserver.observe(containerRef.value)
    }
}
onMounted(() => {
    init()
})
onUnmounted(() => {
    containerRef.value && resizeObserver.unobserve(containerRef.value)
})
</script>
<style lang="scss" scoped>
.mc-water-fall {
    &-container {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    &-list {
        width: 100%;
        position: relative;
    }
    &-item {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 20px;
        // transition: all 0.1s;
        overflow: hidden;
    }
}
</style>
