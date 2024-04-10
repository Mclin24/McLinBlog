import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Pratice from '@/views/pratice.vue'
import Robot from '@/views/Robot.vue'
import PictureWall from '@/views/PictureWall.vue'
import VirtualScroll from '@/views/VirtualScroll.vue'
import McWallFlow from '@/views/McWallFlow.vue'
import ParticlesView from '@/views/ParticlesView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        name: '',
        component: Home,
        children: []
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/pratice',
        name: 'Pratice',
        component: Pratice
    },
    {
        path: '/robot',
        name: 'Robot',
        component: Robot
    },
    {
        path: '/picture_wall',
        name: 'PictureWall',
        component: PictureWall
    },
    {
        path: '/virtual_scroll',
        name: 'VirtualScroll',
        component: VirtualScroll
    },
    {
        path: '/mc_wall_flow',
        name: 'McWallFlow',
        component: McWallFlow
    },
    {
        path: '/particles_view',
        name: 'ParticlesView',
        component: ParticlesView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
