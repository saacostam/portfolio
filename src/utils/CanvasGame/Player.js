class Player{
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;

        this.width = config.width || 1;
        this.height = config.height || 1;
    }

    handleInput(isKeyboardPressed, scene){
        if (isKeyboardPressed['ArrowRight'] && (this.x+this.width+1) <= scene.width){
            this.x += 1;
        }else if (isKeyboardPressed['ArrowLeft'] && (this.x-1) >= 0){
            this.x -= 1;
        }
    
        if (isKeyboardPressed['ArrowDown'] && (this.y+this.height+1) <= scene.height){
            this.y += 1;
        }else if (isKeyboardPressed['ArrowUp'] && (this.y-1) >= 0){
            this.y -= 1;
        }
    }

    render(ctx, scale){
        ctx.strokeStyle="#000"
        ctx.fillRect(this.x*scale, this.y*scale, this.width*scale, this.height*scale);
    }
}

export default Player