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
        this.playerX = this.levelWidth/2;
        this.playerY = this.levelHeight-2;

        this.playerVelocityX = 0;
        this.playerVelocityY = 0;

        this.onUserCreate();
    }

    onUserCreate(){
        for (let i=0; i<9; i++){
            this.level += '#..............................#';
        }
        
        this.level += '#..............................#';   // 1
        this.level += '#.............................##';   // 2
        this.level += '#............................###';   // 3
        this.level += '#...........................####';   // 4
        this.level += '#...........###............#####';   // 5
        this.level += '#.........................######';   // 6
        this.level += '################################';   // 7
    }

    getTile(x, y){
        x = Math.floor(x);
        y = Math.floor(y);
        if (0 <= x < this.levelWidth && 0 <= y < this.levelHeight){
            return this.level.charAt(y*this.levelWidth + x);
        }
        return ' ';
    }

    onUserUpdate(isKeyboardPressed){
        // Handle Input
        this.playerVelocityY = 0;

        if (isKeyboardPressed['ArrowUp']){
            this.playerVelocityY -= 1;
        }else if (isKeyboardPressed['ArrowDown']){
            this.playerVelocityY += 1;
        }

        if (isKeyboardPressed['ArrowLeft']){
            this.playerVelocityX -= 0.3;
        }else if (isKeyboardPressed['ArrowRight']){
            this.playerVelocityX += 0.3;
        }

        // Physics

        this.playerVelocityX = 0.9*this.playerVelocityX;

        if (this.playerVelocityX < -0.5)
            this.playerVelocityX = -0.5;
        if (0.5 < this.playerVelocityX)
            this.playerVelocityX = 0.5;
        
        if (this.playerVelocityY < -1)
            this.playerVelocityY = -0.3;
        if (1 < this.playerVelocityY)
            this.playerVelocityY = 0.3;

        if (Math.abs(this.playerVelocityX) < 0.1){
            this.playerVelocityX = 0;
        }

        // Test Collisions
        let newPlayerX = this.playerX + this.playerVelocityX;
        let newPlayerY = this.playerY + this.playerVelocityY;

        if (0 < this.playerVelocityX){ // Derecha
            if (this.getTile(newPlayerX+1, this.playerY) !== '.'){
                this.playerX = newPlayerX = Math.floor(newPlayerX);
                this.playerVelocityX = 0;
            }
        }

        if (this.playerVelocityX < 0){ // Izquierda
            if (this.getTile(newPlayerX, this.playerY) !== '.'){
                this.playerX = newPlayerX = Math.floor(newPlayerX + 1);
                this.playerVelocityX = 0;
            }
        }

        if (0 < this.playerVelocityY){ // Arriba
            if (this.getTile(newPlayerX, newPlayerY) !== '.'){
                this.playerY = Math.floor(newPlayerY - 1);
                this.playerVelocityY = 0;
            }
        }

        if (this.playerVelocityY < 0){ // Abajo
            if (this.getTile(newPlayerX, newPlayerY) !== '.'){
                this.playerY = Math.floor(newPlayerY + 1);
                this.playerVelocityY = 0;
            }
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