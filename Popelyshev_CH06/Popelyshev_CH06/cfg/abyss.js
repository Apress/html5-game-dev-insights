var AbyssConfig = {
init: function(game) {
	var tiles = game.tiles
	tiles.deep = new TileList();
	Tile.prototype.deepTile = tiles.deep.add( new Tile("deep_default"));
	tiles.addMany(ObjectTile, ["bridge_v", "bridge_h"], {
		deepTile: tiles.deep.add(new Tile("deep_bridge"))
	})
	tiles.add(new AbyssTile("abyss"));
}, 
afterInit:  function(game) {
	var tiles = game.tiles, sprites = game.sprites
	tiles.deep.bind(sprites);
}}
