var haloObj = function(){
 	this.alive = [];
 	this.x = [];
 	this.y = [];
 	this.r =[];
 }
haloObj.prototype.num = 5;

haloObj.prototype.init = function(){
 	for(var i=0;i<this.num;i++){
 		this.alive[i] = false;
 		this.r[i] = 0;
 	}

}

haloObj.prototype.draw = function(){
 	ctx1.save();
 	ctx1.lineWidth = 4;
 	ctx1.shadowBlur = 20;
 	ctx1.shadowColor = "rgb(203,91,0)";
 	for(var i=0;i<this.num;i++){
 		if(this.alive[i]){
 			this.r[i] += deltaTime*0.06;
 			if(this.r[i]>100){
 				this.alive[i] = false;
 				break; //直接跳出循环
 			}
 			var alpha  = 1-this.r[i]/100;
 			//draw
 			ctx1.beginPath();
 			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
 			ctx1.closePath();
			ctx1.strokeStyle = "rgba(203,91,0,"+ alpha + ")";
 			ctx1.stroke();
 		}
 	}
 	ctx1.restore();
 }

  haloObj.prototype.collisionBorn2 = function(x,y){
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