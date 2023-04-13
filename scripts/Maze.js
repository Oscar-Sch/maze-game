let maze= document.querySelector(".maze");
let mazeContext= maze.getContext("2d");
let player= document.querySelector(".player");
let playerContext= player.getContext("2d");
let fog= document.querySelector(".fow");
let fogContext= fog.getContext("2d");

let current;

export class Maze{
    constructor(size,rows,columns){
        this.size=size;
        this.rows=rows;
        this.columns=columns;
        this.grid=[];
        this.stack=[];
    }

    setup(){
        for(let r=0; r<this.rows; r++){
            let row=[];
            for(let c=0; c<this.columns; c++){
                let cell= new Cell(r,c,this.grid,this.size);
                row.push(cell);
                console.log("cell added")
            }
            this.grid.push(row);
            console.log("row pusshed")
        }
        current=this.grid[0][0];
        this.draw();
        this.render();
    }
    render(){
        maze.width=this.size;
        maze.height=this.size;
        for(let r=0;r<this.rows;r++){
            for (let c=0; c<this.columns;c++){
                this.grid[r][c].show(this.size,this.rows,this.columns);
            }
        }
    }
    draw(){
        current.visited =true;
        let next= current.checkNeighbours();
        if(Math.random()<0.30){
            let newOpening= current.checkWalls()
            current.removeWalls(current, newOpening)
        }
        if (next){
            this.stack.push(current);
            current.removeWalls(current, next);
            current =next;
        }else if(this.stack.length){
            current=this.stack.pop();
        }else{
            return;
        }
        this.draw()
    }
    get getSize(){
        return this.size;
    }
    get getRows(){
        return this.rows;
    }
    get getColumns(){
        return this.columns;
    }
    get getGrid(){
        return this.grid;
    }
}

class Cell{
    constructor(rowNum,colNum,parentGrid,parentSize){
        this.rowNum=rowNum;
        this.colNum=colNum;
        this.parentGrid=parentGrid;
        this.parentSize=parentSize;
        this.visited=false;
        this.walls= {
            topWall: true,
            rightWall:true,
            bottomWall:true,
            leftWall:true
        };
        this.doors={
            topDoor: {
                present:false,
                opened:false
            },
            rightDoor: {
                present:false,
                opened:false
            },
            bottomDoor: {
                present:false,
                opened:false
            },
            leftDoor: {
                present:false,
                opened:false
            }
        }
        
    }

    checkNeighbours(){
        let grid=this.parentGrid;
        let col=this.colNum;
        let row=this.rowNum;
        let neighbours=[];

        let top=row!==0? grid[row-1][col]:undefined;
        let right=col!==grid[0].length-1? grid[row][col+1]:undefined;
        let bottom=row!==grid.length-1? grid[row+1][col]:undefined;
        let left=col!==0? grid[row][col-1]:undefined;

        if(top && !top.visited){
            neighbours.push(top);
        }
        if(right && !right.visited){
            neighbours.push(right);
        }
        if(bottom && !bottom.visited){
            neighbours.push(bottom);
        }
        if(left && !left.visited){
            neighbours.push(left);
        }
        if (neighbours.length){
            let random= Math.floor(Math.random()*neighbours.length);
            return neighbours[random];
        }else{
            return undefined;
        }

    }
    checkWalls(){
        let grid=this.parentGrid;
        let col=this.colNum;
        let row=this.rowNum;
        let availableWalls=[];

        let top=row!==0? grid[row-1][col]:undefined;
        let right=col!==grid[0].length-1? grid[row][col+1]:undefined;
        let bottom=row!==grid.length-1? grid[row+1][col]:undefined;
        let left=col!==0? grid[row][col-1]:undefined;

        if(top && !top.walls.bottomWall){
            availableWalls.push(top);
        }
        if(right && !right.walls.leftmWall){
            availableWalls.push(right);
        }
        if(bottom && !bottom.walls.topWall){
            availableWalls.push(bottom);
        }
        if(left && !left.walls.rightWall){
            availableWalls.push(left);
        }
        if (availableWalls.length){
            let random= Math.floor(Math.random()*availableWalls.length);
            return availableWalls[random];
        }else{
            return undefined;
        }

    }

