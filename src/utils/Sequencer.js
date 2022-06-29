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

export {getKeyStyling, createOscillator, getNotes}