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

        finishArea: {
            default: null,
            type: cc.Rect,
        },

        item_hp: {
            default: [],
            type: [cc.Rect],
        },

        item_hp_catched: {
            default: [],
            type: [cc.Boolean],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameinit()
    },

    onTouchStart(event) {
        // let pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // cc.log('qwq', pos.x, pos.y)
        // let sel = cc.find('Canvas/mapbg/map/self')
        // cc.log(sel.x, sel.y, sel.width, sel.height)
        // var cv = cc.find('Canvas')
        // var cvcp = cv.getComponent('sc_logic')
        // var walls = cvcp.walls
        // for (let i = 0; i < walls.length; ++i) {
        //     cc.log(walls[i].x, walls[i].y, walls[i].width, walls[i].height)
        // }
    },

    gameover() {
        // cc.log('you die')
        var cv = cc.find('wa_board')
        cv.active = true
        var joy = cc.find('Canvas/joystick')
        var joy_js = joy.getComponent('joystick')
        joy_js.ban = true
        cc.director.pause()
    },

    gameinit() {
        var manager = cc.director.getCollisionManager(); //

        manager.enabled = true; // 开启碰撞

        manager.enabledDebugDraw = true; // 允许绘制碰撞的区域

        var walls = this.walls

        var mp = cc.find('Canvas/mapbg/map')
        //cc.log(mp)
        var thee = this
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
                // node.setContentSize(walls[i].width, walls[i].height)
                node.width = walls[i].width
                node.height = walls[i].height
                node.x = walls[i].x
                node.y = walls[i].y
                // let posr = cc.Vec2(walls[i].x + walls[i].width / 2, walls[i].y + walls[i].height / 2)
                // let posa = mp.convertToNodeSpaceAR(posr)
                // node.setPosition(posa.x, posa.y)
                // node.setPosition(walls[i].x - walls[i].width / 2, walls[i].y - walls[i].height / 2)
                // node.setPosition(walls[i].x, walls[i].y)
                // node.anchorX = 0
                // node.anchorY = 0
                //cc.log(node.group)
            })
        }

        // cc.log('qwq', this.item_hp[0])
        var item_hp = this.item_hp //this在函数里暴死警告
        for (let i = 0; i < this.item_hp.length; ++i) {
            cc.loader.loadRes('level/item_hp', cc.SpriteFrame, function (err, spriteFrame) {
                let node = new cc.Node('sprite')
                let sp = node.addComponent(cc.Sprite)
                sp.spriteFrame = spriteFrame
                node.parent = mp
                node.active = false
                node.group = 'sc2'
                node.active = true
                // cc.log('qwq?', i)
                node.width = item_hp[i].width
                node.height = item_hp[i].height
                node.x = item_hp[i].x
                node.y = item_hp[i].y
                node.name = 'item_hp' + String(i)
                // cc.log('qwq?', i)
            })
        }

        var acar = this.finishArea
        // cc.log(acar)
        // cc.loader.loadRes("level/ac", cc.spriteFrame, function (err, spriteFrame) {
        //     let node = new cc.Node('sprite')
        //     let sp = node.addComponent(cc.Sprite)
        //     sp.spriteFrame = spriteFrame
        //     node.parent = mp
        //     node.width = acar.width
        //     node.height = acar.height
        //     node.x = acar.x
        //     node.y = acar.y
        //     cc.log("qwq")
        // })
        cc.loader.loadRes("level/ac", cc.SpriteFrame, function (err, spriteFrame) {
            let node = new cc.Node('sprite')
            let sp = node.addComponent(cc.Sprite)
            sp.spriteFrame = spriteFrame
            node.parent = mp
            node.active = false
            node.group = 'sc2'
            node.active = true //no work qwq
            node.width = acar.width
            node.height = acar.height
            node.x = acar.x
            node.y = acar.y
        })

        // this.node.on('touchstart', this.onTouchStart, this) //调试用

        //var phm = cc.director.getPhysicsManager();
        //phm.enabled = true;
        //phm.gravity = cc.v2(0, 0);
        this.selfn = cc.find('Canvas/mapbg/map/self')
        this.selfj = this.selfn.getComponent('player_self')

        this.playerinit()
    },

    playerinit() {
        this.selfj.hp = this.selfj.fullhp
        this.selfj.delta_hp(0)
        for (let i = 0; i < this.item_hp.length; ++i) {
            this.item_hp_catched[i] = false
        }
    },

    start() {

    },

    update(dt) {
        //调试：
        // this.selfj.hp += Math.random() * 5 - 2.5
        // if (this.selfj.hp > 100) this.selfj.hp = 100
        // else if (this.selfj.hp < 0) this.selfj.hp = 0
    },
});
