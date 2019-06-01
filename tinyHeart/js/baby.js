var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	//this.babyEye = new Image();
	//this.babyBody = new Image();
	//this.babyTail = new Image();
	this.babyTailCount = 0;
	this.babyTailTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeTimer = 0;
	this.babyEyeInterval = 1000;//记录当前小鱼眼睛图片持续显示的时间
	this.babyBodyCount = 0;
	this.babyBodyTimer = 0;
	this.babyBodyInterval = 300;
}

babyObj.prototype.init = function(){
	this.x = canWidth*0.5-50;
	this.y = canHeight*0.5+50;
	this.angle = 0;
	//this.babyEye.src = "./src/babyEye0.png";
	//this.babyBody.src = "./src/babyFade0.png";
	//this.babyTail.src = "./src/babyTail0.png";
	for(var i=0;i<8;i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade"+i+".png";
	}
}

babyObj.prototype.draw = function(){
	ctx1.save();
	this.x = lerpDistance(mom.x,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.98);
	this.angle = lerpAngle(mom.angle,this.angle,0.96);
	//babyTail
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount = (this.babyTailCount+1)%8;//范围0-7
		this.babyTailTimer %= 50;
	}
	//babyEye
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount+1)%2;
		this.babyEyeTimer %= this.babyEyeInterval;
		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random()*1500 + 2000;
		}else{
			this.babyEyeInterval = 200;
		}
	}
	//babyBody
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer>this.babyBodyInterval){
		this.babyBodyCount ++;
		this.babyBodyTimer %= this.babyBodyInterval;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			//gameover
			scoreData.gameOver = true;
		}
	}
	
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(babyTail[this.babyTailCount],-babyTail[this.babyTailCount].width*0.5+25,-babyTail[this.babyTailCount].height*0.5);
	ctx1.drawImage(babyBody[this.babyBodyCount],-babyBody[[this.babyBodyCount]].width*0.5,-babyBody[[this.babyBodyCount]].height*0.5)
	ctx1.drawImage(babyEye[this.babyEyeCount],-babyEye[this.babyEyeCount].width*0.5,-babyEye[this.babyEyeCount].height*0.5);
	ctx1.restore();
	//console.log(this.x,this.y);
}