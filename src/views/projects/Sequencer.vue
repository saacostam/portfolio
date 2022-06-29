<template>
    <div id="sequencer">
        <div class="menu p-2">
            <button class="btn btn-primary p-1" @click="play(0)">Play</button>
            <input type="text" style="width:3rem; margin-left:1rem;" v-model="bpm">
        </div>
        <div class="main p-2">
            <div class="piano-roll">
                <div class="key-wrapper">
                    <div class="keys" v-for="(freq, note) in this.notes" :key="note" :style="getKeyStyling(note)">{{note}}</div>
                </div>
                <div class="midi-wrapper" ref="pr">
                    <div class="midi" v-for="i in this.grid.length">
                        <div class="square" v-for="j in this.grid[i-1].length" 
                        @click="toggle(i-1, j-1)" 
                        :style="[this.grid[i-1][j-1] === false ? 'background-color: inherit' : 'background-color: var(--orange)' ]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {keyToFreqMappingLite} from '@/db/keyToFreqMapping.js'
import {getKeyStyling, createOscillator, getNotes} from '@/utils/Sequencer.js'
export default {
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

        return {
            grid: grid,
            notes: notes,
            notesList: Object.values(notes),
            lastNote: lastNote,
            bpm: 100,
            audioContext : new AudioContext(),
            timeout: null
        }
    },
    unmounted(){
        if (this.timeout){
            clearTimeout(this.timeout);
        }
    },
    methods:{
        getKeyStyling : getKeyStyling,
        toggle(x, y){
            this.grid[x][y] = !(this.grid[x][y]);
        },
        play(i){
            if (i===this.grid[0].length){
                i = 0;
            }

            const freq = getNotes(3, this.grid, i, this.notesList);

            if (freq[0]){
                createOscillator(freq[0], this.audioContext, 50, 400, 'sine');
            }
            if (freq[1]){
                createOscillator(freq[1], this.audioContext, 50, 400, 'sine');
            }
            if (freq[2]){
                createOscillator(freq[2], this.audioContext, 50, 400, 'sine');
            }

            const beat = (1/this.bpm)*60/4;

            this.timeout = setTimeout(this.play.bind(this, i+1), beat*1000);
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
    border: 1px solid black;
}
.midi-wrapper{
    width: calc(100% - 4rem)
}
.midi{
    height: 2rem;
    display: flex;
    flex-direction: row;
}
.square{
    border: 1px solid black;
    background-color: var(--black);
    min-width: 2rem;
}
</style>