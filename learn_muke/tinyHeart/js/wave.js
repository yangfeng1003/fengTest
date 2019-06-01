 var waveObj = function(){
 	/*wave是用来绘制大鱼吃到果实的圆圈效果。必须使用这个类，
 	否则在collision里面根据碰撞位置画圆，只能保证有一个圆圈效果，
 	在第二次碰撞时第一个圆圈效果无法保存，而wave刚好相当于这样一个圆圈数组。*/
 	this.alive = [];
 	this.x = [];
 	this.y = [];
 	this.r =[];
 }
waveObj.prototype.num = 10;

 waveObj.prototype.init = function(){
 	for(var i=0;i<this.num;i++){
 		this.alive[i] = false;
 		this.r[i] = 0;
 	}

 }

 waveObj.prototype.draw = function(){
 	ctx1.save();
 	ctx1.lineWidth = 2;
 	ctx1.shadowBlur = 10;
 	ctx1.shadowColor = "white";
 	for(var i=0;i<this.num;i++){
 		if(this.alive[i]){
 			this.r[i] += deltaTime*0.05;
 			if(this.r[i]>60){
 				this.alive[i] = false;
 				break; //直接跳出循环
 			}
 			var alpha  = 1-this.r[i]/60;
 			//draw
 			ctx1.beginPath();
 			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
 			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,255,255,"+ alpha + ")";
 			ctx1.stroke();
 		}
 	}
 	ctx1.restore();
 }

 waveObj.prototype.collisionBorn = function(x,y){
 	for(var i=0;i<this.num;i++){
 		if(!this.alive[i]){
 			//born CollisionCircle
 			this.alive[i] = true;
 			this.r[i] = 20;
 			this.x[i] = x;
 			this.y[i] = y;
 			console.log("born");
 			return;
 		}
 	}
 }