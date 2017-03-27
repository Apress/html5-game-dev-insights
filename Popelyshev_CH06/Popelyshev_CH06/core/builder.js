function BuilderWnd(editor, sprites, canvas) {
	this.editor = editor; this.tiles = editor.tiles; this.sprites = sprites; this.canvas = canvas; 
	this.initMouseEvents(canvas); this.redraw();
}

BuilderWnd.prototype = {
	click: function(x, y) {
		var index = (y >> TILE_SIZE_BITS) * this.cols + (x >> TILE_SIZE_BITS)
		this.editor.selected = index >= 0 && index < this.tiles.byId.length ? this.tiles.byId[index]: null
	},
	initMouseEvents: function(canvas) {
		var self = this;
		$(canvas).mousedown(function(e) {		
			var x = e.pageX;
			var y = e.pageY;
			var t = e.target;
			while (t != document.body) {
				x -= t.offsetLeft;
				y -= t.offsetTop;
				t = t.parentNode;
			}
			self.click(x, y);
			self.redraw();
			e.preventDefault();
			e.stopPropagation();
		});
	},
	redraw: function() {
		var canvas = this.canvas
		
		canvas.width = canvas.parentNode.clientWidth;
		canvas.height = canvas.parentNode.clientHeight;
		this.cols = canvas.width >> TILE_SIZE_BITS
		this.rows = canvas.height >> TILE_SIZE_BITS
		
		var context = canvas.getContext("2d")
		context.fillStyle = "black"
		context.fillRect(0, 0, canvas.width, canvas.height)
		var tiles = this.tiles
		for (var i=0;i<tiles.byId.length; i++) {
			var x = (i%this.cols) * TILE_SIZE
			var y = (i/this.cols|0) * TILE_SIZE
			var sprite = tiles.byId[i].sprite
			if (sprite)
				context.drawImage(sprite.source, sprite.x, sprite.y, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE)
		}
		var name = "undefined";
		if (this.editor.selected) {
			var sel = this.editor.selected
			name = sel.name
		
			var x = (sel.id%this.cols) * TILE_SIZE
			var y = (sel.id/this.cols|0) * TILE_SIZE
			//stroke width 1.0 => line center must be X.5
			context.strokeStyle = "white"
			context.lineWidth = 1.0
			context.strokeRect(x + 0.5, y + 0.5, TILE_SIZE-1, TILE_SIZE-1)
		}
		
		context.fillStyle = "white";
		context.textAlign = "right";
		context.font = "bold 11px Tahoma, Arial";
		context.fillText(name, canvas.width - 10, canvas.height - 10);
	}
}