import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
// 引入阿里云图标库
import '../src/assets/iconfont/iconfont.css'
import ToolsTip from '@/components/toolsTip.vue' // @ is an alias to /src
import ImageHover from '@/components/ImageHover.vue' // @ is an alias to /src
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
const mcApp = createApp(App)
mcApp
    .use(store)
    .use(router)
    .use(Particles, {
        init: async (engine: any) => {
            await loadFull(engine) // you can load the full tsParticles library from "tsparticles" if you need it
        }
    })
    .component('ImageHover', ImageHover)
    .component('ToolsTip', ToolsTip)
    .mount('#app')
