// Tower.js

var HighBullet = cc.Node.extend({
    _lifeTime:null,
    _initTime:null,
    _attackRange:null,

    _sprite:null,
    _attack:null,

    _atkMonsters:null,

    init:function (image, attack) {
        this._sprite = cc.Sprite.create(image);
        this.addChild(this._sprite);

        this._initTime = (new Date()).valueOf();
        this._attack = attack;
        this.schedule(this.update, 0);

        this.radius = this._attackRange = 7;
        this._atkMonsters = [];
    },
    getSprite:function () {
        return this._sprite;
    },
    getPos:function () {
        return this._sprite.getPosition();
    },
    setLifeTime:function (dt) {
        this._lifeTime = dt;
    },
    checkAttack:function (monster) {
        if (!monster)
            return;
        var towerPosition = this._sprite.getPosition();
        var monsterPosition = monster.getSprite().getPosition();
        var tmDistance = cc.pDistance(towerPosition, monsterPosition);

        if (tmDistance > this._attackRange + monster.getAttackedRange()) {
            return;
        }
        // check state
        if (monster.isDie()) {
            return;
        }
        this.attackMonster(monster);
    },
    attackMonster:function (monster) {
        // check attacked
        for (var i = 0, len = this._atkMonsters.length; i < len; i++) {
            if (this._atkMonsters[i] == monster)
                return;
        }
        // was attacked
        monster.lostBlood(this._attack);
        this._atkMonsters.push(monster);
    },
    showRange:function (value) {
        if (value) {
            if (!this._sAttackRange) {
                this._sAttackRange = cc.Sprite.create(s_AttackRange);
                this.addChild(this._sAttackRange, -1);
            }

            var sarRadii = this._sAttackRange.getContentSize().width / 2;
            var scale = this._attackRange / sarRadii;
            this._sAttackRange.setScale(scale);

        } else {
            if (this._sAttackRange) {
                this._sAttackRange.removeFromParent();
                this._sAttackRange = null;
            }
        }
    },
    update:function (dt) {
        var curT = (new Date()).valueOf();
        if (curT - this._initTime >= this._lifeTime * 1000) {
            // cc.log("bullet die");
            this.removeFromParent();
        }
        if (this._sAttackRange) {
            this._sAttackRange.setPosition(this._sprite.getPosition());
        }
    }
});

HighBullet.create = function (attack) {
    var highBullet = new HighBullet();
    highBullet.init(s_HighBullet, attack);
    return highBullet;
};

