var hammer = new Hammer();

function Hammer() {
	var time = 0;

	this.push = function() {
		time = 0;
	}

	this.update = function(dt) {
		time += dt;
		if (time < player.hammerDuration) {
			for(var j = 0;j < 100;j++) {
				if (targets.objects[j] != undefined) {
					if(targets.objects[j].y > (600-player.hammerRange)) {
						delete targets.objects[j]; //maybe delete after render. Prettier
						player.score += 1;
						player.combo++;
					}
				}
			}
		}
	}

	this.render = function(ctx) {
		if (time < player.hammerDuration) {
			ctx.fillStyle= "#000000";
			ctx.fillRect(0,600-player.hammerRange,400,player.hammerRange);
			//ctx.fill();
		}
	}
}