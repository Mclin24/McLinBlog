<template>
    <div class="image-wrap">
        <div class="container" ref="fContainerRef">
            <ImageWaterFall
                :bottom="20"
                :column="column"
                :gap="10"
                :page-size="20"
                :request="getData"
            >
                <template #item="{ item, index, imageHeight }">
                    <ImageCard
                        :detail="{
                            title: item.title,
                            bgColor: colorArr[index % (colorArr.length - 1)],
                            author: item.author,
                            imageHeight
                        }"
                    ></ImageCard>
                </template>
            </ImageWaterFall>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import data1 from '@/data/data1.json'
import data2 from '@/data/data2.json'
import ImageWaterFall from '@/components/ImageWaterFall.vue'
import ImageCard from '@/components/ImageCard.vue'
import type { imageCardItem } from '../utils/type'
const fContainerRef = ref<HTMLDivElement | null>(null)
const column = ref(4)
const changeColumn = (width: number) => {
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
const fContainerResizeObserver = new ResizeObserver((entries) => {
    changeColumn(entries[0].target.clientWidth)
})

onMounted(() => {
    fContainerRef.value && fContainerResizeObserver.observe(fContainerRef.value)
})

onUnmounted(() => {
    fContainerRef.value &&
        fContainerResizeObserver.unobserve(fContainerRef.value)
})

const colorArr = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
const list1: imageCardItem[] = data1.data.items.map((item: any) => ({
    id: item.id,
    url: item.note_card.cover.url_pre,
    width: item.note_card.cover.width,
    height: item.note_card.cover.height,
    title: item.note_card.display_title,
    author: item.note_card.user.nickname
}))
const list2: imageCardItem[] = data2.data.items.map((item: any) => ({
    id: item.id,
    url: item.note_card.cover.url_pre,
    width: item.note_card.cover.width,
    height: item.note_card.cover.height,
    title: item.note_card.display_title,
    author: item.note_card.user.nickname
}))
const list = [...list1, ...list2]
const getData = (page: number, pageSize: number) => {
    return new Promise<imageCardItem[]>((resolve) => {
        setTimeout(() => {
            resolve(
                list.slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize
                )
            )
        }, 1000)
    })
}
</script>
<style lang="scss" scoped>
.image-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
        width: 80%;
        height: 60%;
        border: 1px solid red;
        padding: 20px;
        background-color: aquamarine;
    }

    .card-box {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
}
</style>
