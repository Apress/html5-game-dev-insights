var GameLayer = cc.Layer.extend({
    _maps:null,
    _winSize:null,

    _towerLayer:null,
    _bulletLayer:null,
    _monsterLayer:null,

    _lbScore:null,

    _quad:null,

    init:function () {
        this._super();
        this._winSize = cc.Director.getInstance().getWinSize();

        HD.SCORE = 0;

        // init game maps
        this.initMaps();

        // init tower
        this.initTowers();

        // add tool bar
        this.initToolsBar();

        // add score
        this.initScore();

        // set update
        this.scheduleUpdate();

        this.addMonster(Monster.createOrange());
        this.schedule(this.autoAddMonster, 2);

        this._quad = new Quadtree(0, cc.rect(0, 0, this._winSize.width, this._winSize.height));
    },
    initMaps:function () {
        this._maps = GameMaps.create();
        this._maps.setPosition(cc.p(0, 30));
        this.addChild(this._maps);
    },
    initTowers:function () {
        var tower = Tower.createLow();
        tower.setGameLayer(this);
        var towerPoint = this._maps.getPositionByPoint(cc.p(4, 3));
        tower.setPosition(towerPoint);
        tower.showRange(HD.SHOW_RANGE);

        var tower2 = Tower.createHigh();
        tower2.setGameLayer(this);
        // var tower2Point = this._maps.getPositionByPoint(cc.p(6, 2));
        var tower2Point = this._maps.getPositionByPoint(cc.p(3, 4));
        tower2.setPosition(tower2Point);
        tower2.showRange(HD.SHOW_RANGE);

        this._towersLayer = cc.Layer.create();
        this._towersLayer.addChild(tower);
        this._towersLayer.addChild(tower2);
        this.addChild(this._towersLayer);
    },
    initToolsBar:function () {
        var toolLayer = cc.Layer.create();

        var toolsBar = cc.Sprite.create(s_ToolsBar);
        toolsBar.setPosition(cc.p(this._winSize.width / 2, toolsBar.getContentSize().height / 2));
        toolLayer.addChild(toolsBar);
        this.addChild(toolLayer, 2);

        // add monster menu item
        var green = cc.Sprite.create(s_Monster[0]);
        var greenSelected = cc.Sprite.create(s_Monster[0]);
        greenSelected.setColor(cc.c4b(125, 125, 125, 125));
        var menuMonsterGreen = cc.MenuItemSprite.create(
            green,
            greenSelected,
            function () {
                this.addMonster(Monster.createGreen());
            }, this);
        menuMonsterGreen.setPosition(cc.p(118, -245 * 0.6));

        var purple = cc.Sprite.create(s_Monster[1]);
        var purpleSelected = cc.Sprite.create(s_Monster[1]);
        purpleSelected.setColor(cc.c4b(125, 125, 125, 125));
        var menuMonsterPurple = cc.MenuItemSprite.create(
            purple,
            purpleSelected,
            function () {
                this.addMonster(Monster.createPurple());
            }, this);
        menuMonsterPurple.setPosition(cc.pAdd(menuMonsterGreen.getPosition(), cc.p(48, 0)));

        var orange = cc.Sprite.create(s_Monster[2]);
        var orangeSelected = cc.Sprite.create(s_Monster[2]);
        orangeSelected.setColor(cc.c4b(125, 125, 125, 125));
        var menuMonsterOrange = cc.MenuItemSprite.create(
            orange,
            orangeSelected,
            function () {
                this.addMonster(Monster.createOrange());
            }, this);
        menuMonsterOrange.setPosition(cc.pAdd(menuMonsterPurple.getPosition(), cc.p(48, 0)));

        var menuShowRange = cc.MenuItemFont.create("Show Range", function () {
            HD.SHOW_RANGE = !HD.SHOW_RANGE;

            var showRanges = function (layer) {
                if (!layer) return;
                var objs = layer.getChildren();
                if (!objs) return;
                for (var i = 0, len = objs.length; i < len; i++) {
                    objs[i].showRange(HD.SHOW_RANGE);
                }
            };

            showRanges(this._towersLayer);
            showRanges(this._monsterLayer);
            showRanges(this._bulletLayer);

        }, this);
        menuShowRange.setFontSize(14);
        menuShowRange.setPosition(cc.pAdd(menuMonsterGreen.getPosition(), cc.p(-100, 5)));

        var menuSound = cc.MenuItemFont.create("Sound", function () {
            HD.SOUND = !HD.SOUND;
        });
        menuSound.setFontSize(14);
        menuSound.setPosition(cc.pAdd(menuMonsterGreen.getPosition(), cc.p(-100 * 2, 5)));

        var menu = cc.Menu.create(
            menuMonsterGreen,
            menuMonsterPurple,
            menuMonsterOrange,
            menuShowRange,
            menuSound
        );

        toolLayer.addChild(menu);
    },

    initScore:function () {
        // score
        this._lbScore = cc.LabelTTF.create("Score: 0", "Arial", 18);
        this._lbScore.setAnchorPoint(cc.p(1, 0));
        this._lbScore.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(this._lbScore, 100);
        this._lbScore.setPosition(this._winSize.width - 20, this._winSize.height - 30);
    },


    addHighBullet:function (bullet) {
        if (!this._bulletLayer) {
            this._bulletLayer = cc.Layer.create();
            this._bulletLayer.setPosition(cc.p(0, 0));
            this.addChild(this._bulletLayer);
        }
        bullet.showRange(HD.SHOW_RANGE);
        this._bulletLayer.addChild(bullet);
    },
    addMonster:function (monster) {
        if (!this._monsterLayer) {
            this._monsterLayer = cc.Layer.create();
            this.addChild(this._monsterLayer);
        }

        this._monsterLayer.addChild(monster, 1);

        var array = this._maps.getWayPositions();
        var action1 = cc.CardinalSplineTo.create(20, array, 0);
        var remove = cc.CallFunc.create(function () {
            if (HD.SOUND) {
                cc.AudioEngine.getInstance().playEffect(s_MonsterAcross_mp3);
            }

            cc.Director.getInstance().replaceScene(new GameOverScene(false));

            this.removeFromParent();
        }, monster);
        monster.showRange(HD.SHOW_RANGE);

        monster.getSprite().runAction(cc.Sequence.create(action1, remove));
    },
    checkTowerLocation:function (position) {
        var point = this._maps.getPointByLocation(position);
        // check way point
        var isWayPoint = this._maps.checkPointIsWayPoint(point);
        if (isWayPoint)
            return null;
        var location = this._maps.getPositionByPoint(point);
        // check tower point
        var towers = this._towersLayer.getChildren();
        for (var i = 0, iLen = towers.length; i < iLen; i++) {
            var tower = towers[i];
            if (cc.pointEqualToPoint(tower.getPosition(), location)) {
                return null;
            }
        }
        return location;
    },
    update:function (dt) {
        if (!this._towersLayer ||
            !this._monsterLayer)
            return;

        // low bullet check
        var monsters = this._monsterLayer.getChildren();
        var towers = this._towersLayer.getChildren();
        if (!monsters || !towers) return;

        this._quad.clear();
        for (var i = 0; i < monsters.length; i++) {
            this._quad.insert(monsters[i]);
        }

        for (var i = 0, iLen = towers.length; i < iLen; i++) {
            var tower = towers[i];
            var list = [];
            this._quad.retrieve(list, tower);
            // cc.log("length:" + list.length);
            for (var j = 0, jLen = list.length; j < jLen; j++) {
                towers[i].checkAttack(list[j]);
            }
        }

        // // high bullet check
        if (!this._bulletLayer)
            return;
        var bullets = this._bulletLayer.getChildren();
        if (!bullets) return;
        for (var i = 0, iLen = bullets.length; i < iLen; i++) {
            var highBullet = bullets[i];
            var list = [];
            this._quad.retrieve(list, highBullet);
            for (var j = 0, jLen = list.length; j < jLen; j++) {
                highBullet.checkAttack(list[j]);
            }
        }
        // cc.log("end update:" + bullets.length);
        this.updateUI();

        if (HD.SCORE >= 2000) {
            cc.Director.getInstance().replaceScene(new GameOverScene(true));
        }
    },

    updateUI:function () {
        this._lbScore.setString("Score: " + HD.SCORE);
    },

    autoAddMonster:function () {
        var value = Math.random() * 3;
        if (value > 2)
            this.addMonster(Monster.createPurple());
        else if (value > 1)
            this.addMonster(Monster.createGreen());
        else
            this.addMonster(Monster.createOrange());
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});


var HD = HD || {};
HD.SOUND = true;
HD.SHOW_RANGE = false;
HD.SCORE = 0;

