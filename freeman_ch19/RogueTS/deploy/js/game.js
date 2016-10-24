window.onload = function () {
    var canvas = document.getElementById('display');
    var rogueTS = new rogue.Game(canvas);
};
var rogue;
(function (rogue) {
    var Game = (function () {
        function Game(display) {
            var _this = this;
            this.display = display;
            this.invalid = true;
            this.input = new rogue.input.Input();

            this.tiles = [
                ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
                ["#", " ", " ", " ", "#", " ", " ", " ", "#"],
                ["#", " ", " ", " ", " ", " ", " ", " ", "#"],
                ["#", " ", " ", " ", "#", " ", " ", " ", "#"],
                ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
            ];

            this.map = new rogue.map.TileMap(this.tiles);
            this.playerPosition = new rogue.geom.Point(1, 1);
            this.renderer = new rogue.renderer.CanvasMapRenderer(this.display, new rogue.geom.Rectangle(0, 0, 20, 20));

            var gameloop = function () {
                _this.update();
                requestAnimationFrame(gameloop);
            };
            gameloop();
        }
        Game.prototype.update = function () {
            if (this.input.newDirection) {
                this.move(this.input.newDirection);
                this.input.clear();
            }

            if (this.invalid) {
                this.draw();
            }
        };

        Game.prototype.draw = function () {
            this.renderer.draw(this.map.getTiles());
            this.renderer.drawTile(this.playerPosition.x, this.playerPosition.y, "@");
            this.invalid = false;
        };

        Game.prototype.move = function (newDirection) {
            var tmpPoint = this.playerPosition.clone();
            tmpPoint.x += newDirection.x;
            tmpPoint.y += newDirection.y;

            var tile = this.map.getTileType(tmpPoint);
            switch (tile) {
                case " ":
                    this.playerPosition = tmpPoint;
                    this.invalid = true;
                    break;
            }
        };
        return Game;
    })();
    rogue.Game = Game;
})(rogue || (rogue = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var rogue;
(function (rogue) {
    (function (geom) {
        var Point = (function () {
            function Point(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.x = x;
                this.y = y;
            }
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            return Point;
        })();
        geom.Point = Point;

        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height) {
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                _super.call(this, x, y);
                this.width = width;
                this.height = height;
            }
            return Rectangle;
        })(Point);
        geom.Rectangle = Rectangle;
    })(rogue.geom || (rogue.geom = {}));
    var geom = rogue.geom;
})(rogue || (rogue = {}));
var rogue;
(function (rogue) {
    (function (input) {
        (function (Keyboard) {
            Keyboard[Keyboard["LEFT"] = 37] = "LEFT";
            Keyboard[Keyboard["UP"] = 38] = "UP";
            Keyboard[Keyboard["RIGHT"] = 39] = "RIGHT";
            Keyboard[Keyboard["DOWN"] = 40] = "DOWN";
        })(input.Keyboard || (input.Keyboard = {}));
        var Keyboard = input.Keyboard;
        ;

        input.Directions = {
            UP: new rogue.geom.Point(0, -1),
            DOWN: new rogue.geom.Point(0, 1),
            RIGHT: new rogue.geom.Point(1, 0),
            LEFT: new rogue.geom.Point(-1, 0)
        };

        var Input = (function () {
            function Input() {
                var _this = this;
                window.addEventListener("keyup", function (event) {
                    return _this.keyup(event);
                }, false);
            }
            Input.prototype.keyup = function (event) {
                event.stopPropagation();
                event.preventDefault();
                var keyCode = event["keyCode"];

                switch (keyCode) {
                    case 38 /* UP */:
                        this.newDirection = input.Directions.UP;
                        break;
                    case 39 /* RIGHT */:
                        this.newDirection = input.Directions.RIGHT;
                        break;
                    case 40 /* DOWN */:
                        this.newDirection = input.Directions.DOWN;
                        break;
                    case 37 /* LEFT */:
                        this.newDirection = input.Directions.LEFT;
                        break;
                }
            };

            Input.prototype.clear = function () {
                this.newDirection = null;
            };
            return Input;
        })();
        input.Input = Input;
    })(rogue.input || (rogue.input = {}));
    var input = rogue.input;
})(rogue || (rogue = {}));
var rogue;
(function (rogue) {
    (function (map) {
        var TileMap = (function () {
            function TileMap(tiles) {
                this.tiles = tiles;
            }
            TileMap.prototype.getTileType = function (point) {
                return this.tiles[point.y][point.x];
            };

            TileMap.prototype.getWidth = function () {
                return this.tiles[0].length;
            };

            TileMap.prototype.getHeight = function () {
                return this.tiles.length;
            };

            TileMap.prototype.getTileID = function (row, column) {
                return row * this.getWidth() + column;
            };

            TileMap.prototype.getTiles = function () {
                return this.tiles;
            };
            return TileMap;
        })();
        map.TileMap = TileMap;
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;
})(rogue || (rogue = {}));
var rogue;
(function (rogue) {
    (function (renderer) {
        var CanvasMapRenderer = (function () {
            function CanvasMapRenderer(canvas, tileRect) {
                this.canvas = canvas;
                this.tileRect = tileRect;
                this.target = this.canvas.getContext("2d");
            }
            CanvasMapRenderer.prototype.draw = function (tiles) {
                this.clearMap();
                var row;
                var column;
                var total = tiles.length;
                var rowWidth = tiles[0].length;
                var currentTile;

                for (row = 0; row < total; row++) {
                    for (column = 0; column < rowWidth; column++) {
                        currentTile = tiles[row][column];
                        this.drawTile(column, row, currentTile);
                    }
                }
            };
            CanvasMapRenderer.prototype.drawTile = function (column, row, currentTile) {
                this.tileRect.x = column * this.tileRect.width;
                this.tileRect.y = row * this.tileRect.height;

                this.target.fillStyle = this.tileColor(currentTile);
                this.target.fillRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);

                this.target.strokeStyle = "black";
                this.target.strokeRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);
            };
            CanvasMapRenderer.prototype.clearMap = function () {
                this.canvas.width = this.canvas.width;
            };

            CanvasMapRenderer.prototype.tileColor = function (value) {
                switch (value) {
                    case " ":
                        return "#ffffff";
                        break;
                    case "@":
                        return "#ff0000";
                        break;
                    default:
                        return "#333333";
                }
            };
            return CanvasMapRenderer;
        })();
        renderer.CanvasMapRenderer = CanvasMapRenderer;
    })(rogue.renderer || (rogue.renderer = {}));
    var renderer = rogue.renderer;
})(rogue || (rogue = {}));
