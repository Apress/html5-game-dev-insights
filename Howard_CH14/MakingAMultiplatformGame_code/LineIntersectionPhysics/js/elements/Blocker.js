//Jon Howard - @swingpants
//swingpants.com
//A blocker is an invisible element that stops a user walking through it
function Blocker(posX, posY, width, height) 
{
	this.boundingBox = new Rectangle(posx,posY,width, height);
	this.centreX = posX + width * 0.5;
	
	this.position = function() { return {x:this.boundingBox.x, y:this.boundingBox.y};}
	this.setPosition(posX, posY)
		{
			this.boundingBox.x = posX;
			this.boundingBox.y = posY;
		}
	this.isColliding(posX,posY)
		{
			return this.boundingBox.contains(posX,posY);
		}
	this.isBoxIntersecting(box)
		{
			return this.boundingBox.intersects(box);
		}
}
