//Jon Howard - @swingpants
//swingpants.com
//Rectangle class with relevant collision functions
function Rectangle(x,y,w,h)
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	
	this.clone = function()
			{
				return new Rectangle(this.x, this.y, this.width, this.height);
			}
	this.toString = function()
			{
				return "(Rectangle: pos:"+this.x+","+this.y+"  -  w/h:"+this.width+","+this.height+")";
			}
	this.equals = function(r1, r2)
			{
				if(r1 == r2) return true;
				if(!r1 || !r2) return false;
				return r1.x == r2.x && r1.y == r2.y && r1.width == r2.width && r1.height == r2.height;
			}
	this.intersects = function (rect)
			{
				var x0 = Math.max(this.x, rect.x);
				var x1 = Math.min(this.x + this.width, rect.x + rect.width);
				
				if (x0 <= x1) 
					{
						var y0 = Math.max(this.y, rect.y);
						var y1 = Math.min(this.y + this.height, rect.y + rect.height);

						if (y0 <= y1) 
							{
							  return true;
							}
					  }
				return false;
			}
	this.contains = function(rect) 
			{
				return this.x <= rect.x &&
				   this.x + this.width >= rect.x + rect.width &&
				   this.y <= rect.y &&
				   this.y + this.height >= rect.y + rect.height;
			}
			
	this.isColliding = function(posX,posY)
			{	
				return posX>=this.x && posX<=this.x+this.width 
								&& posY>=this.y && posY<=this.y+this.height;
			}
}
