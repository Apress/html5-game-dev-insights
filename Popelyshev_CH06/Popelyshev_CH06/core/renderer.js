function Rect(x, y, w, h) {
	this.x = x
	this.y = y
	this.w = w
	this.h = h
}

Rect.prototype = {
	contains: function(x, y) {
		return this.x <= x && x < this.x + this.w && this.y <= y && y < this.y + this.h
	}
}

var Camera = function(map, canvas) {
	this.canvas = canvas
	this.map = map
	this.centerX = this.mapWidth() >> 1
	this.centerY = this.mapHeight()>> 1
}

Camera.prototype = {
	mapWidth: function() { return this.map.cols * TILE_SIZE },
	mapHeight: function() { return this.map.rows * TILE_SIZE },
	displayWidth: function() { return this.canvas.width },
	displayHeight: function() { return this.canvas.height },
	context: function() { return this.canvas.getContext("2d") },
	centerX: 0, 
	centerY: 0,
	scale: 1, 
	map: null, 
	canvas: null,
	clientRect: function() {
		var dw = this.displayWidth(), dh = this.displayHeight();
		var dw2 = dw >> 1, dh2 = dh >> 1
		// (0, 0) in display corresponds to (rect.x, rect.y)
		// (displayWidth, displayHeight) to (rect.x+rect.w, rect.y+r.h)
		return new Rect(this.centerX - dw2*this.scale, this.centerY - dh2*this.scale, dw*this.scale, dh*this.scale);
	},
	moveBy: function(dx, dy) {
		//move center by display coordinates		
		this.centerX = Math.min(Math.max(this.centerX - dx * this.scale, 0), this.mapWidth());
		this.centerY = Math.min(Math.max(this.centerY - dy * this.scale, 0), this.mapHeight());
	},
	point: function(x, y) {
		//from display to world coordinates
		x -= this.displayWidth()>>1;
		y -= this.displayHeight()>>1;
		x *= this.scale
		y *= this.scale
		x += this.centerX;
		y += this.centerY;
		return {x:x, y:y}
	},
	round: function() {
		this.centerX = Math.round(this.centerX);
		this.centerY = Math.round(this.centerY);
	}
}

var Renderer = function(map, sprites) {
	this.map = map
	this.tiles = map.tiles
	this.sprites = sprites
}

Renderer.prototype = {
	//renderer is different from camera, cause render can store cache on some info, not dependent on a camera
	render: function(camera) {
		var displayWidth = camera.displayWidth()
		var displayHeight = camera.displayHeight()

		//get view rect on map
		var r = camera.clientRect();
		var map = this.map

		var context = this.context = camera.context()
		context.fillStyle = "black"
		context.fillRect(0, 0, displayWidth, displayHeight);
		
		// scale && translate
		context.save()
		context.scale(1.0/camera.scale, 1.0/camera.scale);
		context.translate(-r.x, -r.y);
		
		//clipping rect for tiles
		var minI = r.x >> TILE_SIZE_BITS, maxI = (r.x+r.w) >> TILE_SIZE_BITS;
		var minJ = r.y >> TILE_SIZE_BITS, maxJ = (r.y+r.h) >> TILE_SIZE_BITS;
		minI = Math.max(minI, 0); maxI = Math.min(maxI, map.cols-1);
		minJ = Math.max(minJ, 0); maxJ = Math.min(maxJ, map.rows-1);
		
		//for each visible tile
		for (var j=minJ; j<=maxJ; j++)
			for (var i=minI; i<=maxI; i++) {
				//draw surface, if tile has sprite
				var tile = map.getSurface(i, j)
				var autotile = tile.auto(map, i, j)
				tile.render(this, autotile, i*TILE_SIZE, j*TILE_SIZE)
				
				tile = map.getObject(i, j)
				autotile = tile.auto(map, i, j)
				tile.render(this, autotile, i*TILE_SIZE, j*TILE_SIZE)
			}
		context.restore();
	}
}

Tile.prototype.render = function(renderer, autotile, x, y) {
	var sprite = this.sprite
	if (!sprite) return
	renderer.context.drawImage(sprite.source, sprite.x, sprite.y, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE);
}

Tile.prototype.auto = function(map, i, j) {
}
