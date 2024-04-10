<template>
    <div class="wf-container" ref="containerRef" @scroll="handleScroll">
        <div class="wf-list" ref="listRef">
            <div
                class="wf-item"
                v-for="(item, index) in state.cardList"
                :key="item.id"
                :style="{
                    width: `${state.cardPos[index].width}px`,
                    transform: `translate3d(${state.cardPos[index].x}px, ${state.cardPos[index].y}px, 0)`
                }"
            >
                <slot
                    name="item"
                    :item="item"
                    :index="index"
                    :imageHeight="state.cardPos[index].imageHeight"
                ></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    computed,
    nextTick,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    watch
} from 'vue'
import type { waterFallProps, imageCardItem, imageCardPos } from '@/utils/type'
import { rafThrottle, debounce } from '../utils/tool'

const props = defineProps<waterFallProps>()
const containerRef = ref<HTMLDivElement | null>(null) // 容器
const listRef = ref<HTMLDivElement | null>(null)
defineSlots<{
    item(props: {
        item: imageCardItem
        index: number
        imageHeight: number
    }): any
}>()
const state = reactive({
    // 定义组件的data
    isFinish: false, // 判断是否已经没有数据，后续不再发送请求
    loading: false,
    page: 1,
    cardWidth: 0,
    cardList: [] as imageCardItem[], // 卡片源数据
    cardPos: [] as imageCardPos[], // 每一张图片的位置
    columnHeight: new Array(props.column).fill(0) as number[],
    preLength: 0
})
// 计算最小列高度和卡片索引
const minColumn = computed(() => {
    let minIndex = -1,
        minHeight = Infinity
    state.columnHeight.forEach((item, index) => {
        if (item < minHeight) {
            minHeight = item
            minIndex = index
        }
    })
    return {
        minIndex,
        minHeight
    }
})
const computedImageHeight = (list: imageCardItem[]) => {
    list.forEach((item) => {
        const imageHeight = Math.floor(
            (state.cardWidth * item.height) / item.width
        )
        state.cardPos.push({
            width: state.cardWidth,
            height: 0,
            imageHeight: imageHeight,
            x: 0,
            y: 0
        })
    })
}
const computedRealDom = (list: imageCardItem[]) => {
    const children = listRef.value!.children
    list.forEach((_, index) => {
        const nextIndex = state.preLength + index
        const cardHeight = children[nextIndex].getBoundingClientRect().height
        if (index < props.column && state.cardList.length <= props.pageSize) {
            state.cardPos[nextIndex] = {
                ...state.cardPos[nextIndex],
                height: cardHeight,
                x:
                    nextIndex % props.column !== 0
                        ? nextIndex * (state.cardWidth + props.gap)
                        : 0,
                y: 0
            }
            state.columnHeight[nextIndex] = cardHeight + props.gap
        } else {
            const { minIndex, minHeight } = minColumn.value
            state.cardPos[nextIndex] = {
                ...state.cardPos[nextIndex],
                height: cardHeight,
                x:
                    minIndex % props.column !== 0
                        ? minIndex * (state.cardWidth + props.gap)
                        : 0,
                y: minHeight
            }
            state.columnHeight[minIndex] += cardHeight + props.gap
        }
    })
    state.preLength = state.cardPos.length
}
const computedCardPos = async (list: imageCardItem[]) => {
    computedImageHeight(list)
    await nextTick()
    computedRealDom(list)
}

// 封装一个获取卡片数据方法
const getCardList = async (page: number, pageSize: number) => {
    if (state.isFinish) return
    state.loading = true
    const list = await props.request(page, pageSize)
    state.loading = false
    if (!list.length) {
        state.isFinish = true
        return
    }
    state.cardList = [...state.cardList, ...list]
    computedCardPos(list)
}

const handleScroll = rafThrottle(() => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.value!
    const bottom = scrollHeight - scrollTop - clientHeight
    if (bottom <= props.bottom) {
        !state.loading && getCardList(state.page, props.pageSize)
    }
})
const handleResize = debounce(() => {
    if (containerRef.value) {
        const containerWidth = containerRef.value!.clientWidth
        state.cardWidth =
            (containerWidth - props.gap * (props.column - 1)) / props.column
        state.columnHeight = new Array(props.column).fill(0)
        state.cardPos = []
        state.preLength = 0
        computedCardPos(state.cardList)
    }
})
const resizeObserver = new ResizeObserver(() => {
    handleResize()
})
const init = () => {
    if (containerRef.value) {
        const containerWidth = containerRef.value?.clientWidth || 0 // 容器宽度
        state.cardWidth =
            (containerWidth - props.gap * (props.column - 1)) / props.column // 每个卡片的宽度
        getCardList(state.page, props.pageSize)
        resizeObserver.observe(containerRef.value)
    }
}
watch(
    () => props.column,
    () => {
        console.log(props.column)
        handleResize()
    }
)
onMounted(() => {
    init()
})
onUnmounted(() => {
    containerRef.value && resizeObserver.unobserve(containerRef.value)
})
</script>
<style lang="scss" scoped>
.wf {
    &-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll; // 注意需要提前设置展示滚动条，如果等数据展示再出现滚动造成计算偏差
        overflow-x: hidden;
    }

    &-list {
        width: 100%;
        position: relative;
    }
    &-item {
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        transition: all 0.3s;
    }
}
</style>