    removeWalls(cell1,cell2){
        let x= cell1.colNum - cell2.colNum;
        if (x==1){
            cell1.walls.leftWall=false;
            cell2.walls.rightWall=false;
        }else if (x==-1){
            cell2.walls.leftWall=false;
            cell1.walls.rightWall=false;
        }

        let y= cell1.rowNum - cell2.rowNum;
        if (y==1){
            cell1.walls.topWall=false;
            cell2.walls.bottomWall=false;
        }else if (y==-1){
            cell2.walls.topWall=false;
            cell1.walls.bottomWall=false;
        }
    }

    drawTopWall(x,y,size,columns,rows){
        let topImg=new Image();
        topImg.src="./images/maze/topWall.png";
        topImg.onload= ()=>{
            mazeContext.imageSmoothingEnabled = false;
            mazeContext.drawImage(topImg,x,y,size/columns,size/rows)
        }
    }
    drawRightWall(x,y,size,columns,rows){
        let rightImg=new Image();
        rightImg.src="./images/maze/rightWall.png";
        rightImg.onload= ()=>{
            mazeContext.imageSmoothingEnabled = false;
            mazeContext.drawImage(rightImg,x,y,size/columns,size/rows)
        }
    }
    drawBottomWall(x,y,size,columns,rows){
        let bottomImg=new Image();
        bottomImg.src="./images/maze/bottomWall.png";
        bottomImg.onload= ()=>{
            mazeContext.imageSmoothingEnabled = false;
            mazeContext.drawImage(bottomImg,x,y,size/columns,size/rows)
        }
    }
    drawLeftWall(x,y,size,columns,rows){
        let leftImg=new Image();
        leftImg.src="./images/maze/leftWall.png";
        leftImg.onload= ()=>{
            mazeContext.imageSmoothingEnabled = false;
            mazeContext.drawImage(leftImg,x,y,size/columns,size/rows)
        }
    }

    show(size, rows, columns){
        let x= (this.colNum*size)/columns;
        let y= (this.rowNum*size)/rows;


        let groundImg=new Image();
        groundImg.src="./images/maze/ground.png"
        groundImg.onload= ()=>{
            mazeContext.imageSmoothingEnabled = false;
            mazeContext.drawImage(groundImg,x,y,size/columns,size/rows)
        }
        let grid=this.parentGrid;
        let col=this.colNum;
        let row=this.rowNum;

        if (this.walls.topWall){
            this.drawTopWall(x,y,size,columns,rows);
        }else{
            if(!this.walls.rightWall && col!=grid[0].length-1 && grid[row][col+1].walls.topWall){
                let rightHalfWallImg=new Image();
                rightHalfWallImg.src="./images/maze/rightHalfWall.png"
                rightHalfWallImg.onload= ()=>{
                mazeContext.imageSmoothingEnabled = false;
                mazeContext.drawImage(rightHalfWallImg,x,y,size/columns,size/rows)
                }
            }
            if(!this.walls.leftWall && col!=0 && grid[row][col-1].walls.topWall){
                let leftHalfWallImg=new Image();
                leftHalfWallImg.src="./images/maze/leftHalfWall.png"
                leftHalfWallImg.onload= ()=>{
                mazeContext.imageSmoothingEnabled = false;
                mazeContext.drawImage(leftHalfWallImg,x,y,size/columns,size/rows)
                }
            }
        }
        if (this.walls.rightWall){
            this.drawRightWall(x,y,size,columns,rows);
        }else{
            if(!this.walls.bottomWall && row!=grid.length-1 && col!=grid[0].length-1 && grid[row + 1][col + 1].walls.topWall){
                let bottomRightCornerImg=new Image();
                bottomRightCornerImg.src="./images/maze/bottomRightCorner.png"
                bottomRightCornerImg.onload= ()=>{
                mazeContext.imageSmoothingEnabled = false;
                mazeContext.drawImage(bottomRightCornerImg,x,y,size/columns,size/rows)
                }
            }
        }
        if (this.walls.bottomWall){
            this.drawBottomWall(x,y,size,columns,rows);
        }
        if (this.walls.leftWall){
            this.drawLeftWall(x,y,size,columns,rows);
        }else{
            if(!this.walls.bottomWall && row!=grid.length-1 && col!=0 && grid[row + 1][col - 1].walls.topWall){
                let bottomLeftCornerImg=new Image();
                bottomLeftCornerImg.src="./images/maze/bottomLeftCorner.png"
                bottomLeftCornerImg.onload= ()=>{
                mazeContext.imageSmoothingEnabled = false;
                mazeContext.drawImage(bottomLeftCornerImg,x,y,size/columns,size/rows)
                }
            }
        }
        // mazeContext.globalCompositeOperation='destination-over';
        // mazeContext.fillStyle="#0005";
        // mazeContext.beginPath();
        // mazeContext.rect(x,y,size/columns,size/rows);
        // mazeContext.fill();
    }
}

