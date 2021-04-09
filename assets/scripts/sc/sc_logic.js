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
            default: new cc.Rect(),
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

        item_foundDown: {
            default: [],
            type: [cc.Rect],
        },

        item_foundDown_catched: {
            default: [],
            type: [cc.Boolean],
        },

        item_tp: {
            default: [],
            type: [cc.Rect],
        },

        item_tp_catched: {
            default: [],
            type: [cc.Boolean],
        },

        limTime: 180, //180每关(大概)
        leftTime: 180,
        timing: true,//是否正在计时
        levelInfo: '第零关-测试关卡',
        waitTime: 20,//ms,刷新频率
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
        this.mp = cc.find('Canvas/mapbg/map')
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
                node.name = "walls" + String(i)
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
                // node.setSiblingIndex(100 + i)
                // cc.log('qwq?', i)
            })
        }

        var item_foundDown = this.item_foundDown
        for (let i = 0; i < this.item_foundDown.length; ++i) {
            cc.loader.loadRes('level/item_foundDown', cc.SpriteFrame, function (err, spriteFrame) {
                let node = new cc.Node('sprite')
                let sp = node.addComponent(cc.Sprite)
                sp.spriteFrame = spriteFrame
                node.parent = mp
                node.active = false
                node.group = 'sc2'
                node.active = true
                node.width = item_foundDown[i].width
                node.height = item_foundDown[i].height
                node.x = item_foundDown[i].x
                node.y = item_foundDown[i].y
                node.name = 'item_foundDown' + String(i)
            })
        }
        // cc.log('???????????????????????')

        var item_tp = this.item_tp
        for (let i = 0; i < item_tp.length; ++i) {
            // cc.log('fuc lj')
            cc.loader.loadRes('level/item_tp', cc.SpriteFrame, function (err, spriteFrame) {
                let node = new cc.Node('sprite')
                let sp = node.addComponent(cc.Sprite)
                sp.spriteFrame = spriteFrame
                node.parent = mp
                node.active = false
                node.group = 'sc2'
                node.active = true
                node.width = item_tp[i].width
                node.height = item_tp[i].height
                node.x = item_tp[i].x
                node.y = item_tp[i].y
                node.name = 'item_tp' + String(i)
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
            node.name = "ac"
        })

        for (let i = 0; i < this.item_hp.length; ++i) {
            this.item_hp_catched[i] = false
        }
        for (let i = 0; i < this.item_foundDown.length; ++i) {
            this.item_foundDown_catched[i] = false
        }
        for (let i = 0; i < this.item_tp.length; ++i) {
            this.item_tp_catched[i] = false
        }

        // this.node.on('touchstart', this.onTouchStart, this) //调试用

        //var phm = cc.director.getPhysicsManager();
        //phm.enabled = true;
        //phm.gravity = cc.v2(0, 0);
        this.selfn = cc.find('Canvas/mapbg/map/self')
        this.selfj = this.selfn.getComponent('player_self')

        this.leftTime = this.limTime
        this.timing = true

        this.label_levelinfo = cc.find('player_board/label_levelinfo')
        this.label_levelinfo_label = this.label_levelinfo.getComponent(cc.Label)
        this.label_levelinfo_label.string = this.levelInfo

        this.label_newinfo = cc.find('player_board/label_newInfo')
        this.label_newinfo_label = this.label_newinfo.getComponent(cc.Label)
        this.label_newinfo_label.string = ''

        setTimeout(this.delay_todo, this.waitTime)
        // setTimeout(this.playerinit(), this.waitTime)
        this.playerinit()
        // cc.log('qwqqq?')

    },

    delay_todo() {
        this.hidebutt = cc.find('Canvas/hides')
        this.hidebutt_js = this.hidebutt.getComponent('hidebutton')
        this.hidebutt_js.ctn = 0
        this.hidebutt_js.ctni = false
        this.hidebutt_js.m_hiding.scaleY = 0
        this.hidebutt_js.m_unhiding.scaleY = 0

    },

    playerinit() {
        // cc.log('?????????????')
        this.selfj.init()
        // this.selfj.hp = this.selfj.fullhp
        // this.selfj.delta_hp(0)

        // this.selfj.stateMotion = 0
        // this.selfj.item_foundDown = false
    },

    destroyAllDpNodes() {  //删除所有动态创建的点
        for (let i = 0; i < this.walls.length; ++i) {
            let tnode = this.mp.getChildByName('walls' + String(i))
            // cc.log('walls', i, tnode)
            if (tnode == null) {
                continue
            }
            tnode.active = false
            tnode.destroy()
        }

        for (let i = 0; i < this.item_hp.length; ++i) {
            let tnode = this.mp.getChildByName('item_hp' + String(i))
            // cc.log('item_hp', i, tnode)
            if (tnode == null) {
                continue
            }
            tnode.active = false
            tnode.destroy()
        }

        for (let i = 0; i < this.item_foundDown.length; ++i) {
            let tnode = this.mp.getChildByName('item_foundDown' + String(i))
            // cc.log('item_foundDown', i, tnode)
            if (tnode == null) {
                continue
            }
            tnode.active = false
            tnode.destroy()
        }

        for (let i = 0; i < this.item_tp.length; ++i) {
            let tnode = this.mp.getChildByName('item_tp' + String(i))
            // cc.log('item_foundDown', i, tnode)
            if (tnode == null) {
                continue
            }
            tnode.active = false
            tnode.destroy()
        }

        // let tnode = this.selfn.getChildByName('tp_circle')
        this.selfj.cancel_select_tp()
    },

    start() {

    },

    update(dt) {
        //调试：
        // this.selfj.hp += Math.random() * 5 - 2.5
        // if (this.selfj.hp > 100) this.selfj.hp = 100
        // else if (this.selfj.hp < 0) this.selfj.hp = 0
        if (this.timing) {
            this.leftTime -= 1.0 / 60.0
        }
        if (this.leftTime <= 0) {
            this.leftTime = 0
            this.timing = false
            this.gameover()
        }
        // cc.log(this.leftTime)
    },
});
