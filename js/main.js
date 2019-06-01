document.body.onload = game;
var can1;
var can2;

var ctx1;
var ctx2;
var canWidth;
var canHeight;

var lastTime;
var deltaTime;
var bgImage = new Image();

var ane;
var fruit;

var mom;
var baby;
var babyTail = [];
var babyEye = [];
var babyBody = [];

var mouseX;
var mouseY;

var scoreData;//分值

var wave;//白色光圈
var halo;//橙色光圈

var dust;//白色星星漂浮物

document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init(){
	can1 = document.getElementById("canvas1");//fishs,dust,UIScores,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");//background,ane,fruits
	ctx2 = can2.getContext('2d');
	bgImage.src = "./src/background.jpg";
	can1.addEventListener("mousemove",onMousemove,false);
	canWidth = can2.width;
	canHeight = can2.height;
	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom = new momObj();
	mom.init();
	mouseX = canWidth*0.5;
	mouseY = canHeight*0.5;
	baby = new babyObj();
	baby.init();
	scoreData = new scoreDataObj();
	ctx1.fillStyle = "white";
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";
	wave = new waveObj();
	wave.init();
	halo = new haloObj();
	halo.init();
	dust = new dustObj();
	dust.init();
}

function gameloop(){
	requestAnimFrame(gameloop);//setInteval,setTimeout,frame per second
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	//console.log(deltaTime);
	//防止浏览器在其他界面时，delatTime过大导致果实太大占满屏幕
	if(deltaTime > 40) deltaTime = 40;
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight); //每次清理一下画布，否则会出现意外多余的样子
	mom.draw();
	momFruitsCollision();
	momBabyCollision();
	baby.draw();
	scoreData.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMousemove(e){
	if(!scoreData.gameOver){
		//游戏未结束时才能控制鼠标
		if(e.offSetX || e.layerX){
		mouseX = e.offSetX == undefined ? e.layerX : e.offSetX;
		mouseY = e.offSetY == undefined ? e.layerY : e.offSetY;
		//console.log(mouseX);
	}
	}
}
