require("jsb.js");
require("src/GameMaps.js");
require("src/Monster.js");
require("src/resource.js");
require("src/Tower.js");
require("src/GameLayer.js");
require("src/Quadtree.js");
require("src/SystemMenu.js");
require("src/GameOver.js");

// main entry
try {
    director = cc.Director.getInstance();
    director.runWithScene(new GameScene());
    cc.EGLView.getInstance().setDesignResolutionSize(480, 318, cc.RESOLUTION_POLICY.SHOW_ALL);

} catch (e) {
    log(e);
}
