import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue'
import VanillaJsTetris from '@/views/projects/VanillaJsTetris.vue'
import PianoRoll from '@/views/projects/PianoRoll.vue'
import RandomMazeGenerator from '@/views/projects/RandomMazeGenerator.vue'
import SlipperySlope from '@/views/projects/SlipperySlope.vue'
import Sudoku from '@/views/projects/Sudoku.vue'
import DDDMusicVisualizer from '@/views/projects/DDDMusicVisualizer.vue'
import TuneCode from '@/views/projects/TuneCode.vue'
import MusicVisualizer from '@/views/projects/MusicVisualizer.vue'
import MedirecVue from '@/views/projects/Medirec.vue'
import Projects from '@/views/Projects.vue'
import Games from '@/views/Games.vue'
import Lalu from '@/views/projects/Lalu.vue';

import Test from '@/views/projects/Test.vue'

const routes = [{
        path: '/',
        alias: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
    },
    {
        path: '/games',
        name: 'Games',
        component: Games,
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
        path : '/music-visualizer',
        name : 'MusicVisualizer',
        component : MusicVisualizer,
    },
    {
        path : '/medirec',
        name : 'Medirec',
        component : MedirecVue
    },
    {
        path: '/lalu',
        name: 'Lalu',
        component: Lalu,
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

router.beforeEach(function (transition) {
    window.scrollTo(0, 0)
})

export default router