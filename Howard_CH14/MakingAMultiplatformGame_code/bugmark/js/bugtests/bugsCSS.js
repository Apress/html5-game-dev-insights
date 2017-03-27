/* Bugmark - Display Rendering - Jon Howard 2013 */
bugsCSS=
{
	testType: "BUGS CSS3 ANIMATION",
	testDivs:null,
	style:null,
	inited:false,
	parent:null,
	construct: function(numBugs, windowWidth, windowHeight, parent)
		{
			var supported = CSSSupport.TestPrefixes("animation")
			if(!supported) return false;
			this.parent = parent;
			var str="",speedX, speedY, testDiv;
			
			this.initKeyframes("keys",windowWidth, windowHeight );
			
			this.testDivs=[];
					
			for (var i=0;i<numBugs;i++)
				{
					testDiv=document.createElement("div");
					parent.appendChild(testDiv);
					this.testDivs.push(testDiv);
					speedX = 2+Math.random()*3* (640/windowWidth);
					speedY = 1+Math.random() * (480/windowHeight);
					//Construct CSS
					str+=this.applyAnimationCSS(testDiv, "anim"+i, speedX, 0, speedY, -speedY*0.9, "keys");
				}
			
			//Register CSS into DOM
			this.style = document.createElement('style');
			this.style.innerHTML = str;
			
			
			
			return true;
		},
	keyframeStyle:null,
	initKeyframes: function (name, width, height)
		{
			var horizAnimStr = "{0% {left:0px;} 100% {left:"+width+"px;}}";
			var vertAnimStr = "{0% {top:"+height+"px;} 100% {top:0px;}}";
			var animClassStr="@keyframes "+name+"horiz "+horizAnimStr+" ";
			animClassStr+="@keyframes "+name+"vert "+vertAnimStr+" ";
			animClassStr+="@-moz-keyframes "+name+"horiz "+horizAnimStr+" ";
			animClassStr+="@-moz-keyframes "+name+"vert "+vertAnimStr+" ";
			animClassStr+="@-webkit-keyframes "+name+"horiz "+horizAnimStr+" ";
			animClassStr+="@-webkit-keyframes "+name+"vert "+vertAnimStr+" ";
			animClassStr+="@-o-keyframes "+name+"horiz "+horizAnimStr+" ";
			animClassStr+="@-o-keyframes "+name+"vert "+vertAnimStr+" ";
			
			
			this.keyframeStyle = document.createElement('style');
			this.keyframeStyle.innerHTML = animClassStr;
			document.head.appendChild(this.keyframeStyle);
		},
	
	applyAnimationCSS:function(element, name, hlen, hpos, vlen, vpos, keyName )
		{
			var animationStr = keyName+"horiz "+hlen+"s linear "+hpos+"s infinite alternate,"+keyName+"vert "+vlen+"s ease-out "+vpos+"s infinite alternate;";

			var animClassStr = "."+name+"{ width:40px;	height:50px;background-image:url('images/bug"+(Math.random()>0.5?1:2)+".png');position:absolute;";
			animClassStr+="animation:"+animationStr;
			animClassStr+="-moz-animation:"+animationStr;
			animClassStr+="-webkit-animation:"+animationStr;
			animClassStr+="-o-animation:"+animationStr;
			animClassStr+="} ";

			element.className = name;	
			
			return animClassStr;
		},
	render:function()
		{
			if(!this.inited) 
				{
					document.head.appendChild(this.style); 
					this.inited=true;
				}
			
		},
	destroy:function ()
		{
			if(!this.inited) return;
			
			for(var i=0;i<this.testDivs.length;i++)
				{
					this.testDivs[i].className="";
					this.parent.removeChild(this.testDivs[i]);
				}
			
			this.testDivs=null;
			
			this.style.innerHTML="";
			this.keyframeStyle.innerHTML=""
			document.head.removeChild(this.keyframeStyle);
			document.head.removeChild(this.style); 
			this.style=null;
			this.keyframeStyle=null;
			this.parent=null;
			this.inited=false;
		}
}