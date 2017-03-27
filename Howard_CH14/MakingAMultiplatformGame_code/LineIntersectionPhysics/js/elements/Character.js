//Jon Howard - @swingpants
//swingpants.com
//Main character class
function Character(posn,velocity, bbWidth,bbHeight, spritesheet)
{
	this.drag = 0.9//*FPSMultiplier;
	this.gravity = 0.3*FPSMultiplier;

	this.terminalVelocity = 12*FPSMultiplier;
	
	this.origPosition = new Point(0,0);
	this.to = new Point();
	this.position = posn;
	this.velocity = velocity;
	this.bbWidth = bbWidth;
	this.bbHeight = bbHeight;
	this.boundingBox = new Rectangle(0,0,1,1);
	this.motionBox = new Rectangle(0,0,1,1);
	
	this.contact = null;
	this.prevContact = null;
	this.contactLost = false;
	this.intersection=new Intersection();
	
	this.spritesheet = spritesheet;
	
	this.isStillOnLadder = false;
	
	//Update the bounding box
	this.updateBoundingBox = updateBoundingBox;
	this.updateBoundingBox();
	
	//Main character update
	this.update = function(lines, blockers)
		{
			this.isStillOnLadder = false;
			//If contact type is ladder then return - the ladder update should be used
			if(this.contact && this.contact.type=="ladder") return;
			
			this.contactLost = false;
			
			//Update horizontal velocity
			this.velocity.x *= this.drag;
			this.origPosition.x = this.position.x;
			this.origPosition.y = this.position.y;
			
			if(this.contact)
				{//If contact exists then move along the contact
					if(this.velocity.x!=0) this.moveAlongContact(this.velocity.x);
				}
				else
				{//If no contact then apply gravity and search for hits
					this.velocity.y += this.gravity;
					this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
					//Look for intersections
					this.findIntersection(this.velocity.x, this.velocity.y, lines);
					
					this.displayJumpingAnim();
				}
			//Check for blockers
			this.checkForBlockers(blockers);
			
			//Apply position
			this.position.x = this.to.x;
			this.position.y = this.to.y;
		}
			
	//Character update if on ladder
	this.updateLadders = function(ladders, dirY)
		{
			if(this.contact && this.contact.type=="ladder")
				{//If in contact with a ladder
					
					//Tween to centre
					this.position.x+=(this.contact.targetX-this.position.x)*0.1;
					
					if(dirY<0 && this.position.y>this.contact.boundingBox.y+this.contact.boundingBox.height*0.9) 
						{//If going down and in the bottom 10% then lose contact with ladder
							this.contact=null;
						}
						else
						{//Apply direction
							this.position.y-=dirY;
						}
					if(this.position.y<(this.contact && this.contact.boundingBox.y))
						{//Reached top of ladder
							this.contact=null;
							this.velocity.y=-4;//Small jump at top of ladder
						}
				}
			else
				{//If not in contact with a ladder
					var i,
						ladder,
						len=ladders.length;
					for (i=0;i<len;i++)
						{//Loop through ladders
							ladder=ladders[i];
							if(ladder.isColliding(this.position.x, this.position.y))
								{//If colliding with bounding box then initiate contact and kill character velocities
									if(dirY<0 && this.position.y>ladder.boundingBox.y+ladder.boundingBox.height*0.9) 
										{
											//FAIL - in bottom 10% and going down so ignoring
										}
										else
										{
											this.contact = ladder;
											this.velocity.x=0;
											this.velocity.y=0;
										}
								}
						}
				}
			this.isStillOnLadder = dirY==0?true:false;
		}
		
	//Checking for blockers
	this.checkForBlockers = checkForBlockers;
	
	//Move along a contact by dx
	this.moveAlongContact = function(dx)
		{
			var moved, 
				moveX = this.contact.normalVector.x * dx;
			//Set target position by using normalVector from contact
			this.to.x = this.position.x + moveX;
			this.to.y = this.position.y +this.contact.normalVector.y * dx;
			
			if(this.to.x > this.contact.to.x)
				{
					moved = moveX ==0?1:Math.abs((this.position.x - this.contact.to.x) / moveX);
					this.position.x = this.contact.to.x;
					this.position.y = this.contact.to.y;
					this.prevContact = this.contact;
					this.contact = this.contact.nextEdge;
					if(this.contact) this.moveAlongContact(dx * (1-moved));
						else this.contactLost = true;
				}
				else
			if(this.to.x < this.contact.from.x)
				{
					moved = moveX ==0?1:Math.abs((this.position.x - this.contact.from.x) / moveX);
					this.position.x = this.contact.from.x;
					this.position.y = this.contact.from.y;
					this.prevContact = this.contact;
					this.contact = this.contact.prevEdge;
					//trace("Lost contact to left"+this.prevContact.prevEdge);
					if(this.contact) this.moveAlongContact(dx * (1-moved));
						else this.contactLost = true;
				}
		}
			
	this.buildBoundingBox = buildBoundingBox;
		
			
	this.findIntersection = findIntersection;
			
	this.doJump = function(velY, override)
		{
			if(this.contact || override)
				{ 
					this.position.y--
					this.velocity.y += velY;
					this.contact=null;
				}
		}
		
	this.moveHoriz = function(dist)
		{
			this.velocity.x += dist;
		}
		
	this.displayWalkingAnim = function()
		{
			this.spritesheet.goToRow(0);
		}
	this.displayStandingAnim = function()
		{
			this.spritesheet.goToRow(1);
		}
	this.displayJumpingAnim = function()
		{
			this.spritesheet.goToRow(2);
		}
	this.displayClimbAnim = function()
		{
			this.spritesheet.goToRow(3);
		}
	this.displayFaceRight=function()
		{
			this.spritesheet.faceRight()
		}
	this.displayFaceLeft=function()
		{
			this.spritesheet.faceLeft();
		}
		
	this.displayUpdate=function()
		{
			if(!this.isStillOnLadder)this.spritesheet.update();
			this.updateBoundingBox();
		}
	this.displayRender=function()
		{
			this.spritesheet.setWrapperPosition(this.position.x, this.position.y);
			this.spritesheet.render();
		}
		
	this.toString = function()
		{
			return "(Player: pos:"+this.x+","+this.y+")";
		}
	
}
