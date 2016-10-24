var dx = [1, 1, 0, -1, -1, -1, 0, 1], dy = [0, 1, 1, 1, 0, -1, -1, -1];

function getTileShadow(map, i, j) {
	var shadow = 0
	for (var bit=0;bit<8;bit++)
		if (map.getObject(i + dx[bit], j+dy[bit]).type == 3) shadow |= (1<<bit)
	return shadow<<24
}

function drawTileShadow(renderer, mask, x1, y1) {
	var shadow = (mask >> 24)&0xff;
	if (shadow == 0) return;
	var context = renderer.context;
	context.strokeStyle = "rgba(0,0,0,0.4)"
	context.beginPath();
	var x2 = x1 + TILE_SIZE, y2 = y1 + TILE_SIZE
	if ((shadow&1)!=0) {
		context.moveTo(x2-0.5, y1); context.lineTo(x2-0.5, y2);
	}
	if ((shadow&4)!=0) {
		context.moveTo(x1, y2-0.5); context.lineTo(x2, y2-0.5);
	}
	if ((shadow&16)!=0) {
		context.moveTo(x1+0.5, y1); context.lineTo(x1+0.5, y2);
	}
	if ((shadow&64)!=0) {
		context.moveTo(x1, y1+0.5); context.lineTo(x2, y1+0.5);
	}
	context.stroke();
	
	if ((shadow&24) != 0) {
		var t = 4;
		context.fillStyle = "rgba(0,0,0,0.3)"
		context.beginPath();
		if ((shadow&24) == 24) { // rectangle shadow
			context.rect(x1, y1, t, TILE_SIZE); //rectangle + triangle
		} else if ((shadow&24) == 16) {
			context.moveTo(x1 + t, y1);
			context.lineTo(x1, y1);
			context.lineTo(x1, y2);
			context.lineTo(x1 + t, y2 - t);
			context.lineTo(x1 + t, y1);
		}
		context.fill();
	}
}

ObjectTile.prototype.auto = getTileShadow

ObjectTile.prototype.render = function(renderer, mask, x1, y1) {
	Tile.prototype.render.call(this, renderer, mask, x1, y1);
	drawTileShadow(renderer, mask, x1, y1);
}

var SolidTile = extendTile(Tile, {
	type:3, layer: 1,
	auto: function(map, i, j) {
		return map.getObject(i, j+1).type == 3
	},
	render: function(renderer, hasBottom, x, y) {
		var sprite = hasBottom?this.sprite2:this.sprite;
		var context = renderer.context;
		if (sprite)
			context.drawImage(sprite.source, sprite.x, sprite.y, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE);
	},
	bind: function(sprites) {
		this.sprite = sprites.get(this.name);
		this.sprite2 = sprites.get(this.name+"-plain") || this.sprite;
	}
})
