<template>
    <div id="sequencer">
        <div class="menu p-2">
            <div class="name d-none d-md-block mr-1 mr-md-4" style="font-weight: 600; font-size: 1.2rem; color:white;">
                <i class="bi bi-music-note"></i> PIANO ROLL
            </div>

            <div class="mr-1 mr-md-2">
                <button class="btn btn-success btn-play" @click="togglePlay" v-if="this.playing">
                    <i class="bi bi-pause-fill"></i>
                </button>
                <button class="btn btn-success btn-play" @click="togglePlay" v-else>
                    <i class="bi bi-play-fill"></i>
                </button>
            </div>

            <div class="d-flex mr-1 mr-md-2">
                <div class="text-white d-none d-md-block" style="display:flex; align-items: center; padding: 0.5rem;">BPM</div>
                <input type="number" placeholder="BPM" aria-label="BPM" aria-describedby="basic-addon1"
                    style="width:5rem; box-sizing: border-box; margin: 0.2rem;" v-model="bpm" min="50" max="200">
            </div>

            <div class="d-flex mr-1 mr-md-2 align-items-center">
                <button class="btn btn-success btn-play" @click="updateBeats(-1)">
                    <i class="bi bi-dash"></i>
                </button>
                <div class="text-white" style="display:flex; align-items: center; padding: 0.5rem;">{{this.beats}} beats</div>
                <button class="btn btn-success btn-play" @click="updateBeats(1)">
                    <i class="bi bi-plus"></i>
                </button>
            </div>


            <div class="d-flex mr-1 mr-md-2 align-items-center">
                <div class="text-white d-none d-md-block" style="display:flex; align-items: center; padding: 0.5rem;font-size: 1.4rem;">
                    <i class="bi bi-paint-bucket"></i>
                </div>
                <input type="color" id="noteColor" v-model="color">
            </div>

            <div class="dropdown" style="margin-left: auto; margin-right: 1rem;">
                <button class="btn btn-success dropdown-toggle" type="button" id="dropdownSoundSynthesis"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 1.5rem; padding: 0rem 0.5rem;">
                    <i class="bi bi-soundwave"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right p-3" aria-labelledby="dropdownSoundSynthesis"
                        style="background-color: var(--black); border: 1px solid white;">
                    <div class="d-flex mt-1 mb-3">
                        <button class="btn btn-success btn-play" @click="updateWave($event, -1)">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <div class="text-white text-center" style="flex: 1; vertical-align: middle;">
                            {{  possibleWaveTypes[waveTypeIndex].toUpperCase()  }}
                        </div>
                        <button class="btn btn-success btn-play" @click="updateWave($event, +1)">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>

                    <div class="d-flex mb-1">
                        <div class="text-white text-center" style="vertical-align: middle; padding-right: 1rem;">ATTACK</div>
                        <input type="range" id="attack" style="flex:1;"
                            v-model="attack" min="0" max="999">
                        <div class="text-white text-center" style="vertical-align: middle; padding-left: 1rem;">
                            {{String(attack).padStart(3, '0')}}ms
                        </div>
                    </div>
                </div>
            </div>

            <button id="download" class="btn btn-success" style="margin-right: 0rem;" @click="download">
                <i class="bi bi-download"></i>
            </button>
        </div>
        <div class="main p-2">
            <div class="piano-roll">
                <div class="key-wrapper">
                    <div class="keys" v-for="(freq, note) in this.notes" @contextmenu.prevent
                    :key="note" :style="getKeyStyling(note)">{{note}}</div>
                </div>
                <div class="midi-wrapper" ref="pr">
                    <div class="vertical-line" 
                            :style=" `left: ${2*((this.x+1)%(this.beats*8))}rem; transition: linear ${1/(this.bpm/60)/4}s;
                                      height: ${this.notesList.length*2}rem` " 
                            v-if="this.playing"></div>

                    <div class="midi" v-for="i in this.notesList.length">
                        <div class="square" v-for="j in this.beats*8" @click="addNote($event)" 
                        @contextmenu.prevent :data-x="j-1" :data-y="i-1"
                        @drop="handleDrop"
                        @dragover.prevent @dragenter.prevent></div>
                    </div>

                    <Note v-for="note in this.inputs" width=2 height=2 :noteState="note" :color="this.color" @contextmenu="eraseNote(note.id, $event)"/>
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
        const notesList = Object.values(notes);
        const beats = 4;

        let audioContext = new Array(notesList.length);
        for (let i = 0; i<audioContext.length; i++){
            audioContext[i] = new AudioContext();
        }

        return {
            notes: notes,
            notesList,
            beats: beats,
            bpm: 110,
            audioContext:audioContext,
            timeout: null,
            inputs: [],
            lastDuration: 0,
            playing : false,
            x:0,
            color: "#F66B0E",
            waveTypeIndex: 0,
            possibleWaveTypes: ['sine', 'square', 'sawtooth', 'triangle'],
            attack: 30,
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
        handleDrop,
        getNotes,
        updateBeats(delta){
            if (delta === 1){
                this.beats = Math.min(8, this.beats*2)
            }
            if (delta === -1){
                this.beats = Math.max(1, this.beats/2)
            }
        },
        togglePlay(){
            if (!this.playing){
                this.playing = true;
                this.play(0);
            }else{
                this.playing = false;
            }
        },
        play(x){
            if (this.playing){
                this.x = x;

                const notes = this.getNotes(x);
                const ms = 1/(this.bpm/60)*1000/4;
                
                notes.forEach((note) => {
                    const ms = 1/(this.bpm/60)*1000/4;
                    createOscillator(
                        this.notesList[note.note], this.audioContext[note.note], 
                        this.attack, ms*(note.duration+1), this.possibleWaveTypes[this.waveTypeIndex]);
                })

                const nextX = (x+1)%(this.beats*8);
                this.timeout = setTimeout(this.play.bind(this, nextX), ms);
            }
        },
        updateWave(e, delta){
            e.stopPropagation();
            this.waveTypeIndex = (this.waveTypeIndex + delta + this.possibleWaveTypes.length)%this.possibleWaveTypes.length;
        },
        download(){
            const downloadObject = {
                inputs : this.inputs,
                beats: this.beats,
                bpm: this.bpm,
                color: this.color,
                waveTypeIndex: this.waveTypeIndex,
                attack: this.attack,
            }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent( JSON.stringify(downloadObject) );
            const dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "scene.json");
            dlAnchorElem.click();
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

    display: flex;
    align-items: center;
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
.square:nth-child(8n){
    border-right: 1px solid rgba(130, 130, 130, 0.8);
}
.vertical-line{
    position: absolute;
    border: 1px solid var(--orange);
    height: 2em;
}
.btn-play{
    width: 2rem; 
    height: 2rem;
    padding: 0;
    font-size: 1.2rem;
}
#noteColor{
    width: 2rem;
    height: 2rem;
}
</style>