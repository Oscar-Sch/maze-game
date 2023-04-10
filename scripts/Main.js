import { Player } from "./Player.js"
import { Maze } from "./Maze.js"
import { InputHandler } from "./Input.js"
import { FoW } from "./FoW.js"

window.addEventListener("load",()=>{
    let maze= document.querySelector(".maze");
    let mazeContext= maze.getContext("2d");
    let player= document.querySelector(".player");
    let playerContext= player.getContext("2d");
    let fog= document.querySelector(".fow");
    let fogContext= fog.getContext("2d");

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
        }
        update(){
            this.player.update(this.input.keys);
            this.fog.update(this.player.isMoving,this.player.playerPosX,this.player.playerPosY,this.player.currentDirection);
        }
        draw(){
            this.player.draw(playerContext);
            this.fog.draw(this.player.isMoving,fogContext)
            // this.fog.castLight(this.player.playerPosX,this.player.playerPosY,this.player.currentDirection);
        }
        setup(){
            this.maze.setup();
            this.player.setup();
            this.fog.setup();
        }
    }
    const game= new Game(800, 5, 5)
    game.setup();
    console.log(game)

    function animate(){
        game.update()
        game.draw()
        requestAnimationFrame(animate);
    }
    animate();
})

