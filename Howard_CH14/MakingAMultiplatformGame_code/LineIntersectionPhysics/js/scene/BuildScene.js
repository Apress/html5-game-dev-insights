//Jon Howard - @swingpants
//swingpants.com
//Raw data to set up a level. In actual project the level data would be in a JSON file and interpreted to construct a level.
		
		function setUpLevel()
		{
			var line = new Line();
			//WORLD
			line = new Line();
			line.addEdge(new Edge("line", new Point(0, worldHeight-1), new Point(worldWidth+1, worldHeight-1)));
			lines.push(line);

			
			line = new Line();
			line.addEdge(new Edge("onewayline",new Point(0,300),new Point(200,340)));
			line.addEdge(new Edge("onewayline",new Point(200,340),new Point(300,315)));
			line.addEdge(new Edge("onewayline",new Point(300,315),new Point(390,265)));
			line.addEdge(new Edge("onewayline",new Point(390,265),new Point(515,210)));
			line.addEdge(new Edge("onewayline",new Point(515,210),new Point(544,210)));
			line.addEdge(new Edge("onewayline",new Point(544,210),new Point(690,306)));
			line.addEdge(new Edge("onewayline",new Point(690,306),new Point(790,340)));
			line.addEdge(new Edge("onewayline",new Point(790,340),new Point(840,345)));
			line.addEdge(new Edge("onewayline",new Point(840,345),new Point(1025,291)));
			line.addEdge(new Edge("onewayline",new Point(1025,291),new Point(1126,247)));
			line.addEdge(new Edge("onewayline",new Point(1126,247),new Point(1190,253)));
			line.addEdge(new Edge("onewayline",new Point(1190,253),new Point(1270,294)));
			line.addEdge(new Edge("onewayline",new Point(1270,294),new Point(1333,383)));
			line.addEdge(new Edge("onewayline",new Point(1333,383),new Point(1414,440)));
			line.addEdge(new Edge("onewayline",new Point(1414,440),new Point(1487,420)));
			line.addEdge(new Edge("onewayline",new Point(1487,420),new Point(1585,333)));
			line.addEdge(new Edge("onewayline",new Point(1585,333),new Point(1634,307)));
			line.addEdge(new Edge("onewayline",new Point(1634,307),new Point(1676,298)));
			line.addEdge(new Edge("onewayline",new Point(1676,298),new Point(1720,240)));
			line.addEdge(new Edge("onewayline",new Point(1720,240),new Point(1826,175)));
			line.addEdge(new Edge("onewayline",new Point(1826,175),new Point(1960,166)));
			lines.push(line);

			
		}