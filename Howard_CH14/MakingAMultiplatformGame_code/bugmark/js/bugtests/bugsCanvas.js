/* Bugmark - Display Rendering - Jon Howard 2013 */
bugsCanvas=
{
	testType: "BUGS CANVAS ANIMATION",
	minX:0,
	minY:0,
	maxX:1,
	maxY:1,
	bugs:[],
	c:null,
	numbugs:0,
	canvas:null,
	CBeebiesBug: function()
		{
			this.speedX = 0;
			this.speedY = 0;
			this.x = 0;
			this.y = 0;
			this.img = null;
		},
	construct: function(numBugs, windowWidth, windowHeight, parent)
		{
			this.numbugs = numBugs,
			this.maxX = windowWidth;
			this.maxY = windowHeight;
			
			this.canvas = document.createElement('canvas');
			this.c = this.canvas.getContext?this.canvas.getContext('2d'):null;
			if(!this.c) return false;//If can't create context then browser doesn't support canvas
			
			this.canvas.setAttribute("width",this.maxX+40);
			this.canvas.setAttribute("height",this.maxY+50);

			parent.appendChild(this.canvas); 
			
			
			
			var cbeebiesBug;		
			for (var i=0;i<numBugs;i++)
				{
					cbeebiesBug = new this.CBeebiesBug();
					cbeebiesBug.speedX = 4+Math.random()*3.1* (640/windowWidth);
					cbeebiesBug.speedY = 3+Math.random() * (480/windowHeight);
					cbeebiesBug.x = 0;
					cbeebiesBug.y = -cbeebiesBug.speedY*0.9;
					
					if(Math.random()>0.5) cbeebiesBug.img=bug1;
						else cbeebiesBug.img=bug2;
					this.bugs.push(cbeebiesBug);
				}
				
			return true;
		},
	render: function()
		{
			if(!this.canvas) return;
			var cbeebiesBug; 
			
			this.c.fillStyle="rgba(204, 204, 204, 1)";
			this.c.fillRect(this.minX,this.minY, this.maxX+40, this.maxY+50);
			
			for (var i=0; i<this.numbugs; i++){
				cbeebiesBug = this.bugs[i];
				
				cbeebiesBug.x += cbeebiesBug.speedX;
				cbeebiesBug.y += cbeebiesBug.speedY;
				
				if (cbeebiesBug.x > this.maxX)
				{
					cbeebiesBug.speedX *= -1;
					cbeebiesBug.x = this.maxX;
				}
				else if (cbeebiesBug.x < this.minX)
				{
					cbeebiesBug.speedX *= -1;
					cbeebiesBug.x = this.minX;
				}
				
				if (cbeebiesBug.y > this.maxY){
					cbeebiesBug.speedY *= -1;
					cbeebiesBug.y = this.maxY;
				} 
				else if (cbeebiesBug.y < this.minY){
					cbeebiesBug.speedY*= -1;
					cbeebiesBug.y = this.minY;
				}
				
				this.c.drawImage(cbeebiesBug.img, cbeebiesBug.x, cbeebiesBug.y); 
			}
		},
	
	destroy:function ()
		{
			if(this.c) this.canvas.parentNode.removeChild(this.canvas);
			this.canvas=null;
			this.c = null;
			this.bugs.length=0;
			this.parent=null;
		}
}