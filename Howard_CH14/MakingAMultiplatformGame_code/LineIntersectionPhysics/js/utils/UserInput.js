//Jon Howard - @swingpants
//swingpants.com
//Collection of input handlers

	//Control flags
	var leftIsDown=false, rightIsDown=false, jumpIsDown=false, jumpLeftIsDown=false, jumpRightIsDown=false, upIsDown = false, downIsDown = false;
	
		function mouseHandler(event)
		{
			switch(event.type)
			{
			
				case "mousedown": 
				case "onmousedown": 
							inputDown=true;
							inputX = currentX = event.clientX;
							inputY = currentY = event.clientY;
					break;
				case "mousemove":  
				case "onmousemove":  
					currentX = event.clientX;
					currentY = event.clientY;
					break;        
				case "mouseup":   
				case "onmouseup":   
					inputDown=false;
					inputLifted=true;
					currentX = event.clientX;
					currentY = event.clientY;
					leftIsDown = false;
					rightIsDown = false;
					upIsDown = false;
					jumpIsDown = false;
					break;
				default: return;
			}
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
		
		function touchStartHandler(event)
		{
			var touch, i,
				len = event.changedTouches.length;
			for(i=0;i<len;i++)
				{
					touch = event.changedTouches[i];
					if(controlTouchID<0 )
						{
							controlTouchID = touch.identifier;
							inputDown=true
							inputX = currentX = touch.clientX;
							inputY = currentY = touch.clientY;
						}
				}
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
		
		function touchMoveHandler(event)
		{
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var touch, i,
				len = event.changedTouches.length;
			for(i=0;i<len;i++)
				{
					touch = event.changedTouches[i];
					if(controlTouchID==touch.identifier)
						{
							currentX = touch.clientX;
							currentY = touch.clientY;
						}
				}
		}
		
		function touchEndHandler(event)
		{
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var touch, i,
				len = event.changedTouches.length;
			for(i=0;i<len;i++)
				{
					touch = event.changedTouches[i];
					if(controlTouchID==touch.identifier)
						{
							controlTouchID=-1;
							inputLifted=true;
							inputDown=false;
							leftIsDown = false;
							rightIsDown = false;
							upIsDown = false;
							jumpIsDown = false;
						}
				}
		}

    	function gestureHandler(event)
		{
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
		
		function onKeyDown(event)
		{
			inputDown=true;
			switch(event.keyCode)
			{
				case SPACE: //JUMP
					jumpIsDown=true;
					break;
				case UP:
					upIsDown = true;
					break;
				case DOWN:
					downIsDown = true;
					break;
				case LEFT:
					leftIsDown = true;
					break;
				case RIGHT:
					rightIsDown = true;
					break;
			}
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
		
		function onKeyUp(event)
		{
			inputDown=false;
			switch(event.keyCode)
			{
				case SPACE: //JUMP
					jumpIsDown=false;
					break;
				case UP:
					upIsDown = false;
					break;
				case DOWN:
					downIsDown = false;
					break;
				case LEFT:
					leftIsDown = false;
					break;
				case RIGHT:
					rightIsDown = false;
					break;
			}
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
