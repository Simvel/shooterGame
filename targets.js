var targets = new Targets();

function Targets() {
	this.objects = [];
	this.maxID = 0;

	this.push = function(target) {

		var id = -1

		while(this.objects[++id] != undefined) {}
		this.objects[id] = target;
		if(id > this.maxID) {this.maxID = id;}
	}

	this.update = function(dt) {
		for(var i = 0;i < this.maxID;i++) {
			if(this.objects[i] == undefined) continue;

			var obj = this.objects[i];

			obj.y += Math.cos(obj.angle) * obj.v * dt;
			obj.x += Math.sin(obj.angle) * obj.v * dt;

			if (obj.x > 400 || obj.x < 0) {obj.angle = -obj.angle;}

			if (obj.y > 550) {
				delete this.objects[i];
				player.health--;
			}

			//This should not be here
			for(var j = 0;j < 100;j++) {
				if (bullets.objects[j] != undefined) {
					var dist = Math.sqrt(((obj.x-bullets.objects[j].x)**2 + (obj.y-bullets.objects[j].y)**2));
					var minDist = obj.radius+bullets.objects[j].radius;
					if(dist-minDist < 0) {
						delete this.objects[i]; //Maybe delete after render. Prettier
						player.score += 1+player.combo;
						player.hammerCharge += 1+player.combo;
						player.combo++;
						bullets.objects[j].combo = 1;
					}
				}
			}
		}
	}

	this.render = function(ctx) {
		ctx.fillStyle = "#00FF00";
		for(var i = 0;i < this.maxID;i++) {
			if(this.objects[i] == undefined) continue;

			var obj = this.objects[i];
			ctx.beginPath();
			ctx.arc(obj.x,obj.y,obj.radius,0,6.28);
			ctx.fill();
		}
	}
}