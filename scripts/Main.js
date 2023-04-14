import { Player } from "./Player.js"
import { Maze } from "./Maze.js"
import { InputHandler } from "./Input.js"
import { FoW } from "./FoW.js"
import { Camera } from "./Camera.js"

window.addEventListener("load",()=>{
    const maze= document.querySelector(".maze");
    const mazeContext= maze.getContext("2d");
    const player= document.querySelector(".player");
    const playerContext= player.getContext("2d");
    const fog= document.querySelector(".fow");
    const fogContext= fog.getContext("2d");
    // const container=document.querySelector(".canvas-container");
    // const canvasCollection=document.querySelectorAll(".camera");
    let containerWidth=800;
    let containerHeight=800;

    class Game{
        constructor(size,rows,columns){
            // this.width=width;
            // this.height=height;
            this.size=size;
            this.rows=rows;
            this.columns=columns;
            this.maze= new Maze(this.size,this.rows,this.columns);
            this.player=new Player(this.size,this.rows,this.columns,this.maze.getGrid);
            this.input=new InputHandler();
            this.fog= new FoW(this);
            this.camera=new Camera(this);
        }
        update(){
            this.player.update(this.input.keys);
            this.fog.update(this.player.isMoving,this.player.playerPosX,this.player.playerPosY,this.player.currentDirection);
            this.camera.update(this.player.playerPosX,this.player.playerPosY,this.player.movementSpeed,this.player.isMoving,this.player.currentDirection)
        }
        draw(){
            this.player.draw(playerContext);
            this.fog.draw(this.player.isMoving,fogContext)
            this.camera.draw(this.player.isMoving);
        }
        setup(){
            this.maze.setup();
            this.player.setup();
            this.fog.setup();
            this.camera.setup(containerWidth,containerHeight);
        }
    }

    const game= new Game(1600, 15, 15)
    game.setup();


    function animate(){
        game.update()
        game.draw()
        requestAnimationFrame(animate);
    }
    animate();
})

