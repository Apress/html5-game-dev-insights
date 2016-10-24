//Jon Howard - @swingpants
//swingpants.com
//Basic point class
function Point(x,y)
{
	this.x = x?x:0;
	this.y = y?y:0;
	
	this.clone = function()
			{
				return new Point(this.x, this.y);
			}
	this.toString = function()
			{
				return "(Point: pos:"+this.x+","+this.y+")";
			}
	this.equals = function(p1, p2)
			{
				if(p1 == p2) return true;
				if(!p1 || !p2) return false;
				return p1.x == p2.x && p1.y == p2.y;
			}
}
