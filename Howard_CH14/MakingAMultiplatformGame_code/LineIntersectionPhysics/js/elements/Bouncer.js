//Jon Howard - @swingpants
//swingpants.com
//A bouncer will launch the user the given amount (bounceYAmt)
//When sprung it will animate before resetting to previous static display
function Bouncer(sheet, posX, posY, width, height, bounceYAmt, target) 
{
	this.boundingBox = new Rectangle(posX,posY,width, height);
	this.centreX = posX + width * 0.5;
	this.bounceYAmt = bounceYAmt;
	this.target = target;
	this.sheet = sheet;
	
	this.sprung = false;
	this.active = true;
	
	this.position = function() 
		{ 
			return {x:this.boundingBox.x, y:this.boundingBox.y};
		}
	
	this.setPosition = function(posX, posY)
		{
			this.boundingBox.x = posX;
			this.boundingBox.y = posY;
		}
	this.isColliding = function()
		{
			return this.boundingBox.isColliding(this.target.position.x, this.target.position.y);
		}
	this.isBoxIntersecting = function(box)
		{
			return this.boundingBox.intersects(box);
		}
	this.hitResponse = function()
		{
			this.target.doJump(this.bounceYAmt, true);
			soundManager.play("spring");
			this.sheet.goToRow(1);
			this.sheet.goToColumn(0);
			this.sprung = true;
		}
	this.render = function()
		{
			if(!this.sprung) return;

			if(this.sprung && this.sheet.posX>=this.sheet.cellsPerStrip-1) 
				{
					this.sprung = false;
					this.sheet.goToRow(0);
				}
			this.sheet.update();
			this.sheet.render();
		}
}
