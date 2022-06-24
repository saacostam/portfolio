import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue'
import VanillaJsTetris from '@/views/projects/VanillaJsTetris.vue'
import Sequencer from '@/views/projects/Sequencer.vue'

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
    },
    {
        path: '/sequencer',
        name: 'Sequencer',
        component: Sequencer
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router