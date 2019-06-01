 var dustObj = function(){
 	this.dustPic = [];
 	this.x = [];
 	this.y = [];
 	//alpha角度参数与ane海葵相同
 	this.amp = [];
 	this.picNo = [];//当前这个dust用7张图片的哪一张
 }
dustObj.prototype.num = 30;

dustObj.prototype.init = function(){
 	for(var i=0;i<7;i++){
 		this.dustPic[i] = new Image();
 		this.dustPic[i].src = "./src/dust"+ i +".png";
 	}
 	this.alpha = 0;
 	for(var i=0;i<this.num;i++){
 		this.x[i] = Math.random() * canWidth;
 		this.y[i] = Math.random() * canHeight;
 		this.amp[i] = 20 + Math.random() * 25;
 		this.picNo[i] = Math.floor(Math.random() * 7); //[0,7)
 	}
 }

dustObj.prototype.draw = function(){
	var l = Math.sin(ane.alpha);
	for(var i=0;i<this.num;i++){
		ctx1.drawImage(this.dustPic[this.picNo[i]],this.x[i] + l*this.amp[i],this.y[i]);
	}
 }