import {tiles, Tile} from '@/utils/Platformer/Tiles.js'
import {playerSprite} from '@/utils/Platformer/Sprites.js'
import Animation from '@/utils/Platformer/Animation.js';

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
        this.player = {x:8, y:this.levelHeight-2, 
            velocityX: 0, velocityY: 0, onFloor: true, facingRight: true, idle: true,
            rightAnimation: new Animation(
                playerSprite, 
                [{sx: 0, sy:0},{sx: 1, sy:0},{sx: 2, sy:0},{sx: 3, sy:0},{sx: 4, sy:0},{sx: 5, sy:0},{sx: 6, sy:0},{sx: 7, sy:0},{sx: 8, sy:0},{sx: 9, sy:0}]
            ),
            leftAnimation: new Animation(
                playerSprite, 
                [{sx: 0, sy:1},{sx: 1, sy:1},{sx: 2, sy:1},{sx: 3, sy:1},{sx: 4, sy:1},{sx: 5, sy:1},{sx: 6, sy:1},{sx: 7, sy:1},{sx: 8, sy:1},{sx: 9, sy:1}]
            ),
            rightIdle: new Tile(
                playerSprite, 
                0,0
            ),
            leftIdle: new Tile(
                playerSprite,
                0, 1
            )
        }

        this.gravity = -0.3;
        this.onUserCreate();
    }

    onUserCreate(){
        this.tileMapping = {
            '$':tiles.snow.centerXtopY,
            '#':tiles.snow.centerXcenterY,
            'R':tiles.snow.rightXtopY,
            'L':tiles.snow.leftXtopY,
            'D':tiles.snow.rightXcenterY,
            'I':tiles.snow.leftXcenterY,
            'Z':tiles.snow.leftXbottomY,
            'X':tiles.snow.centerXbottomY,
            'C':tiles.snow.rightXbottomY,
            'F':tiles.flag,
            '.':null
        }

        this.level += 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
        this.level += 'D..............................I';
        this.level += 'D..............................I';
        this.level += 'D..............................I';
        this.level += 'D..............................I';
        this.level += 'D..............................I';
        this.level += 'D..............................I';
        this.level += 'D..............................I';
        this.level += 'D...F....L$R...................I';
        this.level += 'D.L$$$R..I#D..L$$$$$$R..L$$R...I';
        this.level += 'D.I###D..I#D..I######D..ZXXC..L$';
        this.level += 'D.I###D..I#D..I######D.......L$#';
        this.level += 'D.I###D..ZXC..ZXXXXXXC......L$##';
        this.level += 'D.I###D....................L$###';
        this.level += 'D.I###D...................L$####';
        this.level += '$$$$$$$$$$$$$$$$$$$$$$$$$$$#####';
    }

    getChar(x, y){
        x = Math.floor(x);
        y = Math.floor(y);
        if (0 <= x < this.levelWidth && 0 <= y < this.levelHeight){
            return this.level.charAt(y*this.levelWidth + x);
        }
        return null;
    }

    getTile(x, y){
        const char = this.getChar(x, y);
        return this.tileMapping[char];
    }

    onUserUpdate(isKeyboardPressed){
        this.player.idle = true;

        // Handle Input

        if (isKeyboardPressed['ArrowUp']){
            if (this.player.onFloor === true){
                this.player.velocityY -= 5;
                this.player.onFloor = false;
            }
        }

        if (isKeyboardPressed['ArrowLeft']){
            this.player.velocityX -= 0.3;
            this.player.facingRight = false;
            this.player.idle = false;
        }else if (isKeyboardPressed['ArrowRight']){
            this.player.velocityX += 0.3;
            this.player.facingRight = true;
            this.player.idle = false;
        }

        // Physics

        this.player.velocityX = 0.9*this.player.velocityX;
        this.player.velocityY -= this.gravity;

        if (this.player.velocityX < -0.4)
            this.player.velocityX = -0.4;
        if (0.4 < this.player.velocityX)
            this.player.velocityX = 0.4;
        
        if (this.player.velocityY < -1)
            this.player.velocityY = -1;
        if (1 < this.player.velocityY)
            this.player.velocityY = 1;

        if (Math.abs(this.player.velocityX) < 0.1){
            this.player.velocityX = 0;
        }

        // Test Collisions
        this.player.onFloor = false;

        let newPlayerX = this.player.x + this.player.velocityX;
        let newPlayerY = this.player.y + this.player.velocityY;

        if (0 < this.player.velocityX){ // Derecha
            if (this.getChar(newPlayerX+1, this.player.y) !== '.' || this.getChar(newPlayerX+1, this.player.y+0.99) !== '.'){
                this.player.x = newPlayerX = Math.floor(newPlayerX);
                this.player.velocityX = 0;
            }
        }

        if (this.player.velocityX < 0){ // Izquierda
            if (this.getChar(newPlayerX, this.player.y) !== '.' || this.getChar(newPlayerX, this.player.y+0.99) !== '.'){
                this.player.x = newPlayerX = Math.floor(newPlayerX + 1);
                this.player.velocityX = 0;
            }
        }

        if (0 < this.player.velocityY){ // Abajo
            if (this.getChar(newPlayerX, newPlayerY+1) !== '.' || this.getChar(newPlayerX+0.99, newPlayerY+1) !== '.'){
                this.player.y = Math.floor(newPlayerY);
                this.player.velocityY = 0;
                this.player.onFloor = true;
            }
        }

        if (this.player.velocityY < 0){ // Arriba
            if (this.getChar(newPlayerX, newPlayerY) !== '.' || this.getChar(newPlayerX+0.99, newPlayerY) !== '.'){
                this.player.y = Math.floor(newPlayerY + 1);
                this.player.velocityY = 0;
            }
        }

        // Update State
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;

        // Render
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Render Map
        for (let x=0; x<this.levelWidth; x++){
            for (let y=0; y<this.levelHeight; y++){
                const tile = this.getTile(x, y);
                
                if (tile){
                    tile.render(this.ctx, x, y, this.scale);
                }
            }
        }

        // Render Player

        if (this.player.idle){
            if (this.player.facingRight){
                this.player.rightIdle.render(this.ctx, this.player.x, this.player.y, this.scale);
            }else{
                this.player.leftIdle.render(this.ctx, this.player.x, this.player.y, this.scale);
            }
        }else{
            if (this.player.facingRight){
                this.player.rightAnimation.render(this.ctx, this.player.x, this.player.y, this.scale);
            }else{
                this.player.leftAnimation.render(this.ctx, this.player.x, this.player.y, this.scale);
            }
        }
    }
}

export default Game