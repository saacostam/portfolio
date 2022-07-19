import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue'
import VanillaJsTetris from '@/views/projects/VanillaJsTetris.vue'
import PianoRoll from '@/views/projects/PianoRoll.vue'
import RandomMazeGenerator from '@/views/projects/RandomMazeGenerator.vue'

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
        path: '/piano-roll',
        name: 'PianoRoll',
        component: PianoRoll
    },
    {
        path: '/random-maze-generator',
        name: 'RandomMazeGenerator',
        component: RandomMazeGenerator
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router