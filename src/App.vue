<template>
    <div class="app">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"> </component>
            </keep-alive>
        </router-view>
    </div>
    <ParticlesView></ParticlesView>
</template>
<script setup lang="ts">
import ParticlesView from '@/views/ParticlesView.vue'
</script>
<style lang="scss">
.app {
    width: 100%;
    height: 100%;
}
.particles {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
