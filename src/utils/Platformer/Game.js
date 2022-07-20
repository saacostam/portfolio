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
        this.playerX = 1;
        this.playerY = this.levelHeight-2;

        this.playerVelocityX = 0;
        this.playerVelocityY = 0;

        this.gravity = -0.5;

        this.onFloor = true;

        this.onUserCreate();
    }

    onUserCreate(){
        this.level += '################################';
        this.level += '#..............................#';
        this.level += '#.######################.......#';
        this.level += '#.#....................##......#';
        this.level += '#.#.......................###..#';
        this.level += '#.#...............##..........##';
        this.level += '#.#..............##....#########';
        this.level += '#.#.............##.............#';
        this.level += '#.#............##..............#';
        this.level += '###..##..##..###.......######..#';
        this.level += '####..................##......##';
        this.level += '#####................##......###';
        this.level += '######..##..##..##..##......####';
        this.level += '#..........................#####';
        this.level += '#.........................######';
        this.level += '################################';
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

        if (isKeyboardPressed['ArrowUp']){
            if (this.onFloor === true){
                this.playerVelocityY -= 5;
                this.onFloor = false;
            }
        }

        if (isKeyboardPressed['ArrowLeft']){
            this.playerVelocityX -= 0.3;
        }else if (isKeyboardPressed['ArrowRight']){
            this.playerVelocityX += 0.3;
        }

        // Physics

        this.playerVelocityX = 0.9*this.playerVelocityX;
        this.playerVelocityY -= this.gravity;

        if (this.playerVelocityX < -0.6)
            this.playerVelocityX = -0.6;
        if (0.6 < this.playerVelocityX)
            this.playerVelocityX = 0.6;
        
        if (this.playerVelocityY < -1)
            this.playerVelocityY = -1;
        if (1 < this.playerVelocityY)
            this.playerVelocityY = 1;

        if (Math.abs(this.playerVelocityX) < 0.1){
            this.playerVelocityX = 0;
        }

        // Test Collisions
        this.onFloor = false;

        let newPlayerX = this.playerX + this.playerVelocityX;
        let newPlayerY = this.playerY + this.playerVelocityY;

        if (0 < this.playerVelocityX){ // Derecha
            if (this.getTile(newPlayerX+1, this.playerY) !== '.' || this.getTile(newPlayerX+1, this.playerY+0.99) !== '.'){
                this.playerX = newPlayerX = Math.floor(newPlayerX);
                this.playerVelocityX = 0;
            }
        }

        if (this.playerVelocityX < 0){ // Izquierda
            if (this.getTile(newPlayerX, this.playerY) !== '.' || this.getTile(newPlayerX, this.playerY+0.99) !== '.'){
                this.playerX = newPlayerX = Math.floor(newPlayerX + 1);
                this.playerVelocityX = 0;
            }
        }

        if (0 < this.playerVelocityY){ // Abajo
            if (this.getTile(newPlayerX, newPlayerY+1) !== '.' || this.getTile(newPlayerX+0.99, newPlayerY+1) !== '.'){
                this.playerY = Math.floor(newPlayerY);
                this.playerVelocityY = 0;
                this.onFloor = true;
            }
        }

        if (this.playerVelocityY < 0){ // Arriba
            if (this.getTile(newPlayerX, newPlayerY) !== '.' || this.getTile(newPlayerX+0.99, newPlayerY) !== '.'){
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
                        this.ctx.fillStyle = 'blue';
                        this.ctx.fillRect(this.scale*x, this.scale*y, this.scale, this.scale);
                }
            }
        }

        // Render Player
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.scale*this.playerX, this.scale*this.playerY, this.scale, this.scale)
    }
}

export default Game