<template>
    <div class="canvas-game">
        <h3 class="m-4">Random Maze Generator</h3>
        <canvas ref="canvas" id="canvas" v-show="!this.gameOver"></canvas>
        <button id="toMenu" class="m-2" v-show="!this.gameOver" @click="backToMenu"><h5>Back to Menu</h5></button>

        <div style="width: 400px;" v-show="this.gameOver">
            <p class="text-center" style="font-size: 1.3rem;">Please Select a Difficulty!</p>
            <div class="menu">
                <button @click="startEasyMode" class="btn btn-success">Easy Mode</button>
                <button @click="startHardMode" class="btn btn-danger">Hard Mode</button>
            </div>
            <p class="text-center">This web application uses probability to build a maze. Each cell has an independent probability of being either filled or empty. It is always guaranteed, using a DFS search algorithm, that there is a valid solution.</p>
        </div>
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
        this.gameOver = true;
    },
    unmounted(){
        this.removeGame()
    },
    methods:{
        mainGameLoop,
        initGame,
        removeGame,
        startEasyMode(){
            this.gameOver = false;

            this.scale = 10;
            this.width = 30;
            this.height = 15;

            this.initGame();
        },
        startHardMode(){
            this.gameOver = false;

            this.scale = 5;
            this.width = 60;
            this.height = 30;

            this.initGame();
        },
        backToMenu(){
            this.gameOver = true;
            this.removeGame();
        }
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
    height: 400px;
    background-color: #ffffff;

    image-rendering: pixelated;
}
.menu{
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    padding: 0.5rem;
    margin: 1rem;
}
.menu button{
    /* background-color: var(--blue); */
    font-size: 1.1rem;
}
#toMenu{
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    margin-left: 2rem;
    border-bottom: 2px solid;
}
#toMenu:hover{
    color: var(--orange);
}
</style>