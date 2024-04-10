<!-- <template lang="">
    <div class="view-container" @scroll="handleScroll" ref="viewContainerRef" :style="{ height: viewHeight + 'px' }">
        <div class="content-container">
            <div class="item-container">
                <div
                class="item"
                :style="{
                    height: itemHeight + 'px',
                }"
                v-for="(item, index) in showData"
                :key="Math.random(index) * 200"
                >{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { throttle } from "../utils/tool";
    const data = new Array(20).fill(0).map((_, i) => i)
    const viewHeight = ref(600)
    const itemHeight = ref(120)
    const showData = ref<number[]>([]) // 虚拟滚动区域要显示的数据数量

    showData.value = data.slice(0, 5)
    const viewContainerRef = ref<HTMLDivElement | null>(null)
    const scrollTop = ref(0)
    const maxShowCount = Math.ceil(viewHeight.value / itemHeight.value) + 1
    const startIndex = ref(0)
    const endIndex = ref(0)
    let lastStartIndex = 0
    const handleScroll = throttle((e: any) => {
        console.log(e);
        scrollTop.value = e.target.scrollTop
        // 通过判断滚动高度来决定开始和结束的索引
        startIndex.value = Math.floor(e.target.scrollTop / itemHeight.value)
        if (lastStartIndex === startIndex.value) return
        lastStartIndex = startIndex.value
        endIndex.value = startIndex.value + maxShowCount
        // showData.value = data.slice(startIndex.value, endIndex.value)
    }, 200)
    onMounted(() => {
        console.log(viewContainerRef);
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
    .content-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    .item-container {
        width: 100%;
    }

    .item {
        width: 100%;
        text-align: center;
        background-color: lightblue;
        border-bottom: 1px solid #eee;
    }
</style> -->
