module rogue.map {
    export interface IMap{
        getWidth(): number;
        getHeight(): number;
        getTiles(): any[];
        getTileType(point: geom.Point): string;
    }

    export class TileMap implements IMap {

        constructor (private tiles: any[]) {}

        public getTileType(point: geom.Point): string {
            return this.tiles[point.y][point.x];
        }

        public getWidth(): number {
            return this.tiles[0].length;
        }

        public getHeight(): number {
            return this.tiles.length;
        }

        public getTileID(row: number, column: number): number {
            return row * this.getWidth() + column;
        }

        public getTiles(): any[] {
            return this.tiles;
        }
    }

}
