function createTwoDimArray(dim1, dim2, def) {
	var res = [];
	for (var j=0;j<dim1; j++) {
		var a = [];
		for (var i=0;i<dim2; i++) {
			a.push(def);
		}
		res.push(a);
	}
	return res;
}

function MapField(tiles, cols, rows) {
	this.tiles = tiles;
	this.cols = cols;
	this.rows = rows;
	this.surface = createTwoDimArray(rows, cols, tiles.defaultSurface);
	this.objects = createTwoDimArray(rows, cols, tiles.defaultObject);
}

MapField.prototype = {
	rows: 0,
	cols: 0,
	checkBounds: function(col, row) {
		return col>=0 && col < this.cols && row>=0 && row < this.rows; 
	},
	getSurface: function(col, row) { 
		return this.checkBounds(col, row) && this.surface[row][col] || this.tiles.defaultSurface
	},
	getObject: function(col, row) { 
		return this.checkBounds(col, row) && this.objects[row][col] || this.tiles.defaultObject
	},
	setSurface: function(col, row, value) {
		this.checkBounds(col, row) && (this.surface[row][col]=value) 
	},
	setObject: function(col, row, value) {
		this.checkBounds(col, row) && (this.objects[row][col]=value) 
	},
	load: function(data) {
		var rows = this.rows = data.rows;
		var cols = this.cols = data.cols;
		var list = [];
		for (var i=0;i<data.tiles.length;i++)
			list.push(this.tiles.byName[data.tiles[i]])
		this.surface = [];
		this.objects = [];
		for (var i=0;i<rows;i++) {
			this.surface.push([]);
			for (var j=0;j<cols;j++)
				this.surface[i].push(list[data.surface[i][j]] || this.tiles.defaultSurface)
			this.objects.push([]);
			for (var j=0;j<cols;j++)
				this.objects[i].push(list[data.objects[i][j]] || this.tiles.defaultObject)
		}
	},
	save: function() {
		data = { tiles:[], surface: [], objects: [] }
		var rows = data.rows = this.rows
		var cols = data.cols = this.cols
		var list = this.tiles.byId
		for (var i=0;i<list.length;i++)
			data.tiles.push(list[i].name)
		for (var i=0;i<rows;i++) {
			data.surface.push([]);
			for (var j=0;j<cols;j++)
				data.surface[i].push(this.surface[i][j].id)
			data.objects.push([]);
			for (var j=0;j<cols;j++)
				data.objects[i].push(this.objects[i][j].id)
		}
		return data
	}
}
