//Jon Howard - @swingpants
//swingpants.com

	//Dev params
	var doScroll=true, 
			doDebug=true ,
			doTrace=true,
			audioOn=false;
	
	//Game params
	var FPS = 60, //Frames per second
		FPSMultiplier = 60/FPS, 
		velocityAmt = 3.5 * FPSMultiplier, //Vel amount for l/r movement
		jumpYVel = -9 * FPSMultiplier, //Calcs to equate velocities and feel across different fps
		ladderSpeed=3* FPSMultiplier;
	
	//World & Screen sizes
	var worldWidth=2000, worldHeight=1100,
		SCREEN_WIDTH=800, SCREEN_HEIGHT=550,
		HALF_SCREEN_WIDTH=SCREEN_WIDTH*0.5,
		HALF_SCREEN_HEIGHT=SCREEN_HEIGHT*0.5;
	
	//Keycodes
	var SPACE = 32,
		LEFT = 37,
		RIGHT = 39,
		UP = 38,
		DOWN = 40,
		ENTER = 13;
	
	