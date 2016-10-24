var AbyssTile = extendTile(SurfaceTile, {
	type:4, layer: 0,
	auto: function(map, i, j) {
		var mask = SurfaceTile.prototype.auto.call(this, map, i, j);
		var id = map.getSurface(i, j-1).type != 4 ?	map.getObject(i, j-1).deepTile.id : 0xff;
		return mask | id;
	},
	render: function(renderer, mask, x, y) {
		var id = mask&0xff;
		if (id != 0xff) {
			renderer.tiles.deep.byId[id].render(renderer, 0, x, y);
		}
		SurfaceTile.prototype.render.call(this, renderer, mask, x, y);
	}
})
