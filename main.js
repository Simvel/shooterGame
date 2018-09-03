var canvas, toolbar, ctx, tctx, width, height;

var player = {x:200, y:600, shotTime:0, shotDelay:500, score:0, combo:0};

function init() {
	canvas = document.getElementById("canvas");
	width = canvas.width;
	height = canvas.height;
	ctx = canvas.getContext('2d');
	toolbar = document.getElementById("toolbar");
	player.shotTime = utils.getTime()-player.shotDelay-10;

	window.onkeydown = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		keyPressed(key);
	};

	setInterval(function() {
		updateGame(0.01);
		renderGame();
	}, 10);
}

function keyPressed(key) {
	switch(key) {
		case 38:
			console.log(bullets);

			var time = utils.getTime();

			if (player.shotTime+player.shotDelay < time) {
				bullets.push({
					x:200,
					y:600,
					v:800,
					radius:10,
					combo:0
				});
				player.shotTime = time
				console.log(targets.objects);
			}
			

	}
}

function updateGame(dt) {
	bullets.update(dt);
	targets.update(dt);
	if (Math.random() < 0.01) {
		rnd = Math.random();
		tAngle = 0.9 + rnd*0.5;
		if(rnd.toString(2)[3] == 0) {tAngle = -tAngle}
		targets.push({x:200,y:0,v:100,angle:tAngle,radius:5});
	}
}

function renderGame() {
	renderBackground();
	renderPlayer();
	bullets.render(ctx);
	targets.render(ctx);
}

function renderBackground() {
	ctx.fillStyle = "#c6c6c6";
	ctx.fillRect(0,0,width,height);
	document.getElementById("toolbar").innerHTML = "Score:" + player.score +" Combo:" + player.combo;
}

function renderPlayer() {
	ctx.fillStyle= "#FF0000";
	ctx.beginPath();
	ctx.arc(player.x,player.y,25,0,6.28);
	ctx.fill();
}