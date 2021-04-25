import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import ImageFall from '@/views/ImageFall.vue'
import Robot from '@/views/Robot.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    name: '',
    component: Home
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/image_fall',
    name: 'ImageFall',
    component: ImageFall
  }, {
    path: '/robot',
    name: 'Robot',
    component: Robot
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
