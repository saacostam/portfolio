<template>
    <div id="platformer">
        <h3 class="text-white text-center mb-4 h3">🏔️ Slippery Slope 🐧</h3>
        <canvas ref="canvas" id="canvas" width="256" height="128" v-show="!this.game.gameOver"></canvas>
        
        <div id="ui-wrapper" v-show="this.game.gameOver">
            <div id="ui" v-if="!this.inMenu" style="background: url('img/slippery-slope/menu.png');background-repeat: no-repeat;background-size: contain;">
                <button class="btn btn-danger abs-button" id="play-button" @click="toggleMenu">PLAY</button>
            </div>
            <div id="ui" v-else style="background: linear-gradient(180deg, rgba(103,139,183,1) 0%, rgba(167,181,198,1) 100%);">
                <button class="btn btn-danger nav-button" @click="toggleMenu"><i class="bi bi-house-fill"></i></button>

                <div id="ui-levels">
                    <button class="btn btn-primary level-button" v-for="i in 8" @click="startLevel(i-1)">{{i}}</button>
                </div>

                <div class="menu-instruction text-white">Choose a <span class="text-primary">level</span>!</div>
            </div>
        </div>

        <div class="instructions mt-3 text-white">
            <h3 class="text-center h5">How to Play</h3>
            <ul id="ul-instructions">
                <li><span class="text-danger">Move</span> and <span class="text-danger">Jump</span> with the <span class="text-danger">keyboards arrows</span>.</li>
                <li>Use <span class="text-danger">R</span> key to <span class="text-danger">restart</span> the level.</li>
                <li>Go to the <span class="text-danger">Flag</span>.</li>
                <li>The <span class="text-danger">red keys eliminate</span>the <span class="text-danger">red bricks</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Game from '@/utils/Platformer/Game.js'
import { setEventListeners, removeGame } from '@/utils/GameInput.js';
export default{
    name: 'Platformer',
    data(){
        return {
            ctx: null,
            game: {
                gameOver: true
            },
            timeOut: null,
            isKeyboardPressed: {
                'ArrowUp':false, 
                'ArrowDown':false,
                'ArrowLeft':false,
                'ArrowRight':false,
                'r': false
            },
            levelNumber: 0,
            levelPassed: false,
            inMenu: false
        }
    },
    mounted(){
    },
    unmounted(){
        this.removeGame();
    },
    methods:{
        toggleMenu(){
            this.inMenu = !(this.inMenu);
        },
        update(){
            if (!this.game.gameOver){
                this.game.onUserUpdate(this.isKeyboardPressed);
                this.timeOut = setTimeout( this.update, 1000/this.game.fps )
            }else{
                this.game = {
                    gameOver: true
                }
            }
        },
        startLevel(levelNumber){
            this.levelNumber = levelNumber;

            const canvas = this.$refs.canvas;
            this.ctx = canvas.getContext('2d');
            this.game = new Game({
                ctx: this.ctx,
                width: canvas.width,
                height: canvas.height,
                levelWidth: 32, 
                levelHeight: 16,
                scale: 8,
                fps: 30
            },
            this.levelNumber)

            this.setEventListeners();
            this.update();
        },
        setEventListeners,
        removeGame
    }
}
</script>

<style scoped>
@font-face {
  font-family: pixelFont;
  src: url('@/../public/fonts/slippery-slope/FreePixel.ttf');
}

#platformer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: var(--black);
    font-family: pixelFont;
}
#canvas{
    background: rgb(103,139,183);
    background: linear-gradient(180deg, rgba(103,139,183,1) 0%, rgba(167,181,198,1) 100%);
    image-rendering: pixelated;
}
#ui-wrapper, #canvas, .instructions{
    width: 50rem;
}
#ui{
    width: 100%;
    padding-bottom: 50%;
    background-color: white;
    position: relative;
    image-rendering: pixelated;
}
.abs-button{
    position: absolute;
    width: 10rem;
    height: 2.5rem;
    border: 2px solid black;
    border-radius: 0;
    padding: 0.1rem;
    font-size: 1.5rem;
}
#play-button{
    top: calc(50% - (2.5rem)/2);
    left: calc(50% - (10rem)/2);
}
.nav-button, .level-button{
    padding: 0;
    border-radius: 0;
    border: calc(1rem/8) solid black;
}
.nav-button{
    position: absolute;
    left:1rem;
    top:1rem;
    width: 2rem;
    height: 2rem;
}
#ui-levels{
    position: absolute;
    left: 20%;
    width: 60%;
    top: 20%;
    height: 60%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
}
.level-button{
    width: 100%;
    height: 3rem;
    font-size: 2rem;
    margin: 1rem auto;
}
.menu-instruction{
    position: absolute;
    bottom: 2rem;
    left: calc(50% - (10rem)/2);
    font-size: 1.2rem;
    width: 10rem;
    text-align: center;
}
.instructions{
    text-align: justify;
}
#ul-instructions{
    display: grid;
    grid-template-columns: 50% 50%;
}
#ul-instructions li{
    word-wrap: break-word;
    padding-right: 2rem;
}
@media (max-width: 950px) {
    #ui-wrapper, #canvas, .instructions{
        width: 30rem;
    }
    .menu-instruction{
        bottom: 0.6rem;
    }
    #ul-instructions{
        display: block
    }
}
@media (max-width: 600px) {
    #ui-wrapper, #canvas, .instructions{
        width: 20rem;
    }
    .level-button{
        height: 2rem;
        font-size: 1rem;
        margin: 0.5rem auto;
    }
    .menu-instruction{
        bottom: 0.5rem;
    }
}
</style>