var bullets = new Bullets();

function Bullets() {
	this.objects = [];
	this.maxID = 0;

	this.push = function(bullet) {

		var id = -1

		while(this.objects[++id] != undefined) {}
		this.objects[id] = bullet;
		if(id > this.maxID) {this.maxID = id;}

	}

	this.update = function(dt) {
		for(var i = 0;i < this.maxID;i++) {
			if(this.objects[i] == undefined) continue;

			var obj = this.objects[i];

			obj.y -= obj.v * dt;

			if (obj.y < 0) {
				if (this.objects[i].combo == 0) {player.combo = 0;}
				delete this.objects[i];
			}
		}
	}

	this.render = function(ctx) {
		ctx.fillStyle = "#000000";
		for(var i = 0;i < this.maxID;i++) {
			if(this.objects[i] == undefined) continue;

			var obj = this.objects[i];

			ctx.beginPath();
			ctx.arc(200,obj.y,obj.radius,0,6.28);

			ctx.fill();
		}
	}
}