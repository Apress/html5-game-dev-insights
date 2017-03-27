//Jon Howard - @swingpants
//swingpants.com

//Assorted utility functions

function trace(str)
	{
		if(!doTrace) return;
		if(window.console)console.log(str);
	}
	
//Create a client side image
function getImage(url, posX, posY, width, height)
		{
			var img = new Image();//document.createElement("IMG");
			
			img.style.position="absolute";
			img.style.left = posX+"px";
			img.style.top = posY+"px";
			img.src = url;
			img.width=width;
			img.height=height;
			return img;
		}
		
function createADiv(className, posX, posY)
		{
			var pDiv = document.createElement( 'div' );
			pDiv.className = className;//Apply
			pDiv.style.left = posX+'px';
			pDiv.style.top = posY+'px';

			return pDiv
		}