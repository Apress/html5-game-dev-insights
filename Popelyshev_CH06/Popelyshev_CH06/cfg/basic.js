var BasicConfig = {
init: function(game) {
	var tiles = game.tiles, sprites = game.sprites
	tiles.defaultObject = tiles.add(new ObjectTile("nothing"));
	tiles.addMany(SurfaceTile, ["grass", "rocky", "sand", "dirt"]);
	tiles.defaultSurface = tiles.get("grass")
	sprites.addSpriteSheet("img/tiles.png", [
		["grass",        "rocky",       "sand",       "dirt",     "hole1",     "hole2", "hole3",  "hole4" ],
		["deep_default", "deep_bridge", "forcefield", "bridge_h", "bridge_v",  "chest", "lumber", "cactus"],
		["brick-plain",  "brick",       "wall-plain", "wall",     "bush-plain","bush",  "block",  "metal" ]
	]);
	sprites.addSpriteSheet("img/horses.png", [ ["horse1", "horse2", "horse3"] ])
}, 
afterInit:  function(game) {
	var tiles = game.tiles, sprites = game.sprites
	//abyss can be created in a mod!
	tiles.add(new SurfaceTile("abyss"));
	tiles.bind(sprites);
} }
