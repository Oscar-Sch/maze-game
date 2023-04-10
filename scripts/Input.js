export class InputHandler{
    constructor(){
        this.keys=[];
        this.key="";
        window.addEventListener("keydown",e=>{
            
            if(e.key==="ArrowUp" && !this.keys.includes("ArrowUp")){
                this.keys.push("ArrowUp")
                // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"up")
                // newPlayer.direction=="up"?newPlayer.moveUp():newPlayer.rotate("up");
                // newPlayer.moveUp();
            }
            if(e.key==="ArrowDown" && !this.keys.includes("ArrowDown")){
                this.keys.push("ArrowDown")
                // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"down")
                // newPlayer.direction=="down"?newPlayer.moveDown():newPlayer.rotate("down");
                // newPlayer.moveDown();
            }
            if(e.key==="ArrowLeft" && !this.keys.includes("ArrowLeft")){
                this.keys.push("ArrowLeft")
                // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"left")
                // newPlayer.direction=="left"?newPlayer.moveLeft():newPlayer.rotate("left");
                // newPlayer.moveLeft();
            }
            if(e.key==="ArrowRight" && !this.keys.includes("ArrowRight")){
                this.keys.push("ArrowRight")
                // newFog.castLight(newPlayer.getPlayerPosX,newPlayer.getPlayerPosY,"right")
                // newPlayer.direction=="right"?newPlayer.moveRight():newPlayer.rotate("right");
                // newPlayer.moveRight();
            }
            // if(e.key==="ArrowUp" || e.key==="ArrowDown" || e.key==="ArrowLeft" || e.key==="ArrowRight"){
            //     this.key=e.key;
            // }
        });
        window.addEventListener("keyup",e=>{
            if(e.key==="ArrowUp" ||
                e.key==="ArrowDown" ||
                e.key==="ArrowLeft" ||
                e.key==="ArrowRight"){
                this.keys.splice(this.keys.indexOf(e.key),1);
                // this.key="";
            }
        });
    }
}