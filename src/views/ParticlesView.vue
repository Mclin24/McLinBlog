<template>
    <vue-particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="particlesConfig"
    >
    </vue-particles>
</template>
<script setup lang="ts">
import { loadFull } from 'tsparticles'
import particlesConfig from '@/components/particles/nasa-config.json'
const particlesInit = async (engine: any) => {
    await loadFull(engine)
}

const particlesLoaded = async (container: any) => {
    console.log('Particles container loaded', container)
}
</script>
<style>
#tsparticles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(at center top, #c4c6c6, #000016);
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    z-index: -1;
}
</style>
