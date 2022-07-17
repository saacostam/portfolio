<template>
    <div class="canvas-game">
        <canvas ref="canvas" id="canvas"></canvas>
        <div>{{this.isKeyboardPressed}}</div>
        <div>{{this.entities}}</div>
    </div>
</template>

<script>
import {mainGameLoop, initGame, removeGame} from '@/utils/CanvasGame/GameLoop.js'
import {data} from '@/utils/CanvasGame/Config.js'
export default {
    data(){
        return data
    },
    mounted(){
        // Get context when canvas is mounted
        this.ctx = this.$refs.canvas.getContext('2d');


        // Set EventListeners
        

        // Start main game loop
        this.initGame()
    },
    unmounted(){
        this.removeGame()
    },
    methods:{
        mainGameLoop,
        initGame,
        removeGame
    }
}
</script>

<style scoped>
.canvas-game{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#canvas{
    width: 800px;
    height: 450px;
    margin: 2rem;
    background-color: rgb(125, 170, 255);

    image-rendering: pixelated;
}
</style>