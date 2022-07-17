import Player from '@/utils/CanvasGame/Player.js'

// Game Initialization

function initGame(){
    setEventListeners.bind(this)();

    this.entities.push( new Player({}) );

    this.mainGameLoop();
}

function setEventListeners(){
    document.addEventListener('keydown', (e)=>{
        handleKeydown.bind(this)(e);
    });

    document.addEventListener('keyup', (e)=>{
        handleKeyup.bind(this)(e);
    });
}

function handleKeyup(e){
    const key = e.key;
    if (key in this.isKeyboardPressed){
        this.isKeyboardPressed[key] = false;
    }
}

function handleKeydown(e){
    const key = e.key;
    if (key in this.isKeyboardPressed){
        this.isKeyboardPressed[key] = true;
    }
}

// Game Main Loop

function mainGameLoop(){
    updateState.bind(this)();

    // Handle Input
    for (let i = 0; i<this.entities.length; i++){
        this.entities[i].handleInput(this.isKeyboardPressed, {width: this.width, height: this.height});
    }
    
    // Render
    for (let i = 0; i<this.entities.length; i++){
        this.entities[i].render(this.ctx, this.scale);
    }

    // Set Timeout
    this.timeOut = setTimeout(this.mainGameLoop, 1000/this.fps);
}

function updateState(){
    this.tick+=1;
    this.ctx.clearRect(0, 0, this.width*this.scale, this.height*this.scale);
}

// Game Removal

function removeGame(){
    if (this.timeOut){clearTimeout(this.timeOut)};
    removeGameKeyboardListener.bind(this)();
}

function removeGameKeyboardListener(){
    document.removeEventListener('keydown', (e)=>{
        handleKeydown.bind(this)(e);
    });

    document.removeEventListener('keyup', (e)=>{
        handleKeyup.bind(this)(e);
    });
}

export {mainGameLoop, initGame, removeGame}