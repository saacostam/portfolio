<template>
    <div id="platformer">
        <canvas ref="canvas" id="canvas"></canvas>
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
            height: canvas.height
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
    align-items: center;
    justify-content: center;
    padding: 2rem;
}
#canvas{
    background-color: dodgerblue;
    image-rendering: pixelated;
    width: 50rem;
}
</style>