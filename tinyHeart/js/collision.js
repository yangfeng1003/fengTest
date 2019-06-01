function momFruitsCollision(){
	if(!scoreData.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				var dis = calLength(mom.x,mom.y,fruit.x[i],fruit.y[i])
				if(dis<900){
					fruit.alive[i] = false;
					scoreData.fruitNum++;
					//分数加倍
					if(fruit.fruitType[i] == "blue"){
						scoreData.double = 2;
						mom.babyBodyCount = 0;
					}
					wave.collisionBorn(fruit.x[i],fruit.y[i]);
				}
			}	
		}
	}
}
function momBabyCollision(){
	if(scoreData.fruitNum>0 && !scoreData.gameOver){ //大鱼没吃到果实不能喂小鱼
		var dis = calLength(mom.x,mom.y,baby.x,baby.y);
		if(dis<1200){
			//baby recover满血复活
			baby.babyBodyCount = 0;//身体恢复颜色
			//大鱼碰小鱼时计算分数
			scoreData.addScore();
			halo.collisionBorn2(baby.x,baby.y);
		}
	}
	
		
}