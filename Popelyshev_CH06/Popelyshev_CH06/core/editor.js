function Editor(map) { this.map = map; this.tiles = map.tiles }

Editor.prototype = {
	selected: null,
	modified: false,
	brushAt: function(point) {
		var x = point.x >> TILE_SIZE_BITS, y = point.y >> TILE_SIZE_BITS;
		var tile = this.selected
		if (tile) {
			if (tile.layer == 0) {
				//if tile is surface, delete the object and place the tile
				this.map.setSurface(x, y, tile)
				this.map.setObject(x, y, this.tiles.defaultObject)
			}
			else
				this.map.setObject(x, y, tile)
			this.modified = true
		}
	},
	cursorAt: function(point) {
	},
	load: function() {
		if (localStorage['mapdata']) {
			this.map.load(JSON.parse(localStorage['mapdata']));		
			this.modified = false
		}
	},
	save: function() {
		if (this.modified) {
			localStorage['mapdata'] = JSON.stringify(this.map.save());
			this.modified = false
		}
	}
}
