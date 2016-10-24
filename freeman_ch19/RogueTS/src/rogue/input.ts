module rogue.input {
    export enum Keyboard {
        LEFT=37,
        UP=38,
        RIGHT=39,
        DOWN=40,
    };

    export var Directions = {
        UP: new geom.Point(0, -1),
        DOWN: new geom.Point(0, 1),
        RIGHT: new geom.Point(1, 0),
        LEFT: new geom.Point(-1, 0)
    }

    export class Input {
        newDirection: geom.Point;
        constructor (){
            window.addEventListener("keyup", event => this.keyup(event) , false);
        }

        keyup( event: Event ):void {
            event.stopPropagation();
            event.preventDefault();
            var keyCode = event["keyCode"];

            switch (keyCode){
                case Keyboard.UP:
                    this.newDirection = Directions.UP;
                    break;
                case Keyboard.RIGHT:
                    this.newDirection = Directions.RIGHT;
                    break;
                case Keyboard.DOWN:
                    this.newDirection = Directions.DOWN;
                    break;
                case Keyboard.LEFT:
                    this.newDirection = Directions.LEFT;
                    break;
            }
        }

        clear():void {
            this.newDirection = null;
        }


    }


}
