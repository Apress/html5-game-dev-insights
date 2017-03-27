//Jon Howard - @swingpants
//swingpants.com

//Calculations for line to line intersections. 
//Finds the interection point of line A and B
function Intersection() 
{
	this.LineLineIntersection = function(fromA,toA, fromB,toB)
		{
			//  If line is undefined then return
			if (fromA.x == toA.x && fromA.y == toA.y || fromB.x == toB.x && fromB.y == toB.y) return null;
		
			//  If the end points are the same then return.
			if (fromA.x == fromB.x && fromA.y == fromB.y 
					|| toA.x==fromB.x && toA.y==fromB.y
					|| fromA.x == toB.x && fromA.y == toB.y 
					|| toA.x == toB.x && toA.y == toB.y) return null;


			var toAx,
				toAy,
				fromBx,
				fromBy,
				toBx,
				toBy,
				distA,
				theCos,
				theSin,
				newFromX,
				newFromY,
				newToX,
				newToY;
			
			//  fromA becomes the origin by translating system.
				toAx = toA.x - fromA.x; 
				toAy = toA.y - fromA.y;
				fromBx = fromB.x - fromA.x; 
				fromBy = fromB.y - fromA.y;
				toBx = toB.x - fromA.x; 
				toBy = toB.y - fromA.y;

	  

			  //  Calc length of lineA.
			  distA=Math.sqrt(toAx*toAx + toAy*toAy);

			  //  Rotate system to put toA on the X axis.
			  theCos = toAx / distA;
			  theSin = toAy / distA;
			  
			  newFromX = fromBx * theCos + fromBy * theSin;
			  newFromY  = fromBy * theCos - fromBx * theSin;
			  
			  newToX = toBx * theCos + toBy * theSin;
			  newToY  = toBy * theCos - toBx * theSin; 
			  
			  //  Fail if segment doesn't cross line A-B.
			  if (newFromY<0 && newToY<0 || newFromY>=0 && newToY>=0) return null;

			  //   Calculate he intersection point.
			  var result = {};
			  var intersectPos;
			  intersectPos = newToX + (newFromX - newToX) * newToY / (newToY - newFromY);
			  
			  //  Fail if segment crosses line A-B outside of segment A-B.
				if (intersectPos<0 || intersectPos>distA) return null;

			  //  Rotate/translate result back to original coordinate system.
			  result.x = fromA.x + intersectPos * theCos;
			  result.y = fromA.y + intersectPos * theSin;

			  //  Success.
			  return result; 
		}
	
	//Calc to work out if a position is below or above an edge (used to see if character should engage with platform)
	this.pointIsOnOrAboveLine=function(posX, posY, edge)
		{
			var result = (edge.to.x - edge.from.x) * (posY- edge.from.y) - (edge.to.y - edge.from.y) * (posX - edge.from.x);
			return result<=0;
		}
	
}
