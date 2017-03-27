var SurfaceConfig = {
init: function(game) {
	var tiles = game.tiles, sprites = game.sprites	
	tiles.apply(["grass", "sand", "dirt", "abyss"], {autoSurface: true});
	tiles.apply(["bridge_v", "bridge_h"], { noSurface: true});
	sprites.addSpriteSheet("img/surfaces.png", [
		["grass", "", "abyss", "", "sand", "", "dirt"]
	]);
} }
