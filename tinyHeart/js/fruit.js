var fruitObj = function(){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];
	this.orange = new Image();
	this.blue = new Image();
	this.speed = [];
	this.fruitType = [];
	this.aneNum = [];
}
fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.speed[i] = 0.01+Math.random()*0.005;
		this.x[i] = 0;
		this.y[i] = 0;
		this.fruitType[i] = "";
		this.aneNum[i] = 0;
		//this.born(i);
	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}

fruitObj.prototype.draw = function(){ //draw(find an ane ,grow ,fly)
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			var pic = null;
			if(this.fruitType[i]=="orange"){
				pic = this.orange;
				if(this.l[i]<14)
					this.l[i] += this.speed[i]*deltaTime*0.3;
				else if(this.l[i]>=14)
					this.y[i] -= this.speed[i]*deltaTime*7;
			}
			else if(this.fruitType[i]=="blue"){
				pic = this.blue;
				if(this.l[i]<14)
					this.l[i] += this.speed[i]*deltaTime*0.5;
				else if(this.l[i]>=14)
					this.y[i] -= this.speed[i]*deltaTime*5;
			}
			
			//ctx2.drawImage(this.orange,this.x[i]-this.orange.width*0.5,this.y[i]-this.blue.width*0.5);
			ctx2.drawImage(pic,ane.headx[this.aneNum[i]]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10){
				this.alive[i] = false;
			}
		}
	}
}

fruitObj.prototype.born = function(i){
	this.l[i] = 0;
	var aneId = Math.floor(Math.random()*ane.num);
	while(ane.hasFruit[aneId])
		aneId = aneId++%ane.num;
	this.aneNum[i] = aneId;
	this.x[i] = ane.headx[this.aneNum[i]];
	this.y[i] = ane.heady[this.aneNum[i]];
	var ran = Math.random();
	if(ran>0.8)
		this.fruitType[i] = "blue";
	else
		this.fruitType[i] = "orange";
	this.alive[i] = true;
	ane.hasFruit[aneId] = true;
}

function fruitMonitor(){
	var fNum = 0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i])
			fNum++;
	}
	if(fNum<15){
		//send fruit
		for(var i=0;i<fruit.num;i++){
			if(!fruit.alive[i]){
				fruit.born(i);
				return;
			}
		}
	}
}