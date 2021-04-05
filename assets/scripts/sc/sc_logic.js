// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        walls: {
            default: [],
            type: [cc.Rect],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var manager = cc.director.getCollisionManager(); //

        manager.enabled = true; // 开启碰撞

        manager.enabledDebugDraw = true; // 允许绘制碰撞的区域

        var walls = this.walls

        var mp = cc.find('Canvas/mapbg/map')
        //cc.log(mp)

        for (let i = 0; i < walls.length; ++i) {
            //cc.log(walls[i])
            cc.loader.loadRes("level/wall0", cc.SpriteFrame, function (err, spriteFrame) {
                let node = new cc.Node('sprite')
                let sp = node.addComponent(cc.Sprite)
                sp.spriteFrame = spriteFrame
                node.parent = mp
                node.active = false
                node.group = 'sc'
                node.active = true //no work qwq
                node.setContentSize(walls[i].width, walls[i].height)
                node.setPosition(walls[i].x, walls[i].y)
                //cc.log(node.group)
            })
        }

        //var phm = cc.director.getPhysicsManager();
        //phm.enabled = true;
        //phm.gravity = cc.v2(0, 0);
    },

    start() {

    },

    // update (dt) {},
});
