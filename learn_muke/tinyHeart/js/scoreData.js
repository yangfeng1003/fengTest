var scoreDataObj = function(){
	this.fruitNum = 0;
	this.double = 1;//蓝色果实加倍
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0.5;
}

scoreDataObj.prototype.draw = function(){
	canW = can1.width;
	canH = can1.height;
	ctx1.save();
	ctx1.fillStyle = "white";
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	//绘制分数
	/*ctx1.fillText("num:"+this.fruitNum,canW*0.5,canH-80);
	ctx1.fillText("double:"+this.double,canW*0.5,canH-110);*/
	ctx1.fillText("score:"+this.score,canW*0.5,canH-30);
	//绘制gameover字样
	if(scoreData.gameOver){
		this.alpha += deltaTime*0.0005;
		if(this.alpha>1)
			this.alpha = 1;
		ctx1.fillStyle = "rgba(255,255,255,"+ this.alpha + ")";
		ctx1.fillText("GAME OVER",canW*0.5,canH*0.5);
	}

	ctx1.restore();
}

scoreDataObj.prototype.addScore = function(){
	this.score += this.double*this.fruitNum*10;
	//碰撞后果实归零
	this.fruitNum = 0;
	this.double = 1;
	mom.bigBodyCount = 0;
}