let fog= document.querySelector(".fow");
let fogContext= fog.getContext("2d");

export class FoW{
    constructor(game){
        this.size=game.size;
        this.rows=game.rows;
        this.columns=game.columns;
        this.grid=game.maze.grid;
    }

    setup(){
        fog.width=this.size;
        fog.height=this.size;
        fogContext.fillStyle="#000d";
        this.castLight(0,0,"down");
    }
    update(isMoving,posX,posY,dir){
        if (isMoving) {
        }
        this.castLight(posX,posY,dir,isMoving)
    }
    draw(isMoving,context){
        // if (isMoving) {
        //     context.fill()
        // }
    }
    castLight(posX,posY,dir,isMoving){
        //reset the fog    
        // for(let r=0;r<this.rows;r++){
        //     for (let c=0; c<this.columns;c++){
        //         fogContext.rect(c*this.size/this.columns,r*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        //     }
        // }
        fogContext.fillStyle="#000d";
        fogContext.beginPath();
        fogContext.clearRect(0,0,this.size,this.size);
        fogContext.rect(0,0,this.size,this.size)
        fogContext.fill()
        // fogContext.globalCompositeOperation="destination-out"
        //update the light
        if(!isMoving){
            
            fogContext.fillStyle="#0007";
            if(posX>0 && !this.grid[Math.round(posY)][Math.round(posX)].walls.leftWall){
                // if(posX-1>0 && !this.grid[Math.round(posY)][Math.round(posX-1)].walls.leftWall && dir=="left"){
                //     fogContext.clearRect((posX-2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                //     fogContext.fillRect((posX-2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                // }
                fogContext.clearRect((posX-1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect((posX-1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            }
            if(posX<this.columns-1 && !this.grid[Math.round(posY)][Math.round(posX)].walls.rightWall){
                // if(posX+1<this.columns-1 && !this.grid[Math.round(posY)][Math.round(posX+1)].walls.rightWall && dir=="right"){
                //     fogContext.clearRect((posX+2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                //     fogContext.fillRect((posX+2)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                // }
                fogContext.clearRect((posX+1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect((posX+1)*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            }
            if(posY>0 && !this.grid[Math.round(posY)][Math.round(posX)].walls.topWall){
                // if(posY-1>0 && !this.grid[Math.round(posY-1)][Math.round(posX)].walls.topWall && dir=="up"){
                //     fogContext.clearRect(posX*this.size/this.columns,(posY-2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                //     fogContext.fillRect(posX*this.size/this.columns,(posY-2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                // }
                fogContext.clearRect(posX*this.size/this.columns,(posY-1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect(posX*this.size/this.columns,(posY-1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            }
            if(posY<this.rows-1 && !this.grid[Math.round(posY)][Math.round(posX)].walls.bottomWall){
                // if(posY+1<this.rows-1 && !this.grid[Math.round(posY+1)][Math.round(posX)].walls.bottomWall && dir=="down"){
                //     fogContext.clearRect(posX*this.size/this.columns,(posY+2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                //     fogContext.fillRect(posX*this.size/this.columns,(posY+2)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                // }
                fogContext.clearRect(posX*this.size/this.columns,(posY+1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.rect(posX*this.size/this.columns,(posY+1)*this.size/this.rows,this.size/this.columns,this.size/this.rows);
            }
        }
        fogContext.fill();
        // fogContext.fillStyle="#0000"
        fogContext.clearRect(posX*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        // fogContext.fillRect(posX*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        // fogContext.fill();
        fogContext.closePath();
        console.log("hola")
    }

}