var momObj = function(){
	this.x;
	this.y;
	this.angle;
	/*this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();*/
	this.bigTail = [];
	this.bigEye = [];
	this.bigBodyOrange = [];
	this.bigBodyBlue = [];

	this.bigTailCount = 0;
	this.bigTailTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeTimer = 0;
	this.bigEyeInterval = 1000;//记录当前小鱼眼睛图片持续显示的时间
	this.bigBodyCount = 0;
	this.bigBodyTimer = 0;
	this.bigBodyInterval = 300;
}

momObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
	/*this.bigEye.src = "./src/bigEye0.png";
	this.bigBody.src = "./src/bigSwim0.png";
	this.bigTail.src = "./src/bigTail0.png";*/
	for(var i=0;i<8;i++){
		this.bigTail[i] = new Image();
		this.bigTail[i].src = "./src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		this.bigEye[i] = new Image();
		this.bigEye[i].src = "./src/bigEye"+i+".png";
	}
	for(var i=0;i<8;i++){
		this.bigBodyOrange[i] = new Image();
		this.bigBodyOrange[i].src = "./src/bigSwim"+i+".png";
		this.bigBodyBlue[i] = new Image();
		this.bigBodyBlue[i].src = "./src/bigSwimBlue"+i+".png";
	}
}

momObj.prototype.draw = function(){
	//处理当前与目标的趋近过程
	this.x = lerpDistance(mouseX,this.x,0.98);
	this.y = lerpDistance(mouseY,this.y,0.98);
	//角度差距delta angle,Math.atan()反正切
	var deltaX = this.x - mouseX;
	var deltaY = this.y - mouseY;
	var angleAim = Math.atan2(deltaY,deltaX);
	this.angle = lerpAngle(angleAim,this.angle,0.6);
	//this.angle = lerpDistance(angleAim,this.angle,0.6);//鱼头在45°和-45°转动过程中转了270°
	//bigTail
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer>50){
		this.bigTailCount = (this.bigTailCount+1)%8;//范围0-7
		this.bigTailTimer %= 50;
	}
	//bigEye
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer>this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount+1)%2;
		this.bigEyeTimer %= this.bigEyeInterval;
		if(this.bigEyeCount == 0){
			this.bigEyeInterval = Math.random()*1500 + 2000;
		}else{
			this.bigEyeInterval = 200;
		}
	}
	//bigBodysss
	this.bigBodyTimer += deltaTime;
	if(this.bigBodyTimer>this.bigBodyInterval){
		this.bigBodyCount ++;
		if(this.bigBodyCount > 7)
			this.bigBodyCount = 7;//gameover 
		this.bigBodyTimer %= this.bigBodyInterval;
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);//旋转画布
	ctx1.drawImage(this.bigTail[this.bigTailCount],-this.bigTail[this.bigTailCount].width*0.5+30,-this.bigTail[this.bigTailCount].height*0.5);
	if(scoreData.double == 1){
		ctx1.drawImage(this.bigBodyOrange[this.bigBodyCount],-this.bigBodyOrange[this.bigBodyCount].width*0.5,-this.bigBodyOrange[this.bigBodyCount].height*0.5);
	}else{
		ctx1.drawImage(this.bigBodyBlue[this.bigBodyCount],-this.bigBodyBlue[this.bigBodyCount].width*0.5,-this.bigBodyBlue[this.bigBodyCount].height*0.5);
	}
	ctx1.drawImage(this.bigEye[this.bigEyeCount],-this.bigEye[this.bigEyeCount].width*0.5,-this.bigEye[this.bigEyeCount].height*0.5);
	ctx1.restore();
}
