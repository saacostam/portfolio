<template>
    <div class="note" :style="getNotePositioning()" draggable="true">
        <div class="start" @drag.prevent="resizeLeft" draggable="true">|</div>
        <div class="fill"></div>
        <div class="end" @drag.prevent="resizeRight" draggable="true">|</div>
        <div class="start wrapper" v-if="drag" :style="getWrapperStyling()"></div>
    </div>
</template>

<script>
export default {
    props:['width', 'height', 'noteState'],
    data(){
        return {
            drag: false,
            offsetX: 0,
            temp: false,
        }
    },
    methods:{
        getNotePositioning(){
            const input = this.noteState;
            return `top:${input.start.y*this.height}rem; left:${input.start.x*this.width}rem;
            width: ${(input.end.x - input.start.x+1)*this.width}rem; height: ${this.height}rem;`
        },
        getWrapperStyling(){
            const input = this.noteState;
            return `top:${input.start.y*this.height}rem; left:${input.start.x*this.width}rem;
            width: ${(input.end.x - input.start.x+1)*this.width}rem; height: ${this.height}rem;`
        },
        resizeLeft(e){
            this.drag = true;
            this.offsetX = e.offsetX;
        },
        resizeRight(e){
            this.drag = true;
            this.offsetX = e.offsetX;
        }
    }
}
</script>

<style lang="css" scoped>
.note{
    display: flex;
    position: absolute;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-radius: 0.5rem;
    background-color: var(--orange);
}
.start, .end{
    max-width: 8px;
    flex: 1 0 0;
    text-align: center;
    cursor:w-resize;
    user-select: none;
    background-color: inherit;
    filter: brightness(92%);
    border-radius: 0.5rem;
}
.fill{
    flex: 1;
}
.wrapper{
    position: absolute;
}
</style>