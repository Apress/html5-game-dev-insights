/* Bugmark - Display Rendering - Jon Howard 2013 */
bigLogoJSImgScaled=
{
	testType: "BIG LOGO JS IMG SCALED",
	minX:-384,
	minY:-28,
	maxX:0,
	maxY:0,
	logos:[],
	c:null,
	numLogos:0,
	parent:null,
	CBeebiesLogo: function()
		{
			this.speedX = 0;
			this.speedY = 0;
			this.img = null;
			this.x = 0;
			this.y = 0;
		},
	construct: function(numLogos, windowWidth, windowHeight, parent)
		{
			this.numLogos = numLogos,
			this.maxX = 0//windowWidth;
			this.maxY = 0;//windowHeight;
			this.parent = parent;
			var cbeebiesLogo;		
			for (var i=0;i<numLogos;i++)
				{
					cbeebiesLogo = new this.CBeebiesLogo();
					cbeebiesLogo.speedX = -2+Math.random()*(640/windowWidth);
					cbeebiesLogo.speedY = -1+Math.random() * (480/windowHeight);
					cbeebiesLogo.img = document.createElement('img');
					cbeebiesLogo.img.src = "images/bigLogo.png";
					cbeebiesLogo.img.style.width= "2048px";
					cbeebiesLogo.img.style.height= "1000px";
					cbeebiesLogo.x = Math.random()*this.minX;
					cbeebiesLogo.y =Math.random()*this.minY;
					parent.appendChild(cbeebiesLogo.img);
					this.logos.push(cbeebiesLogo);
					
				}
				this.render();
			return true;  
		},
	render: function()
		{
			var cbeebiesLogo,str; 

			for (var i=0; i<this.numLogos; i++)
			{
				cbeebiesLogo = this.logos[i];
				
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
				cbeebiesLogo.img.style.left = cbeebiesLogo.x+'px';
				cbeebiesLogo.img.style.top = cbeebiesLogo.y+'px';
			}
		},
	
	destroy:function ()
		{
			var cbeebiesLogo; 

			for (var i=0;i<this.logos.length;i++)
				{
					cbeebiesLogo = this.logos[i];
					this.parent.removeChild(cbeebiesLogo.img);
					cbeebiesLogo.img = null;
				}
			this.logos.length=0;
			this.parent=null;
		}
}