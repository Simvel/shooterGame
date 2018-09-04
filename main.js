var canvas, toolbar, ctx, tctx, width, height;

var player = {
			x:200,
 			y:600,
   			shotReload:2,
    		score:0,
     		combo:0,
     		ammo:0,
     		ammoMax:2,
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
		setInterval(function() {
			updateGame(0.01);
			renderGame();
		}, 10);
	}
}

function keyPressed(key) {
	switch(key) {
		case 38:
			console.log(player.ammo);

			if (player.ammo > 0) {
				bullets.push({
					x:200,
					y:600,
					v:800,
					radius:10,
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
	bullets.update(dt);
	targets.update(dt);
	hammer.update(dt);

	//Spawn targets
	if (Math.random() < 0.01) {
		rnd = Math.random();
		tAngle = 0.9 + rnd*0.5;
		if(rnd.toString(2)[3] == 0) {tAngle = -tAngle}
		targets.push({x:200,y:0,v:100,angle:tAngle,radius:5});
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
	document.getElementById("toolbar").innerHTML = "Score:" + player.score +" Combo:" + player.combo + " Ammo:" + player.ammo + " Hammer:" + player.hammerCharge/player.hammerChargeReq;
}

function renderPlayer() {
	ctx.fillStyle= "#FF0000";
	ctx.beginPath();
	ctx.arc(player.x,player.y,25,0,6.28);
	ctx.fill();
}