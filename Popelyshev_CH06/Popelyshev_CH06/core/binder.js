Tile.prototype.bind = function(sprites) {
	this.sprite = sprites.get(this.name);
	if (sprites.hasOwnProperty(this.name)) {
		var sprite = tile.sprite = sprites.get(this.name);
		sprite.timesUsed++;
	}
}

Sprite.prototype.timesUsed = 0;
SpriteList.prototype.get = function(name) {
	if (this.byName.hasOwnProperty(name)) {
		var sprite = this.byName[name];
		sprite.timesUsed++;
		return sprite;
	}
}

TileList.prototype.addUseless = function(TileType, sprites) {
	var list = sprites.byName;
	var names = [];
	for (var key in list)
		if (list.hasOwnProperty(key) && list[key].timesUsed == 0)
			names.push(list[key].name);
	this.addMany(TileType, names);
	for (var i=0;i<names.length;i++) {
		this.byName[names[i]].sprite = list[names[i]];
	}
}
TileList.prototype.bind = function(sprites) {
	var list = this.byId;
	for (var i=0;i<list.length;i++)
		list[i].bind(sprites);
}