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
import {getKeyStyling, createOscillator, getNotes, eraseNote, addNote, resizeNote, moveNote, handleDrop} from '@/utils/Sequencer.js'
import Note from '@/components/piano-roll/Note.vue'
export default {
    components:{
        Note
    },
    data(){
        const notes = keyToFreqMappingLite;
        const lastNote = 60;

        return {
            notes: notes,
            notesList: Object.values(notes),
            lastNote: lastNote,
            bpm: 128,
            audioContext : new AudioContext(),
            timeout: null,
            inputs: [],
            lastDuration: 0
        }
    },
    unmounted(){
        if (this.timeout){
            clearTimeout(this.timeout);
        }
    },
    methods:{
        getKeyStyling,
        eraseNote,
        addNote,
        resizeNote,
        moveNote, 
        handleDrop
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