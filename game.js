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

function startGame() {
    gameCube = new component(30, 30, "blue", 10, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
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
}

function updateGameArea() {
    myGameArea.clear();
    gameCube.newPos();
    if(myGameArea.key && myGameArea.key == 87){
        gameCube.speedY -= 1;
    }
    if(myGameArea.key && myGameArea.key == 83){
        gameCube.speedY += 1;
    }
    if(myGameArea.key && myGameArea.key == 65){
        gameCube.speedX -= 1;
    }
    if(myGameArea.key && myGameArea.key == 68){
        gameCube.speedX += 1;
    }
    if(myGameArea.key && myGameArea.key == 82){
        gameCube.speedX = 0;
        gameCube.speedY = 0;
        gameCube.x = 30;
        gameCube.y = 30;
    }
    
    
    gameCube.update();
}

</script>
<p>USE WASD to move</p>
</body>
</html>
