var test = [0, 0, 0, 0, 0, 0, 0, 0, 0];
Tile.prototype.noSurface = false
SurfaceTile.prototype.autoSurface = false
SolidTile.prototype.noSurface = true

SurfaceTile.prototype.auto = function(map, i, j) {
	//AUTOTILE #1
	if (!this.autoSurface || map.getObject(i, j).noSurface) return 0;
	var noEdges = true;
	for (var dx = -1; dx<=1; dx++)
 		for (var dy = -1; dy<=1; dy++) {
			var v = test[dx+ 3*dy+4] = map.getSurface(i+dx, j+dy) != this 
				&& !map.getObject(i+dx, j+dy).noSurface
			if (v) noEdges = false;
		}
	if (noEdges) return 0;
	var res = 0;
	for (var i=0;i<4; i++) {
		var dx = i&1, dy = i>>1;
		var dx2 = dx*2-1, dy2 = dy*2-1;
		var r;
		if (test[4+dx2]) {
			if (test[4+dy2*3]) {
				r = 2;
			} else r = 13 - dx2*2;
		} else if (test[4+dy2*3]) {
			r = 13 - dy2*8;
		} else if (test[4 + dx2 + dy2*3]) {
			r = 13 - dx2*2 - dy2*8;
		} else r = 0;
		r+= dx + dy*4;
		res |= (r<<(8+i*6));
	}
	return res;
}

SurfaceTile.prototype.render = function(renderer, mask, x, y) {
	var sprite = this.sprite
	var context = renderer.context
	if (!sprite) return
	var dx, dy;
	mask>>>=8;
	var T2 = TILE_SIZE/2;
	if (mask!=0) {
		dx = (mask&3)*T2; 
		dy = ((mask&63)>>2)*T2;
		context.drawImage(sprite.source, dx+sprite.x, dy+sprite.y, T2, T2, x, y, T2, T2);
		mask>>>=6;
		dx = (mask&3)*T2; 
		dy = ((mask&63)>>2)*T2;
		context.drawImage(sprite.source, dx+sprite.x, dy+sprite.y, T2, T2, x+T2, y, T2, T2);
		mask>>>=6;
		dx = (mask&3)*T2; 
		dy = ((mask&63)>>2)*T2;
		context.drawImage(sprite.source, dx+sprite.x, dy+sprite.y, T2, T2, x, y+T2, T2, T2);
		mask>>>=6;
		dx = (mask&3)*T2; 
		dy = ((mask&63)>>2)*T2;
		context.drawImage(sprite.source, dx+sprite.x, dy+sprite.y, T2, T2, x+T2, y+T2, T2, T2);
	} else context.drawImage(sprite.source, sprite.x, sprite.y, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE);
}