var Tower = cc.Layer.extend({
    _gameLayer:null,
    _isLow:false,

    _speed:null,
    _attack:null,
    _preAttackTime:null,
    _attackRange:null,

    _sAttackRange:null,
    _sBall:null,

    _sprite:null,
    _rect:null,

    init:function (filename, ball, attackRange, speed, attack) {
        this._super();

        // set speed
        this._speed = speed;
        this._attack = attack;
        this._preAttackTime = this.getCurrentTime();

        // set attack range
        this.radius = this._attackRange = attackRange;

        var tower = this._sprite = cc.Sprite.create(filename);
        this.addChild(tower);

        var size = tower.getTexture().getContentSize();
        this._rect = cc.rect(0, 0, size.width, size.height);

        var ball = this._sBall = cc.Sprite.create(ball);
        ball.setPosition(cc.p(0, 22));
        this.addChild(ball);

        // ball action
        var move = cc.MoveBy.create(1.2, cc.p(0, 6));
        var moveBack = move.reverse();
        ball.runAction(cc.RepeatForever.create(
            cc.Sequence.create(move, moveBack)));

    },
    getPos:function () {
        return this.getPosition();
    },
    checkAttack:function (monster) {
        if (!monster) {
            // cc.log("monster not null");
            return;
        }

        if (this._curPosition.x != 0 && this._curPosition.y != 0 ) {
            // moveing
            return;
        }

        // check attack speed
        var curTime = this.getCurrentTime();
        if (curTime - this._preAttackTime < this._speed) {
            // cc.log("check attack speed ");
            return;
        }

        // check attack range
        var towerPosition = this.getPosition();
        var monsterPosition = monster.getSprite().getPosition();
        var tmDistance = cc.pDistance(towerPosition, monsterPosition);

        if (tmDistance > this._attackRange + monster.getAttackedRange()) {
            return;
        }

        // check state
        if (monster.isDie()) {
            return;
        }

        this._preAttackTime = curTime;
        this.attackMonster(monster);
    },
    attackMonster:function (monster) {
        // create bullet
        if (this._gameLayer) {
            if (!this._isLow) {
                var highBullet = HighBullet.create(this._attack);
                highBullet.getSprite().setPosition(
                    cc.pAdd(this.getPosition(),
                        this._sBall.getPosition()));

                this._gameLayer.addHighBullet(highBullet);

                var towerPosition = this.getPosition();
                var monsterPosition = monster.getSprite().getPosition();
                var distance = cc.pDistance(towerPosition, monsterPosition);

                var move = cc.MoveBy.create(
                    distance / 200,
                    cc.pSub(monster.getSprite().getPosition(), highBullet.getSprite().getPosition()));
                var action = cc.RepeatForever.create(move);

                var winSize = cc.Director.getInstance().getWinSize();
                var winSizePoint = cc.p(winSize.width, winSize.height);
                var maxDistance = cc.pDistance(cc.p(0, 0), winSizePoint);
                highBullet.setLifeTime(maxDistance / 200);

                highBullet.getSprite().runAction(action);

                if (HD.SOUND) {
                    cc.AudioEngine.getInstance().playEffect(s_AttackHighEffect_mp3);
                }
            }

            if (this._isLow) {
                var bullet = cc.Sprite.create(s_Bullet);
                bullet.setPosition(
                    cc.pAdd(this.getPosition(),
                        this._sBall.getPosition()));
                this._gameLayer.addChild(bullet);

                var move = cc.MoveTo.create(0.1, monster.getSprite().getPosition());
                bullet.runAction(cc.Sequence.create(
                    move,
                    cc.CallFunc.create(function () {
                        bullet.removeFromParent();
                    }, bullet)
                ));
                monster.lostBlood(this._attack);

                if (HD.SOUND) {
                    cc.AudioEngine.getInstance().playEffect(s_AttackEffect_mp3);
                }
            }
        }
    },
    setGameLayer:function (gameLayer) {
        this._gameLayer = gameLayer;
    },
    getCurrentTime:function () {
        return (new Date()).valueOf();
    },
    showRange:function (value) {
        if (value) {
            if (!this._sAttackRange) {
                this._sAttackRange = cc.Sprite.create(s_AttackRange);
                this.addChild(this._sAttackRange, -1);
            }

            var sarRadii = this._sAttackRange.getContentSize().width / 2;
            var scale = this._attackRange / sarRadii;
            this._sAttackRange.setScale(scale);

        } else {
            if (this._sAttackRange) {
                this._sAttackRange.removeFromParent();
                this._sAttackRange = null;
            }
        }
    },

    _curPosition:cc.p(0,0),
    _beganTouch:null,
    rect:function () {
        return cc.rect(-this._rect.width / 2, -this._rect.height / 2,
            this._rect.width, this._rect.height);
    },
    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.x += this.getPosition().x;
        myRect.y += this.getPosition().y;
        return cc.rectContainsPoint(myRect, getPoint);
    },
    onEnter:function () {
        this._super();
        cc.registerTargetedDelegate(0, true, this);
    },
    onExit:function () {
        this._super();
        cc.unregisterTouchDelegate(this);
    },
    onTouchBegan:function (touch, event) {
        // check rect
        if (!this.containsTouchLocation(touch))
            return false;
        this._curPosition.x = this.getPositionX();
        this._curPosition.y = this.getPositionY();
        this._beganTouch = touch.getLocation();
        return true;
    },
    onTouchMoved:function (touch, event) {
        var touchPoint = touch.getLocation();
        var moveTouch = cc.pSub(touchPoint, this._beganTouch);
        this.setPosition(cc.pAdd(this._curPosition, moveTouch));
    },
    onTouchEnded:function (touch, event) {
        // check position
        var location = this._gameLayer.checkTowerLocation(this.getPosition());
        if (!location) {
            this.setPosition(this._curPosition);
        } else {
            this.setPosition(location);
        }
        this._curPosition.x = 0;
        this._curPosition.y = 0;
    }
});

Tower.create = function (filename, ball, speed, attack) {
    var tower = new Tower();
    tower.init(filename, ball, 90, speed, attack);
    return tower;
};

Tower.createLow = function () {
    var tower = Tower.create(s_Tower[0], s_TowerBall[0], 300, 20);
    tower._isLow = true;
    return tower;
};

Tower.createHigh = function () {
    var tower = Tower.create(s_Tower[1], s_TowerBall[1], 1000, 30);
    tower._isLow = false;
    return tower;
};
