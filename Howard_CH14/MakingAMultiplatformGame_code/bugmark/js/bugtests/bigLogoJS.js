/* Bugmark - Display Rendering - Jon Howard 2013 */
bigLogoJS=
{
	testType: "BIG LOGO JS DIV BG",
	minX:-384,
	minY:-28,
	maxX:0,
	maxY:0,
	bugs:[],
	c:null,
	numLogos:0,
	bugStyle:null,
	parent:null,
	CBeebiesLogo: function()
		{
			this.speedX = 0;
			this.speedY = 0;
			this.logoDiv = null;
			this.x = 0;
			this.y = 0;
		},
	setInnerHTML: function(inDOMNode, inHTML) 
		{
			inDOMNode.innerHTML = "_" + inHTML;      
			inDOMNode.removeChild(inDOMNode.firstChild); 
		}, 
	construct: function(numLogos, windowWidth, windowHeight, parent)
		{
			this.numLogos = numLogos,
			this.maxX = 0;//windowWidth;
			this.maxY = 0;//windowHeight;
			this.parent = parent;
			var cbeebiesLogo;		
			for (var i=0;i<numLogos;i++)
				{
					cbeebiesLogo = new this.CBeebiesLogo();
					cbeebiesLogo.speedX = -2+Math.random()* (640/windowWidth);
					cbeebiesLogo.speedY = -1+Math.random() * (480/windowHeight);
					cbeebiesLogo.logoDiv = document.createElement('div');
					cbeebiesLogo.logoDiv.className = "bigLogoBG";
					cbeebiesLogo.x = Math.random()*this.minX;
					cbeebiesLogo.y = Math.random()*this.minY;
					parent.appendChild(cbeebiesLogo.logoDiv);
					this.bugs.push(cbeebiesLogo);
				}
			this.render();
			return true;  
		},
	render: function()
		{
			var cbeebiesLogo,str; 

			for (var i=0; i<this.numLogos; i++)
			{
				cbeebiesLogo = this.bugs[i];
				
				cbeebiesLogo.x += cbeebiesLogo.speedX;
				cbeebiesLogo.y += cbeebiesLogo.speedY;
				
				if (cbeebiesLogo.x > this.maxX)
					{
						cbeebiesLogo.speedX *= -1;
						cbeebiesLogo.x = this.maxX;
					}
				else if (cbeebiesLogo.x < this.minX)
					{
						cbeebiesLogo.speedX *= -1;
						cbeebiesLogo.x = this.minX;
					}
				
				if (cbeebiesLogo.y > this.maxY)
					{
						cbeebiesLogo.speedY *= -1;
						cbeebiesLogo.y = this.maxY;
					} 
				else if (cbeebiesLogo.y < this.minY)
					{
						cbeebiesLogo.speedY*= -1;
						cbeebiesLogo.y = this.minY;
					}
				//Set background position
				cbeebiesLogo.logoDiv.style.backgroundPosition = (cbeebiesLogo.x)+"px "+(cbeebiesLogo.y)+"px";
			}
		},
	
	destroy:function ()
		{
			var cbeebiesLogo; 

			for (var i=0;i<this.bugs.length;i++)
				{
					cbeebiesLogo = this.bugs[i];
					this.parent.removeChild(cbeebiesLogo.logoDiv);
					cbeebiesLogo.logoDiv = null;
				}
			this.bugs.length=0;
			this.parent=null;
		}
}