// Quadtree.js

var MAXOBJ = 10; //how many obj to hold before splitting
var MAXLVL = 10; // deepest level of quad tree
var Quadtree = cc.Class.extend({
    LVL:0, //current level, 0 is top
    balls:null,
    rect:null,
    nodes:null,
    ctor:function (lvl, rect) {
        this.balls = [];
        this.LVL = lvl;
        this.rect = rect;
        this.nodes = [];
    },
    // clear the node and all its child nodes
    clear:function () {
        this.balls = [];
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i]) {
                this.nodes[i].clear();
                this.nodes[i] = null;
            }
        }
    },
    // init its 4 child nodes
    split:function () {
        var w = this.rect.width / 2;
        var h = this.rect.height / 2;
        var x = this.rect.x;
        var y = this.rect.y;
        this.nodes[0] = new Quadtree(this.LVL + 1, cc.rect(x + w, y, w, h));
        this.nodes[1] = new Quadtree(this.LVL + 1, cc.rect(x, y, w, h));
        this.nodes[2] = new Quadtree(this.LVL + 1, cc.rect(x, y + h, w, h));
        this.nodes[3] = new Quadtree(this.LVL + 1, cc.rect(x + w, y + h, w, h));
    },
    // determine which node it belongs to
    getIndex:function (ball) {
        var pos = ball.getPos();
        var radius = ball.radius;
        var index = -1;
        var verticalMid = this.rect.width / 2 + this.rect.x;
        var horizontalMid = this.rect.height / 2 + this.rect.y;
        var top = (pos.y - radius > horizontalMid);
        var bot = (pos.y + radius < horizontalMid);
        if (pos.x - radius > verticalMid) {
            if (top)//left top
                index = 1;
            else if (bot)
                index = 2;
        }
        else if (pos.x + radius < verticalMid) {
            if (top)//right top
                index = 0;
            else if (bot)
                index = 3;
        }
        return index;

    },
    insert:function (ball) {
        // if i have sub nodes
        if (this.nodes[0]) {
            var index = this.getIndex(ball);
            if (index !== -1) {
                this.nodes[index].insert(ball);
                return;
            }
        }

        this.balls.push(ball);
        if (this.balls.length > MAXOBJ && this.LVL < MAXLVL) {
            if (!this.nodes[0]) {
                this.split();
            }
            var i = 0;
            while (i < this.balls.length) {
                var ball = this.balls[i]
                var idx = this.getIndex(ball);
                if (idx != -1) {
                    this.nodes[idx].insert(ball);
                    this.balls.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
    },
    //get all balls that could collide with that ball
    retrieve:function (listptr, ball) {
        var index = this.getIndex(ball);
        if (index !== -1 && this.nodes[0]) {
            this.nodes[index].retrieve(listptr, ball);
        }
        for (var i = 0; i < this.balls.length; i++) {
            listptr.push(this.balls[i]);
        }
        return listptr;

    }
});
