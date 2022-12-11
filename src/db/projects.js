const projects = [
    {
        id: 0,
        name: '🛍️ Fake Store',
        desc: 'A front-end application that uses mock-data from fakestoreapi.com',
        tech: ['frontend', 'vue', 'api'],
        rating: 4.3,
        image: 'img/fake-store.png',
        link: 'https://saacostam.github.io/fake-store/#/explore',
    },
    {
        id: 1,
        name: '👾 Tetris',
        desc: 'A Tetris clone built using Vue',
        tech: ['game', 'frontend', 'vue'],
        rating: 3.5,
        image: 'img/tetris.png',
        link: '/vanilla-js-tetris',
    },
    {
        id: 2,
        name: '🎹 Piano Roll',
        desc: 'A functional Piano Roll for web music prototyping',
        tech: ['frontend', 'vue'],
        rating: 4.0,
        image: 'img/piano-roll.png',
        link: '/piano-roll',
    },
    {
        id:3,
        name: 'Random Maze Generator 🕹',
        desc: 'A game with randomly generated mazes and path validation',
        tech: ['game', 'frontend', 'vue', 'algorithms'],
        rating: 2.2,
        image: 'img/random-maze-generator.png',
        link: '/random-maze-generator'
    },
    {
        id:4,
        name: '🐧 Slippery Slope',
        desc: 'A platform game built using the Canvas element',
        tech: ['game', 'frontend', 'canvas'],
        rating: 3.6,
        image: 'img/slippery-slope.png',
        link: '/slippery-slope'
    },
    {
        id:5,
        name: '🧠 mem',
        desc: 'A card-based studying application for students',
        tech: ['frontend', 'vue', 'backend', 'nodejs', 'mongodb'],
        rating: 4.6,
        image: 'img/mem.png',
        link: 'https://mem.onrender.com/#/login'
    },
    {
        id:6,
        name: '🎵 TuneCode',
        desc: 'A web based programming language and IDE',
        tech: ['frontend', 'vue', 'antlr', 'audio API'],
        rating: 4.6,
        image: 'img/tunecode.png',
        link: '/tune-code'
    },
    {
        id:7,
        name : '🚀 3D Music Visualizer',
        desc : 'A 3D music visualizer that uses audio API analysis and p5.js with WEBGL',
        tech : ['frontend', 'audio API', 'WEBGL', 'p5.js'],
        rating : 4.0,
        image: 'img/3dmusicvisualizer.png',
        link: '/3d-music-visualizer/',
    },
    {
        id:8,
        name : '✍ Sudoku',
        desc : 'A sudoku game built using the Canvas element',
        tech : ['game', 'frontend', 'canvas'],
        rating : 2.5,
        image: 'img/sudoku.png',
        link: '/sudoku',
    }
]

export default projects;