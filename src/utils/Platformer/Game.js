class Game{
    constructor(settings){
        this.ctx = settings.ctx;
        this.width = settings.width || 300;
        this.height = settings.height || 150;
        
        this.fps = settings.fps || 12;
        this.levelWidth = settings.levelWidth || 20;
        this.levelHeight = settings.levelHeight || 10;
        this.scale = settings.scale || 15;

        this.level = settings.level || '';

        // Specific Stuff
        this.playerX = 10;
        this.playerY = 5;

        this.playerVelocityX = 0;
        this.playerVelocityY = 0;

        this.onUserCreate();
    }

    onUserCreate(){
        this.level += '#..................#';
        this.level += '#..................#';
        this.level += '#..................#';
        this.level += '#..................#';
        this.level += '#.................##';
        this.level += '#................###';
        this.level += '#...............####';
        this.level += '#..............#####';
        this.level += '#.............######';
        this.level += '####################';
    }

    getTile(x, y){
        if (0 <= x < this.levelWidth && 0 <= y < this.levelHeight){
            return this.level.charAt(y*this.levelWidth + x);
        }
        return ' ';
    }

    onUserUpdate(isKeyboardPressed){
        // Handle Input
        this.playerVelocityX = 0; 
        this.playerVelocityY = 0;

        if (isKeyboardPressed['ArrowUp']){
            this.playerVelocityY += 5;
        }else if (isKeyboardPressed['ArrowDown']){
            this.playerVelocityY -= 5;
        }

        // Update State
        this.playerX += this.playerVelocityX;
        this.playerY += this.playerVelocityY;

        // Render
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Render Map
        for (let x=0; x<this.levelWidth; x++){
            for (let y=0; y<this.levelHeight; y++){
                const tile = this.getTile(x, y);

                switch (tile){
                    case '#':
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(this.scale*x, this.scale*y, this.scale, this.scale);
                }
            }
        }

        // Render Player
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.scale*this.playerX, this.scale*this.playerY, this.scale, this.scale)
    }
}

export default Game