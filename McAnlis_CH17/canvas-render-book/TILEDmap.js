

function TILEDmap(){
  this.currMapData= null;   //copy of the tile information for this map
  this.tileSets= new Array(); // a list of the tile sets (ie textures) used for this map
  this.viewRect= { //the view-rect defines the part of the map that's currently visible to the user.
    "x": 0,
    "y": 0,
    "w": 1000,
    "h": 1000
  };
  this.numXTiles= 100;  //number of x and y tiles  on the map
  this.numYTiles= 100;
  this.tileSize= {   //the size of a given tile, in pixels
    "x": 64,
    "y": 64
  };
  this.pixelSize= { //size of the entire map, in terms of pixels
    "x": this.numXTiles * this.tileSize.x,
    "y": this.numYTiles * this.tileSize.y
  };
  
  this.imgLoadCount=0;    //we may be loading many loose images, as such keep a count of how many have been loaded
  this.fullyLoaded=false; //don't start rendering until everything is loaded
  //---------------------------
  this.load= function () 
  {
    var xhr = new XMLHttpRequest();

    //this is a hard-coded URL to where the map file is sitting
    xhr.open("GET", "./data/map.json", true);

    //note that the data is standard text, so we need to set the mime type accordingly
    xhr.overrideMimeType('text/plain; charset=x-user-defined');

    //here we define what happens when the data-fetch attempts to complete; this callback will be executed
    xhr.onreadystatechange = function() 
    {
      //did we successfully get the data?
      if (xhr.readyState != 4 || xhr.responseText =="")
        return;

      //go ahead and pass the fetched content to the parsing system
      gMap.parseMapJSON(xhr.response);
    
    };
    
    //execute the XHR
    xhr.send();

  };
  //---------------------------
  
  this.parseMapJSON=function(mapJSON)
  {
    //go ahead and parse the JSON data using the internal parser
    //this will return an object that we can iterate through.
  	this.currMapData = JSON.parse( mapJSON );
  	
    //simply cache all the values from the map for ease-of-use
  	var map = this.currMapData;
      this.numXTiles = map.width;
      this.numYTiles = map.height;
      this.tileSize.x = map.tilewidth;
      this.tileSize.y = map.tileheight;
      this.pixelSize.x = this.numXTiles * this.tileSize.x;
      this.pixelSize.y = this.numYTiles * this.tileSize.y;
  	
      //go ahead and load our tilesets, these are used to render the environment

      for (var i = 0; i < map.tilesets.length; i++) 
  	  {
          var img = new Image();

  		    img.onload = new function()
          {
            gMap.imgLoadCount++;//once an image is loaded, increase our load-count
          };

          //the tiled file denotes a particular path to an image, (which is mostly absolute given the editing directory)
          //we need to scrape and covnert that data in order to find the proper path
          img.src = "./data/" + map.tilesets[i].image.replace(/^.*[\\\/]/, '');

          //we need to cache the other properties of the tile-set so that we can use them later
          var ts = {
            "firstgid": map.tilesets[i].firstgid,
            "image": img,
            "imageheight": map.tilesets[i].imageheight,
            "imagewidth": map.tilesets[i].imagewidth,
            "name": map.tilesets[i].name,
            "numXTiles": Math.floor(map.tilesets[i].imagewidth / this.tileSize.x),
            "numYTiles": Math.floor(map.tilesets[i].imageheight / this.tileSize.y)
          };
          this.tileSets.push(ts);
        
  	  
  	  //images load in an async nature, so kick off a function which will poll
      //to see if they are all loaded
  	  checkWait(
  					function() //this is the condition function that's called every instance
  					{
  						return gMap.imgLoadCount == gMap.tileSets.length;
  					},
  					function () //this is the function called once the above is true
  					{
  						onMapDataLoaded();
  					});
  	
      }
  };
  //---------------------------
  this.getTilePacket= function (tileIndex) {
    //this is the packet we'll return after fetching
    var pkt = {
      "img": null,
      "px": 0,
      "py": 0
    };

    //walk through the tile-sets and determine what 'bucket' this index is landing in
    //TILED defines this by providing a 'firstgid' object which defines where this tile's indexes start
    var i = 0;
    for (i = this.tileSets.length - 1; i >= 0; i--) 
    {
      if (this.tileSets[i].firstgid <= tileIndex) 
        break; //FOUND it!
    }

    //copy the information from this tileset
    pkt.img = this.tileSets[i].image;
    //we need to define what the 'local' index is, that is, what the index is in the atlas image for this tile
    //we do this by subtraacking the global id for this tileset, which gives us a relative number.
    var localIdx = tileIndex - this.tileSets[i].firstgid;
    //this math here gives us our pixel coordinates for this tile in the atlas
    var lTileX = Math.floor(localIdx % this.tileSets[i].numXTiles);
    var lTileY = Math.floor(localIdx / this.tileSets[i].numXTiles);
    pkt.px = (lTileX * this.tileSize.x);
    pkt.py = (lTileY * this.tileSize.y);

    //return!
    return pkt;
  };
  //---------------------------
  this.draw= function (ctx) 
  { //
	 if(!this.fullyLoaded) return;
	

   onDrawMap(ctx);//offload the actual rendering of this map to some external function
  };
};

var gMap = new TILEDmap();