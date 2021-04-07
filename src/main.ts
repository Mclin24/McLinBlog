import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 引入阿里云图标库
import "../src/assets/iconfont/iconfont.css"
createApp(App).use(store).use(router).mount('#app')
