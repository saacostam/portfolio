function getKeyStyling(note){
    if (note.length === 2 ){
        return 'background-color: var(--white); color: var(--black);'
    }
    return 'background-color: var(--black); color: var(--white);'
}

export {getKeyStyling}