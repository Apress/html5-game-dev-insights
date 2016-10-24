module rogue.renderer {

    export interface IMapRenderer {
        draw(tiles: any[]):void;
        drawTile(column: number, row: number, currentTile: string): void;
        clearMap(): void;
    }

    export class CanvasMapRenderer implements IMapRenderer{
        target: CanvasRenderingContext2D;
        constructor (private canvas: HTMLCanvasElement, private tileRect: geom.Rectangle) {
            this.target = this.canvas.getContext("2d");
        }

        public draw(tiles: any[]):void{
            this.clearMap();
            var row: number;
            var column: number;
            var total: number = tiles.length;
            var rowWidth: number = tiles[0].length;
            var currentTile: string;

            for (row = 0; row < total; row++) {
                for (column = 0; column < rowWidth; column++) {
                    currentTile = tiles[row][column];
                    this.drawTile(column, row, currentTile);
                }
            }


        }
        public drawTile(column: number, row: number, currentTile: string): void {
            //Change tileRect’s x,y position
            this.tileRect.x = column * this.tileRect.width;
            this.tileRect.y = row * this.tileRect.height;
            //Draw tile to the canvas
            this.target.fillStyle = this.tileColor(currentTile);
            this.target.fillRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);
            //Draw outline around tile
            this.target.strokeStyle = "black";
            this.target.strokeRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);

        }
        public clearMap(): void {
            this.canvas.width = this.canvas.width;
        }

        private tileColor(value: string): string {
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
        }


    }




}