class Player{
    constructor(size,rows,columns,grid){
        this.size=size;
        this.rows=rows;
        this.columns=columns;
        this.grid=grid;
        this.playerPosX;
        this.playerPosY;
        this.direction="down";
        this.playerSprite={
            up:new Image(),
            down:new Image(),
            left:new Image(),
            right:new Image()
        };
        this.playerSprite.right.src="./images/character/idle-right.png"
        this.playerSprite.left.src="./images/character/idle-left.png"
        this.playerSprite.up.src="./images/character/idle-up.png"
        this.playerSprite.down.src="./images/character/idle-down.png"
    }
    setup(){
        player.width=this.size;
        player.height=this.size;
        this.playerPosX=0;
        this.playerPosY=0;
        this.playerSprite.down.onload=()=>{
            this.renderCharacter()
        }
    }
    clearCharacter(){
        playerContext.clearRect(this.playerPosX*this.size/this.columns,this.playerPosY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
    }
    renderCharacter(){
        playerContext.imageSmoothingEnabled = false;
        playerContext.drawImage(this.playerSprite[this.direction],this.playerPosX*this.size/this.columns,this.playerPosY*this.size/this.rows,this.size/this.columns,this.size/this.rows)
    }
    rotate(dir){
        this.direction=dir;
        this.clearCharacter();
        this.renderCharacter();
    }
    moveUp(){
        if(this.playerPosY>0 && !this.grid[this.playerPosY][this.playerPosX].walls.topWall){
            this.clearCharacter()
            this.playerPosY--;
            this.renderCharacter()
        }
    }
    moveDown(){
        if(this.playerPosY<this.rows-1 && !this.grid[this.playerPosY][this.playerPosX].walls.bottomWall){
            this.clearCharacter()
            this.playerPosY++;
            this.renderCharacter()
        }
    }
    moveLeft(){
        if(this.playerPosX>0 && !this.grid[this.playerPosY][this.playerPosX].walls.leftWall){
            this.clearCharacter()
            this.playerPosX--;
            this.renderCharacter()
        }
    }
    moveRight(){
        if(this.playerPosX<this.columns-1 && !this.grid[this.playerPosY][this.playerPosX].walls.rightWall){
            this.clearCharacter()
            this.playerPosX++;
            this.renderCharacter()
        }
    }
    get getPlayerPosX(){
        return this.playerPosX;
    }
    get getPlayerPosY(){
        return this.playerPosY;
    }
}

class FoW{
    constructor(size,rows,columns,grid){
        this.size=size;
        this.rows=rows;
        this.columns=columns;
        this.grid=grid;
        this.positionX;
        this.positionY;
        this.direction;
    }

