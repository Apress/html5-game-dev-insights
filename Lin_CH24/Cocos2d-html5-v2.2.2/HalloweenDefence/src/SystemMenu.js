var SystemMenuLayer = cc.Layer.extend({


    init:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        // init background
        var background = cc.Sprite.create(s_StartBG);
        background.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(background, 0);


        // init title
        var title = cc.Sprite.create(s_HalloweenDefence);
        title.setPosition(winSize.width / 2, winSize.height * 3 / 4);
        //cc.log(winSize.width/2);
        //cc.log(winSize.height/2);
        this.addChild(title, 1);

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

var SystemMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SystemMenuLayer();
        layer.init();
        this.addChild(layer);
    }
});


