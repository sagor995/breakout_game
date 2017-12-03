var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

/* context.beginPath();

context.rect(20,20,40,50);
context.fillStyle = "#FF0000";
context.fill();
context.closePath();


context.beginPath();

context.arc(240,160,20,0,Math.PI*2,false);
context.fillStyle = "green";
context.fill();
context.closePath();

context.beginPath();
context.rect(160,10,100,40);
context.strokeStyle = 'rgba(0,0,255,0.5)';
context.storke();
context.closePath(); */





var x = canvas.width/2;  // it will keep the ball into center half of the canvas
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 80;

var paddleX = (canvas.width - paddleWidth) / 2;

var leftPressed = false;
var rightPressed = false;

var brickRowCount = 3;
var brickColumnCount =5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var lives = 3;

var bricks = [];
	
	for(c = 0; c< brickColumnCount ;c++){
		bricks[c] = [];
		for(r = 0;r < brickRowCount ; r++){
			bricks[c][r]={x: 0 , y:0, status: 1}
		}
	}

document.addEventListener("keydown",KeyDownHandler);  //eky pressed
document.addEventListener("keyup",KeyUpHandler); //key released

function drawBricks(){
	
	for(c = 0; c< brickColumnCount ;c++){
		for(r = 0;r < brickRowCount ; r++){
			if(bricks[c][r].status==1){
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			
			bricks[c][r].x=brickX;
			bricks[c][r].y=brickY;
			context.beginPath();
			context.rect(brickX,brickY,brickWidth,brickHeight);
			context.fillStyle = "#e60000";
			context.fill();
			context.closePath();
		}
		}
	}
	
}




function KeyDownHandler(e){
	if(e.keyCode == 39){
		rightPressed = true;
	}else if(e.keyCode == 37){
		leftPressed = true;
	}
	
	
}

function KeyUpHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	}else if(e.keyCode == 37){
		leftPressed = false;
	}
}


function drawBall(){
	
	context.beginPath();
	context.arc(x,y,ballRadius,0,Math.PI*2);
	context.fillStyle = "#0099ff";
	context.fill();
	context.closePath();
}

function drawPaddle(){
		context.beginPath();
		context.rect(paddleX, canvas.height - paddleHeight,paddleWidth,paddleHeight);
		context.fillStyle = "#000000";
		context.fill();
		context.closePath();
}

function collisionDetection(){
	for(c = 0; c< brickColumnCount ;c++){
		for(r = 0;r < brickRowCount ; r++){
			var b = bricks[c][r];
			if(b.status==1){
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
				dy = -dy;
				b.status=0;
				score++;
				play();
					if(score== (brickColumnCount*brickRowCount)){
						alert("You Win, Congrats!!!");
						document.location.reload();
					}
				}
			}	
		}
	}
	
}

function drawScore(){
	context.font = "16px Arial"
	context.fillStyle = "#000000";
	context.fillText("Score: "+score,8,20);
	
}

function drawLives(){
	context.font = "16px Arial"
	context.fillStyle = "#000000";
	context.fillText("Lives: "+lives,canvas.width-65,20);
	
}

function draw(){
	context.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	
	if( y+dy < ballRadius){  //if the ball touch lower area
		dy = -dy;
	}else if(y+dy > canvas.height - ballRadius){  // if the ball touch upper area
	
			// if the ball touches the pddle
			if(x > paddleX  && x < paddleX+paddleWidth){
				dy = -dy;
			}else{
				lives--;
				if(!lives){
					alert("Game Over");
					document.location.reload();
				}else{
					x=canvas.width/2;
					y=canvas.height-30;
					dx=2;
					dx=-2;
					paddleX = (canvas.width - paddleWidth) / 2;
				}
			}
	}
	if(x + dx > canvas.width - ballRadius || x+ dx < ballRadius){
		dx = -dx;
	}
	
	
	if(rightPressed &&   paddleX < canvas.width - paddleWidth){
		paddleX +=7;
	}else if(leftPressed && (paddleX > 0)){
		paddleX-=7;
	}
	
	
	
	
	x+=dx;
	y+=dy;
	
	requestAnimationFrame(draw); //draw func is now gettting executed again and again by this function requestAnimationFrame
	
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft; //e.clientX ==0 when the mouse is on left 
	
	if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2){
		paddleX = relativeX - paddleWidth / 2;
	}
}

 function play(){
       var hit = document.getElementById("hit_sound");
       hit.play();
                 }

draw();

/* setInterval(draw,10);  //draw function will be call in every 10 miliseconds until we stop it. */

