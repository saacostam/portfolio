<!-- check size bounds -->

<template>
    <div id="sequencer">
        <div class="menu p-2">
            <button class="btn btn-primary p-1" @click="play(0)">
                <i class="bi bi-play-fill"></i>
            </button>
            <input type="text" style="width:3rem; margin-left:1rem;" v-model="bpm">
        </div>
        <div class="main p-2">
            <div class="piano-roll">
                <div class="key-wrapper">
                    <div class="keys" v-for="(freq, note) in this.notes" @contextmenu.prevent
                    :key="note" :style="getKeyStyling(note)">{{note}}</div>
                </div>
                <div class="midi-wrapper" ref="pr">
                    <div class="midi" v-for="i in this.notesList.length">
                        <div class="square" v-for="j in this.lastNote" @click="addNote($event)" 
                        @contextmenu.prevent :data-x="j-1" :data-y="i-1"
                        @drop="handleDrop"
                        @dragover.prevent @dragenter.prevent></div>
                    </div>

                    <Note v-for="note in this.inputs" width=2 height=2 :noteState="note" @contextmenu="eraseNote(note.id, $event)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {keyToFreqMappingLite} from '@/db/keyToFreqMapping.js'
import {getKeyStyling, createOscillator, getNotes} from '@/utils/Sequencer.js'
import { v4 as uuidv4 } from 'uuid';
import Note from '@/components/piano-roll/Note.vue'
export default {
    components:{
        Note
    },
    data(){
        const notes = keyToFreqMappingLite;

        const n = Object.keys(notes).length;
        const lastNote = 32;
        let grid = []

        for (let i=0; i<n; i++){
            let temp = new Array(lastNote);
            temp.fill(false);
            grid.push(temp);
        }

        const ranges = new Array(n);

        return {
            notes: notes,
            notesList: Object.values(notes),
            lastNote: lastNote,
            bpm: 100,
            audioContext : new AudioContext(),
            timeout: null,
            inputs: []
        }
    },
    unmounted(){
        if (this.timeout){
            clearTimeout(this.timeout);
        }
    },
    methods:{
        getKeyStyling : getKeyStyling,
        addNote(event){
            const x = Number(event.srcElement.dataset.x);
            const y = Number(event.srcElement.dataset.y);
            this.inputs.push({
                id: uuidv4(),
                start: {x, y},
                end:{x,y}
            })
        },
        eraseNote(id, event){
            event.preventDefault();
            for (let i=0; i<this.inputs.length; i++){
                if (this.inputs[i].id === id){
                    this.inputs.splice(i, 1);
                    return
                }
            }
        },
        resizeNote(id, bUpdateStart, newX){
            let index = null;
            for (let i=0; i<this.inputs.length; i++){
                if (this.inputs[i].id === id){
                    index = i;
                    break
                }
            }

            if (index !== null){
                if (bUpdateStart)   { this.inputs[index].start.x = newX;}
                else                { this.inputs[index].end.x = newX }
            }
        },
        moveNote(id, startX, startY){
            let index = null;
            for (let i=0; i<this.inputs.length; i++){
                if (this.inputs[i].id === id){
                    index = i;
                    break
                }
            }

            if (index !== null){
                const delta = this.inputs[index].end.x - this.inputs[index].start.x;
                this.inputs[index].start.x = startX;
                this.inputs[index].end.x = startX + delta;
                this.inputs[index].start.y = this.inputs[index].end.y = startY;
            }
        }, 
        handleDrop(e){
            const type = e.dataTransfer.getData("type");

            if (type == "resize"){
                const id = e.dataTransfer.getData("id");
                const direction = e.dataTransfer.getData("dir");
                this.resizeNote(id, direction === "left", Number(e.target.dataset.x))
            }else{
                const id = e.dataTransfer.getData("id");
                this.moveNote(id, Number(e.target.dataset.x), Number(e.target.dataset.y))
            }
        }
    }
}
</script>

<style scoped>
#sequencer{
    background-color: var(--black);
    height: calc(100vh - 4rem);
}
.menu{
    border-bottom: 1px solid white;
    box-sizing: border-box;
    height: 3rem;
}
.main{
    height: calc(100vh - 7rem);
}
.piano-roll{
    border: solid 1px white;
    height: 100%;
    overflow: auto;

    display: flex;
    flex-direction: row;
}
.keys{
    height: 2rem;
    width: 4rem;
    padding: 0 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
}
.midi-wrapper{
    width: calc(100% - 4rem);
    position: relative;
}
.midi{
    height: 2rem;
    display: flex;
    flex-direction: row;
}
.square{
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    min-width: 2rem;
    box-sizing: border-box;
}

</style>