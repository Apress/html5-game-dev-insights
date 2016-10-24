module rogue {
    export class Game {
        invalid: boolean = true;
        renderer: renderer.IMapRenderer;
        tiles: any[];
        map: map.IMap;
        playerPosition: geom.Point;
        input: input.Input;
        constructor (public display: HTMLCanvasElement) {
            this.input = new input.Input();

            this.tiles = [["#","#","#","#","#","#","#","#","#"],
                ["#"," "," "," ","#"," "," "," ","#"],
                ["#"," "," "," "," "," "," "," ","#"],
                ["#"," "," "," ","#"," "," "," ","#"],
                ["#","#","#","#","#","#","#","#","#"]
            ]

            this.map = new rogue.map.TileMap(this.tiles);
            this.playerPosition = new geom.Point(1,1);
            this.renderer = new renderer.CanvasMapRenderer(this.display, new geom.Rectangle(0, 0, 20, 20));

            // Create and start the game loop
            var gameloop = () => {this.update(); requestAnimationFrame(gameloop);}
            gameloop();

        }

        update():void{
            if (this.input.newDirection) {
                this.move(this.input.newDirection);
                this.input.clear();
            }


            if (this.invalid) {
                this.draw();
            }

        }

        draw():void{
            this.renderer.draw(this.map.getTiles());
            this.renderer.drawTile(this.playerPosition.x, this.playerPosition.y, "@");
            this.invalid = false;
        }

        move(newDirection:geom.Point): void {

            var tmpPoint: geom.Point = this.playerPosition.clone();
            tmpPoint.x += newDirection.x;
            tmpPoint.y += newDirection.y;

            var tile: string = this.map.getTileType(tmpPoint);
            switch (tile) {
                case " ":
                    this.playerPosition = tmpPoint;
                    this.invalid = true;
                    break;
            }
        }

    }
}
