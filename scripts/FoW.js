let fog= document.querySelector(".fow");
let fogContext= fog.getContext("2d");

export class FoW{
    constructor(game){
        this.size=game.size;
        this.rows=game.rows;
        this.columns=game.columns;
        this.grid=game.maze.grid;
        this.currentPosX;
        this.currentPosY;
        this.lightRange=[];
        this.current;
        this.stack=[];
    }

    setup(){
        fog.width=this.size;
        fog.height=this.size;
        fogContext.fillStyle="#000d";
        this.currentPosX=0;
        this.currentPosY=0;
        this.current=this.grid[this.currentPosY][this.currentPosX];
        this.clearLight();
        fogContext.fillStyle="#a003";
        this.calculateLightRange(this.currentPosX,this.currentPosY);
        console.log(this.lightRange)
        // this.castLight(0,0,"down");
    }
    update(isMoving,posX,posY,dir){
        if (Math.round(posX)!=this.currentPosX || 
            Math.round(posY)!=this.currentPosY) {
            this.currentPosX=Math.round(posX);
            this.currentPosY=Math.round(posY);
            this.current=this.grid[this.currentPosY][this.currentPosX];
            this.clearLight();
            this.calculateLightRange(this.currentPosX,this.currentPosY);
        }
        this.castLight(posX,posY)

    }
    draw(isMoving,context){
        // if (isMoving) {
        //     context.fill()
        // }
    }
    checkIntensity(length){
        switch (length){
            case 0 :
                return "#0007"
            case 2:
                return "#0009"
            case 3:
                return "#000b"
            case 4:
                return "#000a"
            default:
                return "#0007"
        }
    }
    calculateLightRange(posX,posY){
        if (!this.current.visited){
            this.lightRange.push({
                cell: this.current,
                lightIntensity: this.checkIntensity(this.stack.length)
            });
        }
        this.current.visited =true;
        let next= this.current.checkLightSpread();
        if (next && this.stack.length<=2 ){
                this.stack.push(this.current);
                console.log("pushed", this.current)
            this.current =next;
        }else if(this.stack.length){
            this.current=this.stack.pop();
        }else{
            return;
        }
        
        this.calculateLightRange()
    }
    clearLight(){
        for (let i=0; i<this.grid.length;i++){
            for(let j=0; j<this.grid[0].length;j++){
                this.grid[i][j].visited=false;
            }
        }
        this.lightRange=[];
    }
    castLight(posX,posY){
        fogContext.fillStyle="#000e";
        fogContext.beginPath();
        fogContext.clearRect(0,0,this.size,this.size);
        fogContext.rect(0,0,this.size,this.size)
        fogContext.fill()
        fogContext.closePath()

        this.lightRange.forEach(cell=>{
                fogContext.beginPath()
                fogContext.fillStyle=cell.lightIntensity;
                fogContext.clearRect(cell.cell.colNum*this.size/this.columns,cell.cell.rowNum*this.size/this.rows,this.size/this.columns,this.size/this.rows);
                fogContext.fillRect(cell.cell.colNum*this.size/this.columns,cell.cell.rowNum*this.size/this.rows,this.size/this.columns,this.size/this.rows)
                fogContext.closePath()
        })
        fogContext.beginPath()
        fogContext.fillStyle="#0000"
        fogContext.clearRect(posX*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        fogContext.fillRect(posX*this.size/this.columns,posY*this.size/this.rows,this.size/this.columns,this.size/this.rows);
        fogContext.fill();
        fogContext.closePath();
    }

}