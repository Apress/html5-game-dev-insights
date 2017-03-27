//Jon Howard - @swingpants
//swingpants.com
//Common functions used by elements

	//Update the bounding box
	function updateBoundingBox()
		{
			this.boundingBox.x = this.position.x - this.bbWidth*0.5;
			this.boundingBox.y = this.position.y - this.bbHeight;
			this.boundingBox.width = this.bbWidth;
			this.boundingBox.height = this.bbHeight;

		}
			
	//Checking for blockers
	function checkForBlockers(blockers)
		{
			if(!blockers) return; //If no blockers then return
			var len = blockers.length;
			var blocker;
			//Build a motion bounding box
			this.buildBoundingBox(this.motionBox,this.position.x, this.position.y, this.to.x, this.to.y);
		
			for(var i=0;i<len;i++)
				{//Loop through blockers
					blocker = blockers[i];
					if(blocker.isBoxIntersecting(this.motionBox))
						{
							if(this.contact)
								{
									var shift = this.position.x<blocker.centreX?-1:1;
									//Check for line-line intersection
									var pt = this.intersection.LineLineIntersection(this.contact.from, this.contact.to,
																			new Point(blocker.boundingBox.x+shift,this.contact.from.y-100),
																			new Point(blocker.boundingBox.x + shift, this.contact.to.y + 100));
									//If intersection point is returned then apply otherwise regress to the 
									if(pt)this.to = pt;
										else this.to.x = this.origPosition.x;
								}
								else
								{
									this.to.x = this.origPosition.x;
									
									if(this.contactLost)
										{
											this.to.y = this.origPosition.y;
											this.contact = this.prevContact;
										}
								}
							break;
						}
				}
		}
	
	//Move along a contact by dx
	function moveAlongContact(dx)
		{
			var moved, 
				moveX = this.contact.normalVector.x * dx * this.speed ;
			//Set target position by using normalVector from contact
			this.to.x = this.position.x + moveX;
			this.to.y = this.position.y +this.contact.normalVector.y * dx * this.speed;
			
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
			
	function buildBoundingBox(rect,posX1, posY1, posX2, posY2)
		{
			rect.x = posX1 < posX2?posX1:posX2;
			rect.y = posY1 < posY2?posY1:posY2;
			rect.width = Math.max(1,Math.abs(posX2 - posX1));
			rect.height = Math.max(1,Math.abs(posY2 - posY1));
		}
			
			
	function findIntersection(dx,dy,lines)
		{
			this.to.x = this.position.x+dx;
			this.to.y = this.position.y+dy;
			
			this.buildBoundingBox(this.motionBox, this.position.x, this.position.y,this.to.x, this.to.y);
			
			if(lines)
				{//If there are lines
					var result,
						len = lines.length,
						lenEdges,
						edge,
						onOrAbove,
						i,j;
						
						for(i=0;i<len;i++)
							{//Loop thru lines
								if (lines[i].isBoxIntersecting(this.motionBox))
									{
										//Boxes intersect so see if edges do
										lenEdges = lines[i].numEdges;
										for (j = 0; j < lenEdges; j++)
										{
											edge = lines[i].edges[j];
											result = this.intersection.LineLineIntersection(edge.from, edge.to, this.position, this.to);

											if(result)onOrAbove = this.intersection.pointIsOnOrAboveLine(this.position.x, this.position.y, edge)
											if (result && (edge.type=="line" || onOrAbove))
												{
													this.to.x = result.x;
													this.to.y = result.y//-1;
													
													if (edge.type == "line" )
														{
															if (edge.isVertical)
																{
																	this.velocity.x = 0;
																	if (this.position.x < edge.from.x) this.to.x -= 1;
																	else this.to.x += 1;
																}
																else
															//if (edges[i].isHorizontal)
																{
																	this.velocity.y = 0;
																	//if (this.intersection.pointIsOnOrAboveLine(this.position, edge))
																	if(onOrAbove)
																		{
																			this.contact = edge;
																		}
																		else
																		{
																			this.to.y = result.y //+ 1;
																		}
																}
														}
														else
														{
															this.velocity.y = 0;
															this.contact = edge;
														}
												}
							
								
								
										}
									}
							}

				}
			//if(this.contact)trace("?"+this.contact+"  prev:"+this.contact.prevEdge+"  next:"+this.contact.nextEdge);
		}

