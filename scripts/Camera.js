const container=document.querySelector(".canvas-container");
const canvasCollection=document.querySelectorAll(".camera");

export class Camera{
    constructor(game){
        this.size=game.size;
        this.rows=game.rows;
        this.columns=game.columns;
        this.cellWidth=this.size/this.columns;
        this.cellHeight=this.size/this.rows;
        this.cameraPosX=0;
        this.cameraPosY=0;
        this.containerWidth;
        this.containerHeight;
        this.leftBreakpoint;
        this.rightBreakpoint;
        this.topBreakpoint;
        this.bottomBreakpoint;
        this.verticalAxis;
        this.horizontalAxis;
    }

    update(playerPosx,playerPosY,movementSpeed, isMoving,direction){
        if(isMoving){
            // console.table({
            //     playerposx:playerPosx*this.cellWidth+(this.cellWidth/2),
            //     Vaxis:this.verticalAxis/100
            // })
            // console.log(this.cameraPosX)
            // console.log(direction)
        }
        if(playerPosx*this.cellWidth+(this.cellWidth/2)>this.verticalAxis && 
        playerPosx*this.cellWidth+(this.cellWidth/2)<(this.size - this.verticalAxis) && isMoving){
            
            if(direction==="right"){
                this.cameraPosX-=movementSpeed*this.cellWidth;
            }else if(direction==="left"){
                this.cameraPosX+=movementSpeed*this.cellWidth;
            }
        }
        if(playerPosY*this.cellHeight+(this.cellHeight/2)>this.horizontalAxis && 
        playerPosY*this.cellHeight+(this.cellHeight/2)<(this.size - this.horizontalAxis) && isMoving){
            console.log("asdasd")
            if(direction==="down"){
                this.cameraPosY-=movementSpeed*this.cellHeight;
            }else if(direction==="up"){
                this.cameraPosY+=movementSpeed*this.cellHeight;
            }
        }
    }
    draw(isMoving){
        if (isMoving){
            canvasCollection.forEach(can=>{
                can.style.top=`${this.cameraPosY}px`;
                can.style.left=`${this.cameraPosX}px`;
            })
        }
    }
    setup(width,height){
        this.containerWidth=width;
        this.containerHeight=height;
        this.verticalAxis=width/2;
        this.horizontalAxis=height/2;
        container.style.width=`${this.containerWidth}px`;
        container.style.height=`${this.containerHeight}px`;
        canvasCollection.forEach(can=>{
            can.style.top=`${this.cameraPosY}px`;
            can.style.left=`${this.cameraPosX}px`;
        })
    }
}