var canvas, toolbar, ctx, tctx, width, height;

function level(n) {
	return {
		timeOnLevel:20+5*n,
		spawnChance:0.01+0.001*n
	};
}

function upgradeCost(upgradeLevel) {
	return 20*1.2**upgradeLevel;
}

var time = 0;

var upgradeTable = {
	ammoRadiusLevel:0
}

var player = {
			x:200,
 			y:600,
 			health:10,
 			level:1,
 			credits:0,
   			shotReload:2,
    		score:0,
     		combo:0,
     		ammo:0,
     		ammoMax:2,
     		ammoRadius:5,
     		hammerCharge:0,
     		hammerChargeReq:30,
     		hammerRange:150,
     		hammerDuration:1
     		};

function init(gameState) {
	canvas = document.getElementById("canvas");
	width = canvas.width;
	height = canvas.height;
	ctx = canvas.getContext('2d');
	toolbar = document.getElementById("toolbar");
	ammoLoading = 0;

	window.onkeydown = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		keyPressed(key);
	};

	if(gameState == 0) {
		ctx.fillStyle = "#c6c6c6";
		ctx.fillRect(0,0,width,height);
		ctx.fillStyle = "#000000";
		ctx.font="20px Georgia";
		ctx.fillText("Let's go!",10,50);
		canvas.onclick = function() {init(1);};
	}

	if(gameState == 1) {
		canvas.style.display="block";
		canvas.onclick = function() {};

		player.ammoRadius = 5+0.5*upgradeTable.ammoRadiusLevel;

		var ongoing = setInterval(function() {
			updateGame(0.01);
			renderGame();

			//Did player die?
			if (player.health<1) {
				init(3); clearInterval(ongoing)
			};

			//Did level end?
			if (time>level(player.level).timeOnLevel) {
				init(2); 
				clearInterval(ongoing);

				time=0;
			};

		}, 10);
	}

	if(gameState == 2) {
		canvas.style.display="none";
		button1.style.display="block";
		button1.innerHTML="Increase bullet size! ("+upgradeCost(upgradeTable.ammoRadiusLevel)+" credits)";
		button1.onclick = function() {
			if (player.credits > upgradeCost(upgradeTable.ammoRadiusLevel)) {
				upgradeTable.ammoRadiusLevel++;
				player.credits -= upgradeCost(upgradeTable.ammoRadiusLevel);
				renderBackground();
				init(2);
			}
		}

		button2.style.display="block";
		button3.style.display="block";
		button4.style.display="block";
		button5.style.display="block";
		button6.style.display="block";

		button7.style.display="block";
		button7.innerHTML="Continue";
		button7.onclick = function() {
			button1.style.display="none";
			button2.style.display="none";
			button3.style.display="none";
			button4.style.display="none";
			button5.style.display="none";
			button6.style.display="none";
			button7.style.display="none";
			player.level++;
			init(1);
		};
	}

	if(gameState == 3) {
		ctx.fillStyle = "#c6c6c6";
		ctx.fillRect(0,0,width,height);
		ctx.fillStyle = "#000000";
		ctx.font="20px Georgia";
		ctx.fillText("You died :( click to go again!",10,50);
		canvas.onclick = function() {init(1);};
	}
}

function keyPressed(key) {
	switch(key) {
		case 38:
			console.log(player.ammo);
			console.log(upgradeTable.ammoRadiusLevel);
			console.log(player.ammoRadius);

			if (player.ammo > 0) {
				bullets.push({
					x:200,
					y:600,
					v:800,
					radius:player.ammoRadius,
					combo:0
				});
				player.ammo--;
			}
			break;
			
		case 40:
			console.log(player.hammerCharge)
			if (player.hammerCharge >= player.hammerChargeReq) {
				hammer.push();
				player.hammerCharge = 0;
			}
			break;
	}
}

function updateGame(dt) {
	time += dt;
	bullets.update(dt);
	targets.update(dt);
	hammer.update(dt);

	//Spawn targets
	if (Math.random() < level(player.level).spawnChance) {
		rnd = Math.random();
		tAngle = 0.9 + rnd*0.5;
		if(rnd.toString(2)[3] == 0) {tAngle = -tAngle}
		rnd2 = Math.random();
		targets.push({x:100+200*rnd2,y:0,v:100,angle:tAngle,radius:5});
	}

	//Charge ammo
	if (player.ammo < player.ammoMax) {
		ammoLoading += dt;
		if (ammoLoading > player.shotReload) {
			player.ammo++;
			ammoLoading = 0;
		}
	}
}

function renderGame() {
	renderBackground();
	renderPlayer();
	bullets.render(ctx);
	targets.render(ctx);
	hammer.render(ctx);
}

function renderBackground() {
	ctx.fillStyle = "#c6c6c6";
	ctx.fillRect(0,0,width,height);
	document.getElementById("toolbar").innerHTML = "Score:" + player.score +" Combo:" + player.combo + " Ammo:" + player.ammo + " Hammer:" + player.hammerCharge/player.hammerChargeReq + " Health:" + player.health + " Credits:" + player.credits;
}

function renderPlayer() {
	ctx.fillStyle= "#FF0000";
	ctx.beginPath();
	ctx.arc(player.x,player.y,25,0,6.28);
	ctx.fill();
}