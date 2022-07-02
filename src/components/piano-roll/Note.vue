<template>
    <div class="note" :style="getNotePositioning()" draggable="true">
        <div class="start" @drag.prevent="resizeLeft" draggable="true" 
        @dragend.prevent="restartResizeState"
        @dragstart="setDrag">|</div>
        <div class="fill"></div>
        <div class="end" @drag.prevent="resizeRight" draggable="true" 
        @dragend.prevent="restartResizeState"
        @dragstart="setDrag">|</div>
        <div class="note wrapper" v-if="dragLeft || dragRight" :style="getWrapperStyling()"></div>
    </div>
</template>

<script>
export default {
    props:['width', 'height', 'noteState'],
    data(){
        return {
            dragLeft: false,
            dragRight: false,
            event: 0,
            temp: {},
        }
    },
    methods:{
        getNotePositioning(){
            const input = this.noteState;
            return `top:${input.start.y*this.height}rem; left:${input.start.x*this.width}rem;
            width: ${(input.end.x - input.start.x+1)*this.width}rem; height: ${this.height}rem;`
        },
        getWrapperStyling(){
            let startOffset = 0;
            let widthOffset = 0;
            const input = this.noteState;

            console.log(this.event.offsetX);
            if (this.dragLeft){
                widthOffset = this.event.offsetX/this.width/16;
            }else if (this.dragRight){
                widthOffset = this.event.offsetX/this.width/16;
            }

            return `top:0rem; left:0rem;
            width: ${(input.end.x - input.start.x+1 + widthOffset)*this.width}rem; height: ${this.height}rem;`
        },
        getEmptyImage() {
            const dragImg = new Image(0,0);
            dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            return dragImg;
        },
        setDrag(e){
            e.dataTransfer.setDragImage(this.getEmptyImage(), 0, 0);
        },
        resizeLeft(e){
            this.dragLeft = true;
            this.event = e;
            this.temp = this.nodeState;
        },
        resizeRight(e){
            this.dragRight = true;
            this.event = e;
            this.temp = this.nodeState;
        },
        restartResizeState(){
            this.dragRight = this.dragLeft = false;
        },
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
    background-color: inherit;
    border-radius: 0.4rem;
    filter: brightness(110%);
}
</style>