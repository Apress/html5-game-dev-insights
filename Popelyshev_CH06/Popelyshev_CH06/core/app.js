function App(mods) {
	var tiles = this.tiles = new TileList();
	var sprites = this.sprites = new SpriteList();
	for (var i=0;i<mods.length;i++)
		mods[i].init && mods[i].init(this)
	for (var i=0;i<mods.length;i++)
		mods[i].afterInit && mods[i].afterInit(this)
	tiles.addUseless(ObjectTile, sprites);

	var self = this;
	sprites.onComplete = function() { self.initMap(); }
}

App.prototype = {
	tool: 0,
	redraw: function() {
		this.renderer.render(this.camera);
	},
	initMap : function() {
		var tiles = this.tiles;
		var sprites = this.sprites;
		var map = this.map = new MapField(tiles, 32, 32);
		var editor = this.editor = new Editor(map);
		editor.load();
		var renderer = this.renderer = new Renderer(map, this.sprites);
		var camera = this.camera = new Camera(map, $("#screen")[0]);
		this.builder = new BuilderWnd(editor, sprites, $("#builder")[0]);
		this.main = new MainWnd(renderer, camera, editor);
	}
}
