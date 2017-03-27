function extendTile(Type, obj) {
	var newClass = function Tile(name, obj) {
		this.name = name;
		if (obj) for (var key in obj) 
			if (obj.hasOwnProperty(key))
				this[key] = obj[key];
	}
	var proto = new Type();	
	for (var key in obj) 
		if (obj.hasOwnProperty(key))
			proto[key] = obj[key];
	newClass.prototype = proto;
	return newClass;
}

var Tile = extendTile(function() {}, {})
var SurfaceTile = extendTile(Tile, {type: 0, layer: 0})
var ObjectTile = extendTile(Tile, {type: 1, layer: 1})

var TileList = function() {
	this.byId = []
	this.byName = {}
}

TileList.prototype = {
	defaultSurface : null,
	defaultObject: null,
	add : function(tile) {
		// if tile exists, dont add it
		if (this.byName[tile.name]) return 
		tile.id = this.byId.length;
		this.byId.push(tile);
		return this.byName[tile.name] = tile;
	},
	get : function(id) { return this.byId[id] || this.byName[id] || null; },
	apply : function(names, obj) {
		for (var i=0;i<names.length;i++) {
			var t = this.byName[names[i]]
			for (var key in obj) if (obj.hasOwnProperty(key)) t[key] = obj[key];
		}
	},
	addMany : function(Type, names, obj) {
		for (var i=0;i<names.length;i++)
			this.add(new Type(names[i], obj))
	}
}
