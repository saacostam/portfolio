<template>
    <div id="platformer">
        <h3 class="text-white text-center mb-4">🏔️ Slippery Slope ⛷️</h3>
        <canvas ref="canvas" id="canvas" width="256" height="128"></canvas>
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
            game: null,
            timeOut: null,
            isKeyboardPressed: {
                'ArrowUp':false, 
                'ArrowDown':false,
                'ArrowLeft':false,
                'ArrowRight':false
            },
        }
    },
    mounted(){
        const canvas = this.$refs.canvas;

        this.ctx = canvas.getContext('2d');
        this.game = new Game({
            ctx: this.ctx,
            width: canvas.width,
            height: canvas.height,
            levelWidth: 32, 
            levelHeight: 16,
            scale: 8,
            fps: 27
        })
        this.setEventListeners();
        this.update();
    },
    unmounted(){
        this.removeGame();
    },
    methods:{
        update(){
            this.game.onUserUpdate(this.isKeyboardPressed);
            this.timeOut = setTimeout( this.update, 1000/this.game.fps )
        },
        setEventListeners,
        removeGame
    }
}
</script>

<style scoped>
#platformer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: var(--black);
}
#canvas{
    background-color: rgb(103, 139, 183);
    background-size: cover;
    image-rendering: pixelated;
    width: 50rem;
}
</style>