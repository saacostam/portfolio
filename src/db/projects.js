const projects = [
    {
        id: 0,
        name: 'Fake Store',
        desc: 'A front-end application that uses mock-data from fakestoreapi.com',
        tech: ['front', 'vue'],
        rating: 4.5,
        image: 'img/fake-store.png',
        link: 'https://saacostam.github.io/fake-store/#/explore',
    },
    {
        id: 1,
        name: 'Tetris',
        desc: 'A Tetris clone built using Vue',
        tech: ['game', 'front', 'vue'],
        rating: 3.8,
        image: 'img/tetris.png',
        link: '/vanilla-js-tetris',
    },
    {
        id: 2,
        name: 'Piano Roll',
        desc: 'A functional Piano Roll for web music prototyping',
        tech: ['front', 'vue'],
        rating: 4.0,
        image: 'img/piano-roll.png',
        link: '/piano-roll',
    },
    {
        id:3,
        name: 'Random Maze Generator',
        desc: 'A game with randomly generated mazes and path validation.',
        tech: ['game', 'front', 'vue', 'algorithms'],
        rating: 2.8,
        image: 'img/random-maze-generator.png',
        link: '/random-maze-generator'
    }
]

export default projects;