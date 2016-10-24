// GameMaps.js

var GameMaps = cc.Layer.extend({
    _tiledMap:null,
    _mapSize:null,
    _mapContentSize:null,
    _startPoint:null,
    _wayPoints:null,

    _tlWayPoint:null,

    init:function () {
        this._super();

        // init background tilemap
        this._tiledMap = cc.TMXTiledMap.create(s_DtMapsTmx);
        this.addChild(this._tiledMap);

        // set background size
        var layer = this._tiledMap.getLayer("tlBackground");
        this._mapSize = layer.getLayerSize();
        this._mapContentSize = layer.getContentSize();

        // init start point
        this.initStartPoint();

        // init way points
        this.initWayPoints();

        // cc.log("map size:" + this._mapSize.width + " " + this._mapSize.height);
    },
    initStartPoint:function () {
        var layer = this._tiledMap.getLayer("tlStartPoint");
        for (var widthIndex = 0; widthIndex < this._mapSize.width; widthIndex++) {
            for (var heightIndex = 0; heightIndex < this._mapSize.height; heightIndex++) {
                var startPoint = cc.p(widthIndex, heightIndex);
                if (layer.getTileAt(startPoint)) {
                    cc.log("the map start point: (" + startPoint.x + ", " + startPoint.y + ")");
                    this._startPoint = startPoint;
                    return;
                }
            }
        }
        cc.log("error: not found start point.");
    },
    initWayPoints:function () {
        var wps = [];
        var currentPoint = this._startPoint;

        var prePoint = null;
        var nextPoint = null;

        do {
            // cc.log("push way point: (" + currentPoint.x + ", " + currentPoint.y + ")");
            wps.push(currentPoint);
            nextPoint = this.findNextPoint(currentPoint, prePoint);
            // cc.log("push way point: (" + nextPoint.x + ", " + nextPoint.y + ")");
            prePoint = currentPoint;
            currentPoint = nextPoint;
        } while (nextPoint);

        this._wayPoints = wps;
    },
    findNextPoint:function (curPoint, prePoint) {
        if (!this._tlWayPoint)
            this._tlWayPoint = this._tiledMap.getLayer("tlWayPoint");

        var topPoint = cc.p(curPoint.x, curPoint.y - 1);
        var bottomPoint = cc.p(curPoint.x, curPoint.y + 1);
        var leftPoint = cc.p(curPoint.x - 1, curPoint.y);
        var rightPoint = cc.p(curPoint.x + 1, curPoint.y);

        if (this.checkWayPoint(topPoint) &&
            this._tlWayPoint.getTileAt(topPoint) &&
            !this.checkNextPoint(topPoint, prePoint))
            return topPoint;
        if (this.checkWayPoint(bottomPoint) &&
            this._tlWayPoint.getTileAt(bottomPoint) &&
            !this.checkNextPoint(bottomPoint, prePoint))
            return bottomPoint;
        if (this.checkWayPoint(leftPoint) &&
            this._tlWayPoint.getTileAt(leftPoint) &&
            !this.checkNextPoint(leftPoint, prePoint))
            return leftPoint;
        if (this.checkWayPoint(rightPoint) &&
            this._tlWayPoint.getTileAt(rightPoint) &&
            !this.checkNextPoint(rightPoint, prePoint))
            return rightPoint;
        return null;
    },
    checkNextPoint:function (curPoint, prePoint) {
        if (!prePoint) {
            return false;
        }
        return cc.pointEqualToPoint(curPoint, prePoint);
    },
    checkWayPoint:function (point) {
        return point.x >= 0 && point.y >= 0 &&
            point.x < this._mapSize.width &&
            point.y < this._mapSize.height;
    },
    checkPointIsWayPoint:function (point) {
        for (var i = 0, len = this._wayPoints.length; i < len; i++) {
            var wp = this._wayPoints[i];
            if (cc.pointEqualToPoint(point, wp)) {
                return true;
            }
        }
        return false;
    },

    // public method
    _cellWidth:null,
    _cellHeight:null,
    getPositionByPoint:function (point) {
        if (!this._cellWidth || !this._cellHeight) {
            this._cellWidth = this._mapContentSize.width / this._mapSize.width;
            this._cellHeight = this._mapContentSize.height / this._mapSize.height;
        }

        var x = this._cellWidth / 2 + point.x * this._cellWidth;
        var y = this._mapContentSize.height - (+this._cellHeight / 2 + point.y * this._cellHeight);

        // cc.log("cell width:" + this._cellWidth + " cell height:" + this._cellHeight);
        return cc.pAdd(cc.p(x, y), this.getPosition());
    },
    getPointByLocation:function (position) {
        var x = (position.x - this.getPosition().x) / this._cellWidth;
        var y = (position.y - this.getPosition().y) / this._cellHeight;
        y = this._mapSize.height - y;

        return cc.p(parseInt(x), parseInt(y));
    },
    getWayPositions:function () {
        var value = [];
        // add start position
        var startPosition = this.getPositionByPoint(cc.pAdd(this._startPoint, cc.p(0, -1)));
        value.push(startPosition);

        for (var i = 0, len = this._wayPoints.length; i < len; i++) {
            value.push(this.getPositionByPoint(this._wayPoints[i]));
        }
        // add end position
        var endPoint = this._wayPoints[this._wayPoints.length - 1];
        var endPosition = this.getPositionByPoint(cc.pAdd(endPoint, cc.p(0, 1)));
        value.push(endPosition);
        return value;
    }
});

GameMaps.create = function () {
    var layer = new GameMaps();
    layer.init();
    return layer;
};


