let player= document.querySelector(".player");
let playerContext= player.getContext("2d");

export class Player{
    constructor(size,rows,columns,grid){
        this.spriteWidth=16;
        this.spriteHeight=16;
        this.characterWidth=size/columns;
        this.characterHeight=size/rows;
        this.size=size;
        this.rows=rows;
        this.columns=columns;
        this.grid=grid;
        this.movementSpeed=0.03;
        this.movementSnaper=0;
        this.isMoving=false;
        this.playerPosX;
        this.playerPosY;
        this.currentDirection="down"
        this.directions=["right","left","up","down"];
        this.framePosition=0;
        this.animationSpeed=0.2;
        this.idleCounter=0;
        // this.playerSprite= new Image();
        // this.playerSprite.src="./images/character/characterSpriteSheet.png"
        this.playerSprite=document.querySelector(".character-spriteSheet");
    }
    update(input){
        if (!this.isMoving){
            if (input.includes("ArrowUp")){
                if(this.currentDirection=="up"){
                    this.moveUp();
                }else{
                    this.rotate("up");
                }
                this.idleCounter=0;
            }
            if (input.includes("ArrowDown")){
                if(this.currentDirection=="down"){
                    this.moveDown();
                }else{
                    this.rotate("down");
                }
                this.idleCounter=0;
            }
            if (input.includes("ArrowLeft")){
                if(this.currentDirection=="left"){
                    this.moveLeft();
                }else{
                    this.rotate("left");
                }
                this.idleCounter=0;
            }
            if (input.includes("ArrowRight")){
                if(this.currentDirection=="right"){
                    this.moveRight();
                }else{
                    this.rotate("right");
                }
                this.idleCounter=0;
            }
            if(!input.length){
                this.idleHandler();
            }
        }else{
            if (this.movementSnaper<1-(this.movementSpeed)){
                this.movementSnaper+=this.movementSpeed;
                switch (this.currentDirection) {
                    case "up":
                        this.playerPosY-=this.movementSpeed;
                        break;
                    case "down":
                        this.playerPosY+=this.movementSpeed;
                        break;
                    case "left":
                        this.playerPosX-=this.movementSpeed;
                        break;
                    case "right":
                        this.playerPosX+=this.movementSpeed;
                        break;
                }
            }else{
                this.playerPosX=Math.round(this.playerPosX);
                this.playerPosY=Math.round(this.playerPosY);
                this.movementSnaper=0;
                this.isMoving=false;
                this.framePosition=0;
            }
            // console.log(this.playerPosX,this.playerPosY)
        }
        this.animationHandler();
    }
    animationHandler(){
        this.framePosition=(Math.floor(this.movementSnaper/this.animationSpeed))%4;
    }
    idleHandler(){
        this.idleCounter++;
        if(this.idleCounter>=200){
            this.movementSnaper+=this.movementSpeed/2;
            this.framePosition=(Math.floor(this.movementSnaper/this.animationSpeed/2))%4;
        }
        if(this.idleCounter>=200+(this.animationSpeed*4*60)){
            this.idleCounter=0;
            this.movementSnaper=0;
        }
    }
    draw(context){
        this.clearCharacter();
        this.renderCharacter();
    }
    setup(){
        player.width=this.size;
        player.height=this.size;
        this.playerPosX=0;
        this.playerPosY=0;
        this.renderCharacter()
        // this.playerSprite.onload=()=>{
        // }
    }
    clearCharacter(){
        playerContext.clearRect(0,0,this.size,this.size);
    }
    renderCharacter(){
        playerContext.imageSmoothingEnabled = false;
        playerContext.drawImage(
            //target image
            this.playerSprite,
            //horizontal position in the sprite
            this.spriteWidth*this.framePosition,
            //vertical position in the sprite
            this.spriteHeight*(this.directions.indexOf(this.currentDirection) + (this.isMoving?4:0)),
            //sprite pixels-width
            this.spriteWidth,
            //sprite pixels-height
            this.spriteHeight,
            //coordinates on the canvas and size of the img
            this.playerPosX*this.characterWidth,
            this.playerPosY*this.characterHeight,
            this.characterWidth,
            this.characterHeight
            );

    }
    rotate(dir){
        this.currentDirection=dir;
    }
    moveUp(){
        if(this.playerPosY>0 && !this.grid[this.playerPosY][this.playerPosX].walls.topWall){
            this.isMoving=true;
            this.movementSnaper=0;
        }
    }
    moveDown(){
        if(this.playerPosY<this.rows-1 && !this.grid[this.playerPosY][this.playerPosX].walls.bottomWall){
            this.isMoving=true;
            this.movementSnaper=0;
        }
    }
    moveLeft(){
        if(this.playerPosX>0 && !this.grid[this.playerPosY][this.playerPosX].walls.leftWall){
            this.isMoving=true;
            this.movementSnaper=0;
        }
    }
    moveRight(){
        if(this.playerPosX<this.columns-1 && !this.grid[this.playerPosY][this.playerPosX].walls.rightWall){
            this.isMoving=true;
            this.movementSnaper=0;
        }
    }
    get getPlayerPosX(){
        return this.playerPosX;
    }
    get getPlayerPosY(){
        return this.playerPosY;
    }
}