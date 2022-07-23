import {playerSprite, topSprite, flagSprite} from '@/utils/Platformer/Sprites.js'

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
        this.player = {x:8, y:this.levelHeight-2, velocityX: 0, velocityY: 0, onFloor: true, facingRight: true}

        this.gravity = -0.3;

        this.onUserCreate();
    }

    onUserCreate(){
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
            if (this.player.onFloor === true){
                this.player.velocityY -= 5;
                this.player.onFloor = false;
            }
        }

        if (isKeyboardPressed['ArrowLeft']){
            this.player.velocityX -= 0.3;
            this.player.facingRight = false;
        }else if (isKeyboardPressed['ArrowRight']){
            this.player.velocityX += 0.3;
            this.player.facingRight = true;
        }

        // Physics

        this.player.velocityX = 0.9*this.player.velocityX;
        this.player.velocityY -= this.gravity;

        if (this.player.velocityX < -0.6)
            this.player.velocityX = -0.6;
        if (0.6 < this.player.velocityX)
            this.player.velocityX = 0.6;
        
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
            if (this.getTile(newPlayerX+1, this.player.y) !== '.' || this.getTile(newPlayerX+1, this.player.y+0.99) !== '.'){
                this.player.x = newPlayerX = Math.floor(newPlayerX);
                this.player.velocityX = 0;
            }
        }

        if (this.player.velocityX < 0){ // Izquierda
            if (this.getTile(newPlayerX, this.player.y) !== '.' || this.getTile(newPlayerX, this.player.y+0.99) !== '.'){
                this.player.x = newPlayerX = Math.floor(newPlayerX + 1);
                this.player.velocityX = 0;
            }
        }

        if (0 < this.player.velocityY){ // Abajo
            if (this.getTile(newPlayerX, newPlayerY+1) !== '.' || this.getTile(newPlayerX+0.99, newPlayerY+1) !== '.'){
                this.player.y = Math.floor(newPlayerY);
                this.player.velocityY = 0;
                this.player.onFloor = true;
            }
        }

        if (this.player.velocityY < 0){ // Arriba
            if (this.getTile(newPlayerX, newPlayerY) !== '.' || this.getTile(newPlayerX+0.99, newPlayerY) !== '.'){
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

                if (tile === '$'){
                    this.ctx.drawImage(
                        topSprite,
                        this.scale, 
                        0,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }
                else if  (tile === '#'){
                    this.ctx.drawImage(
                        topSprite,
                        this.scale, 
                        this.scale,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }else if  (tile === 'R'){
                    this.ctx.drawImage(
                        topSprite,
                        2*this.scale, 
                        0,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }else if  (tile === 'L'){
                    this.ctx.drawImage(
                        topSprite,
                        0*this.scale, 
                        0,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }else if (tile === 'F'){
                    this.ctx.drawImage(
                        flagSprite,
                        this.scale*x, 
                        this.scale*y
                    )
                }else if (tile === 'D'){
                    this.ctx.drawImage(
                        topSprite,
                        2*this.scale, 
                        this.scale,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }else if (tile === 'I'){
                    this.ctx.drawImage(
                        topSprite,
                        0*this.scale, 
                        this.scale,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }else if  (tile === 'Z'){
                    this.ctx.drawImage(
                        topSprite,
                        0*this.scale, 
                        2*this.scale,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }else if  (tile === 'X'){
                    this.ctx.drawImage(
                        topSprite,
                        1*this.scale, 
                        2*this.scale,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }else if  (tile === 'C'){
                    this.ctx.drawImage(
                        topSprite,
                        2*this.scale, 
                        2*this.scale,
                        this.scale, 
                        this.scale, 
                        Math.round(this.scale * x),
                        Math.round(this.scale * y),
                        this.scale,
                        this.scale
                    )
                }
            }
        }

        // Render Player
        this.ctx.fillStyle = 'darkOrange';
        // this.ctx.fillRect(this.scale*this.player.x, this.scale*this.player.y, this.scale, this.scale);

        const deltaX = this.player.facingRight? 0 : 1;
        const deltaY = this.player.onFloor? 0 : 1;

        this.ctx.drawImage(
            playerSprite,
            this.scale * deltaX, 
            this.scale * deltaY,
            this.scale, 
            this.scale, 
            Math.round(this.scale * this.player.x),
            Math.round(this.scale * this.player.y),
            this.scale,
            this.scale
        )
    }
}

export default Game