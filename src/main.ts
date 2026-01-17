import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/iconfont/iconfont.css'
import ToolsTip from '@/components/toolsTip.vue'
import ImageHover from '@/components/ImageHover.vue'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'

const pinia = createPinia()
const mcApp = createApp(App)

mcApp
    .use(pinia)
    .use(router)
    .use(Particles, {
        init: async (engine: any) => {
            await loadFull(engine)
        }
    })
    .component('ImageHover', ImageHover)
    .component('ToolsTip', ToolsTip)
    .mount('#app')
