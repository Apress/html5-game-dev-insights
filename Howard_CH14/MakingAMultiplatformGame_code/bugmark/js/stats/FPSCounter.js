/* Bugmark - Display Rendering - Jon Howard 2013 */
FPSCounter = 
{
	targetFPS:60,
	filterStrength:60, 
	lastLoop:0, 
	thisLoop:0,
	intervalID:0,
	timingArray:[],
	timingIndex:0,
	tally:0,
	initCounter: function()
		{
			this.timingArray.length=0;
			for(var i=0;i<this.filterStrength;i++)	
				{
					this.timingArray.push(0);
				}
			this.timingIndex=0;
			this.tally=0;
		},
	gameLoop: function()
		{
			this.thisLoop=Date.now()
			this.timingArray[this.timingIndex]=this.thisLoop - this.lastLoop;
			this.timingIndex++;
			if(this.timingIndex>=this.timingArray.length) this.timingIndex=0;
			this.tally++;
			this.lastLoop = this.thisLoop;
		},
	startCounter:function()
		{
			this.lastLoop=Date.now();
			this.thisLoop=Date.now();
			var ptr=this;
			this.intervalID=setInterval(function(){ptr.gameLoop();},1000/this.targetFPS);
		},
	stopCounter:function()
		{
			clearInterval(this.intervalID);
		},
	getFPS:function()
		{
			var result=0;
			for(var i=0;i<this.timingArray.length;i++)	
				{
					result+=this.timingArray[i];
				}
			var divider = this.tally>this.timingArray.length?this.timingArray.length:this.tally;
			result/=divider;
			return Math.round(1000/result*100)/100;
		}
}