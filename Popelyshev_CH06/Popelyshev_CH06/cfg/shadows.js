var ShadowConfig = {
init: function(game) {
	var tiles = game.tiles, sprites = game.sprites
	tiles.addMany(SolidTile, ["brick", "wall", "bush", "block", "metal"])
} }
