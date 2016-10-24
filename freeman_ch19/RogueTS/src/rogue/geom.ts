module rogue.geom {

    export class Point{
        constructor(public x:number = 0, public y:number = 0){}
        clone():Point{
            return new Point(this.x, this.y);
        }
    }

    export class Rectangle extends Point{
        constructor(x:number, y:number, public width: number = 0, public height:number = 0){
            super(x,y);
        }
    }

}
