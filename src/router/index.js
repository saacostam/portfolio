import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import VanillaJsTetris from '../views/projects/VanillaJsTetris.vue'

const routes = [{
        path: '/',
        alias: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/vanilla-js-tetris',
        name: 'VanillaJsTetris',
        component: VanillaJsTetris
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router