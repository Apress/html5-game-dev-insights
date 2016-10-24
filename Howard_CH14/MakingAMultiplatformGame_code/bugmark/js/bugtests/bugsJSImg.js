/* Bugmark - Display Rendering - Jon Howard 2013 */
bugsJSImg=
{
	testType: "BUGS JS IMG ANIMATION",
	minX:0,
	minY:0,
	maxX:1,
	maxY:1,
	bugs:[],
	c:null,
	numbugs:0,
	bugStyle:null,
	parent:null,
	CBeebiesBug: function()
		{
			this.speedX = 0;
			this.speedY = 0;
			this.bugImg = null;
			this.x = 0;
			this.y = 0;
		},
		
	construct: function(numBugs, windowWidth, windowHeight, parent)
		{
			this.numbugs = numBugs,
			this.maxX = windowWidth;
			this.maxY = windowHeight;
			this.parent = parent;
			var cbeebiesBug;		
			for (var i=0;i<numBugs;i++)
				{
					cbeebiesBug = new this.CBeebiesBug();
					cbeebiesBug.speedX = 4+Math.random()*3.1* (640/windowWidth);
					cbeebiesBug.speedY = 3+Math.random() * (480/windowHeight);
					cbeebiesBug.bugImg = document.createElement('img');
					cbeebiesBug.bugImg.src = Math.random()>0.5?"images/bug1.png":"images/bug2.png";
					cbeebiesBug.x = 0;
					cbeebiesBug.y = (cbeebiesBug.speedY*0.9);
					parent.appendChild(cbeebiesBug.bugImg);
					this.bugs.push(cbeebiesBug);
				}
			return true;  
		},
		
	render: function()
		{
			var cbeebiesBug,str; 

			for (var i=0; i<this.numbugs; i++)
			{
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
				
				if (cbeebiesBug.y > this.maxY)
					{
						cbeebiesBug.speedY *= -1;
						cbeebiesBug.y = this.maxY;
					} 
				else if (cbeebiesBug.y < this.minY)
					{
						cbeebiesBug.speedY*= -1;
						cbeebiesBug.y = this.minY;
					}
				cbeebiesBug.bugImg.style.left = cbeebiesBug.x+'px';
				cbeebiesBug.bugImg.style.top = cbeebiesBug.y+'px';
			}
		},
	
	destroy:function ()
		{
			var cbeebiesBug; 

			for (var i=0;i<this.bugs.length;i++)
				{
					cbeebiesBug = this.bugs[i];
					this.parent.removeChild(cbeebiesBug.bugImg);
					cbeebiesBug.bugImg = null;
				}
			this.bugs.length=0;
			this.parent=null;
		}
}