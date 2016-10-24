//Jon Howard - @swingpants
//swingpants.com
//Spritesheet. initialise and control of a spritesheet.
//I've made an assumption that a whole anim will be on just one row of the spritesheet. This means I can optimise the calcs around
//what to show.
function Spritesheet(sheet,sheetWidth,sheetHeight, cellsPerStrip, numStrips, wrapper, offsetX, offsetY, speed)
{
	this.sheet = sheet;
	this.width = sheetWidth;
	this.height = sheetHeight;
	this.cellsPerStrip = cellsPerStrip;
	this.numStrips = numStrips;
	this.wrapper = wrapper;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	
	this.posX = 0;
	this.posY = 0;
	this.speed = speed;
	
	this.dirOffsetY=0;
	this.prevPosX=0;
	this.prevPosY=0;
	
	this.setWrapperPosition=function(posX,posY)
		{
			this.wrapper.style.left = (posX+this.offsetX) + 'px';
			this.wrapper.style.top = (posY+this.offsetY) + 'px';
		}
	//Update the anim position
	this.update = function()
		{
			this.posX+=this.speed;
			if(this.posX>=this.cellsPerStrip) this.posX-=cellsPerStrip;
			if(this.posX<0) this.posX+=cellsPerStrip;
		}
	//Go to a different anim line
	this.goToRow = function(row)
		{
			this.posY=row;
		}
	this.goToColumn = function(col)
		{
			this.posX=col;
		}	
	//Initially I used a CSS transform here, but that was far too slow, so now the spritesheets are constructed to have right on top and left replicated below.
	this.faceRight = function()
		{
			if(this.dirOffsetY==0) return;
			this.dirOffsetY = 0;
		}
	this.faceLeft = function()
		{
			if(this.dirOffsetY>0)return;
			this.dirOffsetY = this.numStrips * 0.5;
			//this.sheet.className="flip-horizontal";
		}
	//Render, but only if necessary
	this.render = function()
		{
			var roundX = Math.round(this.posX);
			if(this.prevPosX==roundX && this.prevPosY == this.posY+this.dirOffsetY)return;
			this.prevPosX = roundX;
			this.prevPosY = this.posY+this.dirOffsetY;
			this.sheet.style.backgroundPosition = -roundX*this.width+"px "+-(this.prevPosY*this.height)+"px";
		}
}
