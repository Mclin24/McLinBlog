<!-- 这是瀑布流顶层容器设计 -->
<template>
    <div class="mc-wall-flow-wrap">
        <div class="mc-wall-flow-container" ref="flowContainerRef">
            <McWaterFall
                :gap="10"
                :column="column"
                :bottom="20"
                :list="obj.list"
                @get-data="handleGetData"
            >
                <template #item="{ item, index, imageHeight }">
                    <McWaterFallItem
                        :detail="{
                            title: item.title,
                            bgColor: colorArr[index % (colorArr.length - 1)],
                            author: item.author,
                            imageHeight
                        }"
                    ></McWaterFallItem>
                </template>
            </McWaterFall>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import data1 from '@/data/data1.json'
import data2 from '@/data/data2.json'
import type { imageInfo } from '@/utils/fallFlowType'
import McWaterFall from '@/components/McWaterFall.vue'
import McWaterFallItem from '@/components/McWaterFallItem.vue'

const column = ref(0)
const flowContainerRef = ref(null)
const colorArr = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
const getColumn = (width: number) => {
    if (width > 960) {
        column.value = 5
    } else if (width >= 690 && width < 960) {
        column.value = 4
    } else if (width >= 500 && width < 690) {
        column.value = 3
    } else {
        column.value = 2
    }
}

const resizeObserver = new ResizeObserver((ResizeObserverEntry) => {
    getColumn(ResizeObserverEntry[0].target.clientWidth)
})

const list1: imageInfo[] = data1.data.items.map((item: any) => ({
    id: item.id,
    url: item.note_card.cover.url_pre,
    width: item.note_card.cover.width,
    height: item.note_card.cover.height,
    title: item.note_card.display_title,
    author: item.note_card.user.nickname
}))
const list2: imageInfo[] = data2.data.items.map((item: any) => ({
    id: item.id,
    url: item.note_card.cover.url_pre,
    width: item.note_card.cover.width,
    height: item.note_card.cover.height,
    title: item.note_card.display_title,
    author: item.note_card.user.nickname
}))
const totalList = [...list1, ...list2]
const getData = (page: number, pageSize: number) => {
    return new Promise<imageInfo[]>((resolve) => {
        setTimeout(() => {
            resolve(totalList.slice((page - 1) * pageSize, page * pageSize))
        }, 1000)
    })
}
const obj = ref({
    list: [] as imageInfo[]
})
const handleGetData = async (arg: any) => {
    obj.value.list = await getData(arg.page, arg.pageSize)
}
onMounted(async () => {
    flowContainerRef.value && resizeObserver.observe(flowContainerRef.value)
})
onUnmounted(() => {
    flowContainerRef.value && resizeObserver.unobserve(flowContainerRef.value)
})
</script>
<style lang="scss" scoped>
.mc-wall-flow-wrap {
    width: 100vw;
    height: 100vh;
    // background-color: lavender;
    display: flex;
    align-items: center;
    justify-content: center;
    .mc-wall-flow-container {
        width: 80%;
        height: 60%;
        border: 1px solid lawngreen;
        padding: 20px;
        background-color: aqua;
    }
}
</style>
@/utils/fallFlowType
