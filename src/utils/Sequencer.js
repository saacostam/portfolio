import { v4 as uuidv4 } from 'uuid';

function getKeyStyling(note){
    if (note.length === 2 ){
        return 'background-color: var(--white); color: var(--black);'
    }
    return 'background-color: var(--black); color: var(--white);'
}

function createOscillator(freq, audioContext, attack, decay, type) {
    const audio = audioContext
    const gain = audio.createGain(),
        osc = audio.createOscillator();

    gain.connect(audio.destination);
    gain.gain.setValueAtTime(0, audio.currentTime);
    gain.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000);
    gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000);

    osc.frequency.value = freq;
    osc.type = type;
    osc.connect(gain);
    osc.start(0);

    setTimeout(function() {
        osc.stop(0);
        osc.disconnect(gain);
        gain.disconnect(audio.destination);
    }, decay)
}

function getNotes(nNotes, grid, i, freq){
    let notes = []
    for (let j = 0; j<grid.length; j++){
        if (grid[j][i] === true){
            notes.push(freq[j]);

            if (notes.length === nNotes){
                return notes;
            }
        }
    }
    return notes;
}

function eraseNote(id, event){
    event.preventDefault();
    for (let i=0; i<this.inputs.length; i++){
        if (this.inputs[i].id === id){
            this.inputs.splice(i, 1);
            return
        }
    }
}

function addNote(event){
    const x = Number(event.srcElement.dataset.x);
    const y = Number(event.srcElement.dataset.y);
    this.inputs.push({
        id: uuidv4(),
        start: {x, y},
        end:{x:x+this.lastDuration,y}
    })
}

function resizeNote(id, bUpdateStart, newX){
    let index = null;
    for (let i=0; i<this.inputs.length; i++){
        if (this.inputs[i].id === id){
            index = i;
            break
        }
    }

    if (index !== null){
        if (bUpdateStart) {
            if (newX <= this.inputs[index].end.x){
                this.inputs[index].start.x = newX;
            }
        }
        else { 
            if (newX >= this.inputs[index].start.x){
                this.inputs[index].end.x = newX;
            }
        }
        this.lastDuration = this.inputs[index].end.x - this.inputs[index].start.x;
    }
}

function moveNote(id, startX, startY){
    let index = null;
    for (let i=0; i<this.inputs.length; i++){
        if (this.inputs[i].id === id){
            index = i;
            break
        }
    }

    if (index !== null){
        this.lastDuration = this.inputs[index].end.x - this.inputs[index].start.x;
        this.inputs[index].start.x = startX;
        this.inputs[index].end.x = startX + this.lastDuration;
        this.inputs[index].start.y = this.inputs[index].end.y = startY;
    }
}

function handleDrop(e){
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

export {getKeyStyling, createOscillator, getNotes, eraseNote, addNote, resizeNote, moveNote, handleDrop}