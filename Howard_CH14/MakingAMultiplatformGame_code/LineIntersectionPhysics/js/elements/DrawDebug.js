//Jon Howard - @swingpants
//swingpants.com
//Draw to canvas the edges and requested bounding boxes	
		function drawDebugEdges()
		{
			var i,j;
			context.strokeStyle = "rgb(247,150,70)"; //f79646 - orange
			context.lineWidth = 3; //Bigger if older gen
			context.lineCap = 'round';
			context.beginPath();
			for (i=0;i<lines.length;i++)
				{
					if(lines[i].type=="line")
						{
						for(j=0;j<lines[i].edges.length;j++)
							{
								context.moveTo(lines[i].edges[j].from.x, lines[i].edges[j].from.y);
								context.lineTo(lines[i].edges[j].to.x, lines[i].edges[j].to.y);
							}
						}
				}
			
			context.stroke();
			context.restore();
		}
		
		function drawDebugBoundingBoxes(array, strokeStyle)
		{
			var i,bb;
			context.strokeStyle = strokeStyle; 
			context.lineWidth = 2; //Bigger if older gen
			context.lineCap = 'round';
			context.beginPath();
			for (i=0;i<array.length;i++)
				{
					bb = array[i].boundingBox;
					context.strokeRect(bb.x, bb.y, bb.width, bb.height);
				}
			context.stroke();
			context.restore();	
		}