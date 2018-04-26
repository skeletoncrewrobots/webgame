<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
canvas {
    border:1px solid #d3d3d3;
    background-color: #f1f1f1;
}
</style>
</head>
<body onload="startGame()">
<script>

var gameCube;
var gameOver = false;
var width = 480;
var height = 270;
var lwall, rwall, twall, bwall;

function startGame() {
    gameCube = new component(30, 30, "blue", 10, 120);
    tube = new component(10, 200, "green", 300, 120);
    
    //Boundaries
    lwall = new component(5, height, "black", 0, 0);
    rwall = new component(5, height, "black", width - 5 ,0);
    twall = new component(width - 5, 5, "black", 0, 0);
    bwall = new component(width,5, "black", 0, height - 5);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e){
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e){
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
    		ctx = myGameArea.context;
    		clearInterval(this.interval);
        ctx.font = "30px Arial";
				ctx.fillText("Game Over...", 20 , 100);
        ctx.fillText("Test", 20, 150);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
    this.crashWith = function(obj2){
    	var left = this.x;
      var right = this.x + this.width;
      var top = this.y;
      var bottom = this.y + this.height;
      
      var left2 = obj2.x;
      var right2 = obj2.x + obj2.width;
      var top2 = obj2.y;
      var down2 = obj2.y + obj2.height;
      
      var crash = true;
      
      if((bottom < top2) ||
      	(top > down2) ||
        (right < left2) ||
        (left > right2)) {
        	crash = false;
        }
     return crash;
    }
}

function gameOver() {
	ctx.font = "30px Arial";
  ctx.filltext("Game Over...", 100, 200);
}

function reset(){
				gameCube.speedX = 0;
        gameCube.speedY = 0;
        gameCube.x = 30;
        gameCube.y = 30;
}

function playAgain(){
	reset();
  myGameArea.clear();
  myGameArea.start();
}

function updateGameArea() {
    myGameArea.clear();
    gameCube.newPos();
    
    if(gameCube.crashWith(tube)) {
    	myGameArea.clear();
    	myGameArea.stop();
      gameOver();

		} else if(gameCube.crashWith(rwall)){
    		gameCube.x = rwall.x - gameCube.width;

    } else if(gameCube.crashWith(lwall)){
    		gameCube.x = lwall.x + lwall.width;
    } else if(gameCube.crashWith(twall)){
    		gameCube.y = twall.y + twall.height;
    } else if(gameCube.crashWith(bwall)){
    	gameCube.y = bwall.y - gameCube.height;
    }
    
    if(myGameArea.key && myGameArea.key == 87){
        gameCube.speedY = -8;
    }
    if(myGameArea.key && myGameArea.key == 83){
        gameCube.speedY = 8;
    }
    if(myGameArea.key && myGameArea.key == 65){
        gameCube.speedX = -8;
    }
    if(myGameArea.key && myGameArea.key == 68){
        gameCube.speedX = 8;
    }
    if(myGameArea.key && myGameArea.key == 82 && gameOver==true){
        reset();
    }
    
    if(!myGameArea.key){
    	gameCube.speedX = 0;
      gameCube.speedY = 0;
    }
    
    
    gameCube.update();
    tube.update();
    lwall.update();
    rwall.update();
    twall.update();
    bwall.update();
}

</script>
<p>USE WASD to move, and R to reset position.</p>
</body>
</html>
