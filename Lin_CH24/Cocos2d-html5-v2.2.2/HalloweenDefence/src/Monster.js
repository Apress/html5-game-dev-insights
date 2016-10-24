// Monster.js

var Monster = cc.Node.extend({
    _blood:null,
    _maxBlood:null,
    _isDie:false,
    _attackedRange:null,

    _bloodNode:null,
    _sBlood:null,
    _sBloodBackground:null,
    _sAttackedRange:null,

    init:function (filename) {
        this._super();

        // set attacked range
        this.radius = this._attackedRange = 15;

        // init blood
        this._bloodNode = cc.Node.create();

        this._sprite = cc.Sprite.create(filename);
        this.addChild(this._sprite);

        // blood
        var blood = cc.Sprite.create(s_Blood);
        var contentSize = blood.getContentSize();
        blood.setAnchorPoint(cc.p(0, 0.5));
        this._bloodNode.addChild(blood);
        var bloodBackground = cc.Sprite.create(s_BloodBackground);
        this._bloodNode.addChild(bloodBackground);
        bloodBackground.setPosition(cc.p(0, 20));
        blood.setPosition(cc.p(-contentSize.width / 2, 20));
        this.addChild(this._bloodNode);
        this._sBlood = blood;
        this._sBloodBackground = bloodBackground;

        this.scheduleUpdate();
    },
    update:function (dt) {
        this._bloodNode.setPosition(this._sprite.getPosition());
    },
    getSprite:function () {
        return this._sprite;
    },
    getPos:function () {
        return this._sprite.getPosition();
    },
    setBlood:function (maxBlood) {
        this._blood = maxBlood;
        this._maxBlood = maxBlood;
    },
    lostBlood:function (blood) {
        this._blood = this._blood - blood;
        if (this._blood <= 0) {
            // die
            this._blood = 0;
            var fadeOut = cc.FadeOut.create(0.5);
            this._sBlood.runAction(fadeOut.clone());
            this._sBloodBackground.runAction(fadeOut.clone());
            this._sprite.runAction(cc.Sequence.create(
                fadeOut,
                cc.CallFunc.create(function () {
                    this.removeFromParent();
                }, this)
            ));
            this._isDie = true;
            HD.SCORE += this._maxBlood;

            if (HD.SOUND) {
                cc.AudioEngine.getInstance().playEffect(s_MonsterDie_mp3);
            }
        }
        this._sBlood.setScaleX(this._blood / this._maxBlood);
    },
    isDie:function () {
        return this._isDie;
    },
    getAttackedRange:function () {
        return this._attackedRange;
    },
    showRange:function (value) {
        if (value) {
            if (!this._sAttackedRange) {
                this._sAttackedRange = cc.Sprite.create(s_AttackRange);
                this._bloodNode.addChild(this._sAttackedRange);
            }

            var sarRadii = this._sAttackedRange.getContentSize().width / 2;
            var scale = this._attackedRange / sarRadii;
            this._sAttackedRange.setScale(scale);

        } else {
            if (this._sAttackedRange)
                this._sAttackedRange.removeFromParent();
            this._sAttackedRange = null;
        }
    }
});

Monster.create = function (filename, maxBlood) {
    var monster = new Monster();
    monster.init(filename);
    monster.setBlood(maxBlood);
    return monster;
};

Monster.createGreen = function () {
    return Monster.create(s_Monster[0], 50);
};

Monster.createPurple = function () {
    return Monster.create(s_Monster[1], 100);
};

Monster.createOrange = function () {
    return Monster.create(s_Monster[2], 400);
};