    setup(){
        fog.width=this.size;
        fog.height=this.size;
        this.castLight(0,0,"down");
    }
    castLight(posX,posY,dir){
        //reset the fog
        fogContext.fillStyle="#000d";
        for(let r=0;r<this.rows;r++){
            for (let c=0; c<this.columns;c++){
                fogContext.rect(c*this.size/this.columns,r*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            }
        }
        fogContext.fill();
        //update the light
        fogContext.fillStyle="#0007";
        if(posX>0 && !this.grid[posY][posX].walls.leftWall){
            if(posX-1>0 && !this.grid[posY][posX-1].walls.leftWall && dir=="left"){
                fogContext.clearRect((posX-2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect((posX-2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.fill();
            }
            fogContext.clearRect((posX-1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            fogContext.rect((posX-1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        }
        if(posX<this.columns-1 && !this.grid[posY][posX].walls.rightWall){
            if(posX+1<this.columns-1 && !this.grid[posY][posX+1].walls.rightWall && dir=="right"){
                fogContext.clearRect((posX+2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect((posX+2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.fill();
            }
            fogContext.clearRect((posX+1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            fogContext.rect((posX+1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        }
        if(posY>0 && !this.grid[posY][posX].walls.topWall){
            if(posY-1>0 && !this.grid[posY-1][posX].walls.topWall && dir=="up"){
                fogContext.clearRect(posX*this.size/this.columns,(posY-2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect(posX*this.size/this.columns,(posY-2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.fill();
            }
            fogContext.clearRect(posX*this.size/this.columns,(posY-1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            fogContext.rect(posX*this.size/this.columns,(posY-1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        }
        if(posY<this.rows-1 && !this.grid[posY][posX].walls.bottomWall){
            if(posY+1<this.rows-1 && !this.grid[posY+1][posX].walls.bottomWall && dir=="down"){
                fogContext.clearRect(posX*this.size/this.columns,(posY+2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect(posX*this.size/this.columns,(posY+2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.fill();
            }
            fogContext.clearRect(posX*this.size/this.columns,(posY+1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            fogContext.rect(posX*this.size/this.columns,(posY+1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        }
        fogContext.fill();
        fogContext.fillStyle="#0000";
        fogContext.clearRect(posX*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        fogContext.rect(posX*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        fogContext.fill();
    }

}
/*
let newMaze= new Maze(800,7,7);
newMaze.setup();
newMaze.draw();
newMaze.render();
let newPlayer=new Player(newMaze.getSize,newMaze.getRows,newMaze.getColumns,newMaze.getGrid);
newPlayer.setup();
// let newFog= new FoW(newMaze.getSize,newMaze.getRows,newMaze.getColumns,newMaze.getGrid);
// newFog.setup();

document.addEventListener("keydown",(event)=>{
    console.log(event)
    if(event.key==="ArrowUp"){
        if(newPlayer.direction=="up"){
            newPlayer.moveUp();
        }else{
            newPlayer.rotate("up");
        }
        // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"up")
        // newPlayer.direction=="up"?newPlayer.moveUp():newPlayer.rotate("up");
        // newPlayer.moveUp();
    }
    if(event.key==="ArrowDown"){
        if(newPlayer.direction=="down"){
            newPlayer.moveDown();
        }else{
            newPlayer.rotate("down");
        }
        // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"down")
        // newPlayer.direction=="down"?newPlayer.moveDown():newPlayer.rotate("down");
        // newPlayer.moveDown();
    }
    if(event.key==="ArrowLeft"){
        if(newPlayer.direction=="left"){
            newPlayer.moveLeft();
        }else{
            newPlayer.rotate("left");
        }
        // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"left")
        // newPlayer.direction=="left"?newPlayer.moveLeft():newPlayer.rotate("left");
        // newPlayer.moveLeft();
    }
    if(event.key==="ArrowRight"){
        if(newPlayer.direction=="right"){
            newPlayer.moveRight();
        }else{
            newPlayer.rotate("right");
        }
        // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"right")
        // newPlayer.direction=="right"?newPlayer.moveRight():newPlayer.rotate("right");
        // newPlayer.moveRight();
    }
})

window.onload= ()=>{
    window.requestAnimationFrame(update)
}
function update(){
    window.requestAnimationFrame(update)
}
*/