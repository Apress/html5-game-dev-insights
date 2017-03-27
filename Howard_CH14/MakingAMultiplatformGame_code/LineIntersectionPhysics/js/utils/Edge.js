//Jon Howard - @swingpants
//swingpants.com
//Value object for edges
function Edge(type, from, to, control) 
{
	this.type = type;
	// the position of the particle
	this.from = from;
	this.to = to;
	this.control = control;
	
	this.isVertical = from.x == to.x;
	this.isHorizontal = from.y == to.y;
	
	var distX = to.x - from.x;
	var distY = to.y - from.y;
	
	this.length = Math.sqrt(distX*distX+distY*distY);
	this.normalVector = {x:distX/this.length, y:distY/this.length};
	
	this.prevEdge = null;
	this.nextEdge = null;
}
