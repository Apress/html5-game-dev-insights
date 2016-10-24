var GameOverLayer = cc.Layer.extend({


    init:function (win) {
        this._super();
        var backgroudImage = null;
        var titleImage = null;
        var winSize = cc.Director.getInstance().getWinSize();

        if (win) {
            backgroudImage = s_StartBG;
            titleImage = s_Win;
        } else {
            backgroudImage = s_LoseBG;
            titleImage = s_Lose;
        }
        // init background
        var background = cc.Sprite.create(backgroudImage);
        background.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(background, 0);


        // init title
        var title = cc.Sprite.create(titleImage);
        title.setPosition(winSize.width / 2, winSize.height * 3 / 4);
        cc.log(winSize.width / 2);
        cc.log(winSize.height / 2);
        this.addChild(title, 1);

        score = cc.LabelTTF.create("Score:" + HD.SCORE, "Arial", 28);
        score.setAnchorPoint(cc.p(0.5, 0.5));
        score.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(score, 100);
        score.setPosition(winSize.width / 2, winSize.height / 2 + 30);

        // add start button
        var StartItem = cc.MenuItemImage.create(
            s_Start,
            s_StartSelected,
            function () {
                cc.Director.getInstance().replaceScene(new GameScene());
            }, this);
        StartItem.setAnchorPoint(cc.p(0.5, 0.5));

        var menu = cc.Menu.create(StartItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        StartItem.setPosition(winSize.width / 2, winSize.height / 2 - 20);

    }

});

var GameOverScene = cc.Scene.extend({
    ctor:function (win) {
        //cc.log(win)
        this._super();
        var layer = new GameOverLayer();
        layer.init(win);
        this.addChild(layer);
    }
});


