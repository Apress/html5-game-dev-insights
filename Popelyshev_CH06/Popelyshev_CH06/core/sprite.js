var TILE_SIZE = 32, TILE_SIZE_BITS = 5;

function Sprite(name, source, x, y) {
	this.name = name;
	this.source = source;
	this.x = x;
	this.y = y;
}

Sprite.prototype = {}

var SpriteList = function() {
	this.byId = []
	this.byName = {}
}

SpriteList.prototype = {
	loaded: 0,
	total: 0,
	onComplete: null,
	add: function(sprite) {
		sprite.id = this.byId.length
		this.byId.push(sprite);
		this.byName[sprite.name] = sprite;
	},
	addSpriteSheet: function(filename, names) {
		var self = this;
		var img = new Image();
		img.onload = function() { 
			self.loaded++;
			//Are all images loaded?
			if (self.loaded == self.total && self.onComplete) 
				self.onComplete();
		}
		this.total++;
		img.src = filename;
		for (var i=0; i<names.length;i++)
			for (var j=0;j<names[i].length;j++) {
				var name = names[i][j];
				if (name != "") {
					this.add(new Sprite(name, img, j*TILE_SIZE, i*TILE_SIZE));
				}
			}
	}
}