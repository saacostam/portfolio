import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue'
import VanillaJsTetris from '@/views/projects/VanillaJsTetris.vue'
import PianoRoll from '@/views/projects/PianoRoll.vue'
import RandomMazeGenerator from '@/views/projects/RandomMazeGenerator.vue'
import SlipperySlope from '@/views/projects/SlipperySlope.vue'
import Sudoku from '@/views/projects/Sudoku.vue'
import DDDMusicVisualizer from '@/views/projects/DDDMusicVisualizer.vue'
import TuneCode from '@/views/projects/TuneCode.vue'

import Test from '@/views/projects/Test.vue'

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
    },
    {
        path: '/slippery-slope',
        name: 'SlipperySlope',
        component: SlipperySlope
    },
    {
        path : '/sudoku',
        name: 'Sudoku',
        component: Sudoku,
    },
    {
        path : '/3d-music-visualizer',
        name: '3dMusicVisualizer',
        component: DDDMusicVisualizer,
    },
    {
        path : '/tune-code',
        name: 'TuneCode',
        component: TuneCode,
    },


    {
        path: '/test',
        name: 'Test',
        component: Test,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router