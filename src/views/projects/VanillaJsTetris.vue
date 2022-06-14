<template>
    <div id="container">
        <div class="game-viewport" v-if="this.gameStarted">
            <div class="modal-pause" v-if="this.bGameOver">
                <h4 id="pause-header">PAUSED</h4>
                <div class="pause-options">
                    <button><i class="bi bi-arrow-repeat"></i></button>
                    <button @click="togglePause"><i class="bi bi-play-fill"></i></button>
                </div>
            </div>
            <div id="mask"></div>
            <div id="grid">
                <div v-for="row in this.gridRender" :key="getRandomId(row)" class="row-div">
                    <div v-for="square in row" :key="getRandomId(square)" :style="`width: calc(100%/${row.length}); padding-top: calc(100%/${row.length}); background-color: ${this.returnColor(square)}`" class="square-div">
                    </div>
                </div>
            </div>
            <div class="menu">
                <div class="preview">
                    <h5>PREVIEW</h5>
                    <div class="preview-img">
                        <img :src="`img/vanilla-js-tetris/${this.nextTetromino}.jpg`">
                    </div>
                </div>
                <div class="score">
                    <h5>SCORE</h5>
                    {{this.score}}
                </div>
                <div class="controls">
                    <h5>CONTROLS <i class="bi bi-keyboard"></i></h5>
                    <div>Keys - Move</div>
                    <div>Z - Rotate</div>
                </div>
                <div class="preview">
                    <button id="pause" @click="togglePause" v-if="!this.bGameOver">PAUSE</button>
                    <button id="pause" @click="togglePause" v-else>RESUME</button>
                </div>
                <h3>TETRIS <i class="bi bi-joystick"></i></h3>
            </div>
        </div>
        <div class="game-menu" v-else>
            <h1>TETRIS <i class="bi bi-joystick"></i></h1>
            <div class="menu-message">Press <span style="color: var(--green)">start</span>!</div>
            <div id="start" @click="setGame">START</div>
            <div class="text-muted text-center">*Keyboard needed!</div>
        </div>
    </div>
</template>

<script>
import {getTetrominos, keyDownHandler, keyUpHandler, generateGrid, mainGameLoop} from '@/utils/VanillaJsTetris.js'
import uniqid from 'uniqid'
export default {
    data(){
        return {
            columns: 12,
            rows: 18,
            bGameOver: true,
            gameStarted: false,
            score: 0,
            grid: [],
            ticks: 0,
            gridRender: [],
            xPosition: 0,
            yPosition: 0,
            tetromino: getTetrominos(),
            nTetromino:undefined,
            nextTetromino:undefined,
            countTetromino:undefined,
            nRotation : 0,
            bQueuedTetris : [],
            countDown : 0,
            rightPressed:0,
            leftPressed : 0,
            downPressed : 0,
            zPressed : 0,
            intervalId: undefined
        }
    },
    methods:{
        returnColor(char){
            if (char == "_") {
                return "#333";
            } else if (char == "b") {
                return "white";
            } else if (char == "t") {
                return "white";
            }else{
                return 'var(--green)';
            }
        },
        keyUp(event){
            return keyDownHandler.bind(this)(event);
        },
        keyDown(event){
            return keyUpHandler.bind(this)(event);
        },
        setGame(){
            generateGrid.bind(this)();
            this.gameStarted = true;
            this.bGameOver = false;
        },
        getRandomId(dummy){
            dummy
            return uniqid();
        },
        togglePause(){
            this.bGameOver = !(this.bGameOver);
        }
    },
    mounted(){
        this.intervalId = window.setInterval(mainGameLoop.bind(this), 50);
        window.addEventListener('keydown', this.keyUp);
        window.addEventListener('keyup', this.keyDown);
    },
    beforeUnmount(){
        window.clearInterval(this.intervalId);
        window.removeEventListener('keydown', this.keyUp);
        window.removeEventListener('keyup', this.keyDown);
    }
}
</script>

<style scoped>
#pause-header{
    color: white;
    font-weight: 300;
}
.row-div{
    width: 100%;
}
.square-div{
    border: solid 1px #111;
    box-sizing: border-box;
    float:left;
}
#container{
    width: 100%;
    display: flex;
    justify-content:center;
}
#grid{
    max-width: 300px;
    width: 100%;
}
.game-viewport,
.game-menu{
    max-width: 500px;
    width: 100%;
    user-select: none;
    position: relative;
}
h1,h3,h5{
    text-align: center;
    color: white;
    margin-top: 2rem;
}
.menu-message{
    color: white;
    text-align: center;
    margin: 1rem;
    font-size: 1.5rem;

    animation: size 2s infinite ease-in-out;
}
#start, #pause{
    border: 1px solid var(--green);
    background-color: #111;
    color: var(--green);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 2.5rem auto;
    text-align: center;
    width: fit-content;
}
#start:hover, #pause:hover{
    color: white;
    border-color: white;
    cursor: pointer;
}
@keyframes size {
  0% {
    transform: scale(1);
  }
  50%{
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.menu{
    position: absolute;
    max-width: 200px;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.preview{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.score{
    color: white;
    font-weight: 400;
    text-align: center;
    font-size: smaller;
}
.controls div{
    text-align: center;
    font-size: smaller;
    color: white;
}
.text-muted{
    font-size: smaller;
}
.preview-img{
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
}
#mask{
    transform: scaleY(0);
    transform-origin: top;
    background-color: var(--green);
    transition: transform 0.5s ease;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
}
.modal-pause{
    padding: 1rem;
    border: 1px solid white;
    border-radius: 0.2rem;
    position: absolute;
    right: 0; left: 0;
    margin: 35% auto;
    background-color: #111;
    width: fit-content;
    max-width: 10rem;
    width: 10rem;
    text-align: center;
}
#pause-header{
    margin-bottom: 1.5rem;
}
.pause-options{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.pause-options button{
    border: solid 1px var(--green);
    border-radius: 50%;
    padding: 0;margin: 0;
    color: white;
    background-color:var(--green);
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2rem;
    line-height: 1rem;
    outline: none;
    cursor: pointer;
}
.pause-options button:hover{
    transform: scale(1.05);
}
@media (max-width: 768px) {
    .game-viewport,
    .game-menu{
        max-width: 300px;
    }
    .menu{
        max-width: 0px;
    }
    #mask{
        transform: scaleY(1);
    }
}
</style>