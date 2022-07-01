<template>
    <div class="note" :style="getNotePositioning()">
        <div class="start" @drag="resizeLeft" draggable="true">|</div>
        <div class="fill"></div>
        <div class="end" @drag="resizeRight" draggable="true">|</div>
    </div>
</template>

<script>
export default {
    props:['width', 'height', 'noteState'],
    methods:{
        getNotePositioning(){
            const input = this.noteState;
            return `top:${input.start.y*this.height}rem; left:${input.start.x*this.width}rem;
            width: ${(input.end.x - input.start.x)*this.width}rem; height: ${this.height}rem`
        },
        resizeLeft(e){
            console.log(e);
        },
        resizeRight(e){
            console.log(e);
        }
    }
}
</script>

<style lang="css" scoped>
.note{
    display: flex;
    position: absolute;
    background-color: var(--orange);
    box-sizing: border-box;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
}
.start, .end{
    max-width: 8px;
    flex: 1 0 0;
    text-align: center;
    cursor:w-resize;
    user-select: none;
}
.fill{
    flex: 1;
}
</style>