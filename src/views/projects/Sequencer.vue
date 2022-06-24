<template>
    <div id="sequencer">
        <div class="menu p-2">
            <button class="btn btn-primary p-1">Play</button>
        </div>
        <div class="main p-2">
            <div class="piano-roll">
                <div class="key-wrapper">
                    <div class="keys" v-for="(freq, note) in this.notes" :key="note" :style="getKeyStyling(note)">{{note}}</div>
                </div>
                <div class="midi-wrapper" ref="pr">
                    <div class="midi" v-for="(freq, note) in this.notes" :key="note">
                        <div class="square" v-for="i in this.lastNote"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {keyToFreqMappingLite} from '@/db/keyToFreqMapping.js'
import {getKeyStyling} from '@/utils/Sequencer.js'
export default {
    data(){
        return {
            notes: keyToFreqMappingLite,
            lastNote: 5
        }
    },
    mounted(){
        this.lastNote = Math.max(5, Math.round(this.$refs.pr.clientWidth/32))
    },
    methods:{
        getKeyStyling : getKeyStyling,
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