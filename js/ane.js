//利用贝塞尔曲线进行绘制 start point,control point,end point(sin正弦来修改高度)
var aneObj = function(){
	this.rootx= [];//最下面的根部的点，rooty即画布的高度
	this.headx = [];//海葵上方的头部
	this.heady= [];
	this.hasFruit = [];
	this.amp = [];//头部x的正弦宽度，即振幅。使海葵高度参差不齐
	this.alpha = 0;//头部x的正弦角度，即正弦函数横坐标
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for (var i = 0;i<this.num; i++) {
		this.rootx[i] = i*16+Math.random()*20;//间隔等于线宽度（根据实际情况调整），随机间隔变化等于线宽度
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight-230+Math.random()*50;
		this.hasFruit = false;
		this.amp[i] = Math.random()*50+40;
	}
}
aneObj.prototype.draw = function(){
	this.alpha += deltaTime*0.001;
	var l = Math.sin(this.alpha);//范围[-1,1]
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.strokeStyle = "#3b154e";
	ctx2.lineCap = "round";
	for(var i=0;i<this.num;i++){
		//beginPath,moveTo,lineTo,strokeStyle,stroke,lineWidth,lineCap,globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i] = this.rootx[i] + l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);//贝塞尔曲线
		ctx2.stroke();
	}
	ctx2.restore();
}