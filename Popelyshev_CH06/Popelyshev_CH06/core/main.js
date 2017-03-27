function MainWnd(renderer, camera, editor) {
	this.renderer = renderer;
	this.camera = camera;
	this.canvas = camera.canvas;
	this.map = camera.map;
	this.editor = editor;
	
	this.initMouseEvents(this.canvas)
	this.initResize(this.canvas)
}
MainWnd.prototype = {
	tool: 0,
	redraw: function() {
		this.renderer.render(this.camera);
	},
	initMouseEvents: function(canvas) {
		var pressed = false, drag = false;
		var startX = 0, startY = 0;
		var camera = this.camera, editor = this.editor
		var self = this;
		
		function doDrag(x, y) {
			if (!drag && (Math.abs(x-startX)>=5 || Math.abs(y-startY)>=5)) {
				//more than 5 pixels mouse move => drag the map!
				drag = true;
			}
			if (drag) {
				var dx = x - startX, dy = y - startY;
				startX = x;	startY = y;
				camera.moveBy(dx, dy);
			}
			return drag;
		}
		
		function mouseDown(mx, my) {
			pressed = true; drag = false;
			startX = mx; startY = my;
			if (this.tool == 1)
				editor.brushAt(camera.point(mx, my));
			self.redraw();
		}
		function mouseMove(mx, my) {
			if (!pressed) return;
			//move mouse with pressed key => drag map or draw with pencil
			if (self.tool == 0) {
				doDrag(mx, my);
			} else if (self.tool == 1) {
				editor.brushAt(camera.point(mx, my));
			}
			self.redraw();
		}
		function mouseUp(mx, my) {
			if (!pressed) return;
			pressed = false;
			if (self.tool == 0) {
				//if map is not dragged, then click at object
				if (!doDrag(mx, my))
					editor.cursorAt(camera.point(mx, my));
			} else if (self.tool == 1) {
				editor.brushAt(camera.point(mx, my));
			}
			editor.save();
			self.redraw();
			
			//after map drag with zoom != 1.0, camera coordinates can be not integers, lets fix it!
			camera.round();
		}
		
		$(canvas).mousedown(function(e){
			mouseDown(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
		});
		$(canvas).mousemove(function(e){
			mouseMove(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
		});
		$(canvas).mouseup(function(e){
			mouseUp(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
		});
	},
	
	initResize: function(canvas) {
		var self = this;
		var resize = function() {
			canvas.width = window.innerWidth-20;
			canvas.height = window.innerHeight-20;
			self.redraw();
		}
		$(window).resize(resize);
		resize();
	}
}