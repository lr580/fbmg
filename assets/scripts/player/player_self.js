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
        beforeX: 0,//已经弃用
        beforeY: 0,//已经弃用

        //以下是变量
        hp: 100,
        stateMotion: 0,//0正在移动，1正在伪装，2伪装中硬直动画状态(未实体化),3去伪装中硬直动画状态(未实体化)
        item_foundDown: false,//是否装备了迷彩道具
        item: {
            default: [],
            type: cc.Integer,
        },
        selecting_tp: false,

        //以下是常量
        fullhp: 100,//满血HP是多少
        maxSpeed: 6.2,
        tMaxSpeed: 6.2,
        hiding_yz: 3000, //伪装所需时长
        unhiding_yz: 1500, //去伪装所需时长
        tHiding_yz: 3000,
        tUnhiding_yz: 1500,
        hurt1_lim: 60, //轻伤界限hp
        hurt2_lim: 30, //重伤界限hp
        normal_cw: 130,//一般碰撞箱宽
        normal_ch: 130,//一般碰撞箱高
        normal_cr: 100,
        hurt1_cw: 165,//轻伤碰撞箱
        hurt1_ch: 165,
        hurt1_cr: 125,
        hurt2_cw: 210,//重伤碰撞箱
        hurt2_ch: 210,
        hurt2_cr: 150,
        hiding_cr: 62,//伪装碰撞箱
        hurt1Speed: 4,
        hurt2Speed: 2.5,
        cures: 40,//吃一次hp道具回多少血
        foundDownRate: 0.9, //迷彩道具降低的发现半径
        // coliRate: [1, 0.75],
        coliRate: {
            default: [],
            type: cc.Float,
        },
        item_tp_d: 600,//道具可tp范围(直径)

        waitTime: 20,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.sclogic = cc.find('Canvas')
        this.sclogic_js = this.sclogic.getComponent('sc_logic')
        this.coli = this.node.getComponent(cc.BoxCollider) //旧方案碰撞箱
        this.colis = this.node.getComponent(cc.CircleCollider) //新方案碰撞箱
        this.coliRate[0] = 1.0
        this.coliRate[1] = this.foundDownRate
        this.delta_hp(0)
        this.node.on('touchstart', this.onTouchStart, this);
        // this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
        // cc.log('coli', this.coli)
        // this.change_hp(80)
    },

    hp_image() {
        if (this.stateMotion != 1) {
            let thee = this
            let img
            if (this.hp < this.hurt2_lim) {
                img = "player/people_hurt2"
            } else if (this.hp < this.hurt1_lim) {
                img = "player/people_hurt1"
            } else {
                img = "player/player"
            }
            cc.loader.loadRes(img, cc.SpriteFrame, function (err, spriteFrame) {
                let sp = thee.node.getComponent(cc.Sprite)
                sp.spriteFrame = spriteFrame
            })
        }
    },

    get_coliRateIndex(item_foundDown) { //后续版本继续完善
        // cc.log(Number(item_foundDown))
        return Number(item_foundDown)
    },

    change_hp(v) {
        this.hp = v
        if (this.hp > this.fullhp) {
            this.hp = this.fullhp
        }
        if (this.hp <= 0) {
            this.hp = 0
            this.sclogic_js.gameover()
        }

        // cc.log(this.coliRate, typeof this.coliRate)
        if (this.stateMotion != 1) {
            // if (this.hp < this.hurt2_lim) {
            //     this.maxSpeed = this.hurt2Speed
            //     this.coli.size.height = this.hurt2_ch
            //     this.coli.size.width = this.hurt2_cw
            // } else if (this.hp < this.hurt1_lim) {
            //     this.maxSpeed = this.hurt1Speed
            //     this.coli.size.height = this.hurt1_ch
            //     this.coli.size.width = this.hurt1_cw
            // } else {
            //     this.maxSpeed = this.tMaxSpeed
            //     this.coli.size.height = this.normal_ch
            //     this.coli.size.width = this.normal_cw
            // }
            // cc.log(this.colis)
            if (this.hp < this.hurt2_lim) {
                this.maxSpeed = this.hurt2Speed
                // this.coli.size.height = this.hurt2_ch * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
                // this.coli.size.width = this.hurt2_cw * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
                this.colis.radius = this.hurt2_cr * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
            } else if (this.hp < this.hurt1_lim) {
                this.maxSpeed = this.hurt1Speed
                // this.coli.size.height = this.hurt1_ch * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
                // this.coli.size.width = this.hurt1_cw * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
                this.colis.radius = this.hurt1_cr * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
            } else {
                this.maxSpeed = this.tMaxSpeed
                // this.coli.size.height = this.normal_ch * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
                // this.coli.size.width = this.normal_cw * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
                this.colis.radius = this.normal_cr * this.coliRate[this.get_coliRateIndex(this.item_foundDown)]
            }
            // cc.log('???')
        }
        this.hp_image()
        // cc.log('???????')
    },

    delta_hp(v) {
        let dt = this.hp + v
        this.change_hp(dt)
    },

    get_hp() {
        this.delta_hp(this.cures)
    },

    catch_hp() {
        let idx = this.item_getFullIndex()
        this.item[idx] = 1
        this.item_paint(idx)
        // cc.log(idx)
    },

    catch_tp() {
        let idx = this.item_getFullIndex()
        this.item[idx] = 4
        this.item_paint(idx)
    },

    select_tp(idx) {
        if (this.stateMotion == 1) {
            this.labelnewinfo_js.broadcast('伪装状态下无法使用跃迁！')
            return
        }
        this.selecting_tp = idx + 1
        this.labelnewinfo_js.broadcast('请点击选择要跃迁到的区域。')
        var fa = this.node
        var thee = this
        cc.loader.loadRes('texture/3/parts/013', cc.SpriteFrame, function (err, spriteFrame) {
            let node = new cc.Node('sprite')
            let sp = node.addComponent(cc.Sprite)
            // let js = node.addComponent()
            sp.spriteFrame = spriteFrame
            node.parent = fa
            node.active = false
            node.group = 'sc2'
            node.active = true
            node.width = thee.item_tp_d
            node.height = thee.item_tp_d
            node.name = 'tp_circle'
            node.opacity = 125
        })
    },

    cancel_select_tp() {
        this.selecting_tp = false
        let tnode = this.node.getChildByName('tp_circle')
        if (tnode == null) {
            return
        }
        tnode.active = false
        tnode.destroy()
        this.labelnewinfo_js.broadcast_cancel()
    },

    do_tp(tgx, tgy) {
        this.node.x = tgx
        this.node.y = tgy
        let idx = this.selecting_tp - 1
        this.item[idx] = 0
        this.item_paint(idx)
        this.cancel_select_tp()
    },

    item_isfull() {
        return this.item[0] != 0 && this.item[1] != 0
    },

    item_getFullIndex() {
        if (this.item[0] == 0) {
            return 0
        } else {
            return 1
        }
    },

    item_paint(idx) {
        let img = 'level/item_none'
        if (this.item[idx] == 1) {
            img = 'level/item_hp'
        } else if (this.item[idx] == 4) {
            img = 'level/item_tp'
        }
        cc.loader.loadRes(img, cc.SpriteFrame, function (spr, spriteFrame) {
            let nodename = 'item' + String(idx)
            let tnode = cc.find(nodename)
            let tnodesp = tnode.getComponent(cc.Sprite)
            tnodesp.spriteFrame = spriteFrame
        })
    },

    item_use(idx) {
        // cc.log(idx)
        let item_idx = this.item[idx]
        if (item_idx == 0) {
            return
        } else if (item_idx == 1) {
            if (this.hp >= this.fullhp) {
                this.labelnewinfo_js.broadcast('满血状态无法使用血包！')
                return
            }
            this.item[idx] = 0
            this.get_hp()
            this.item_paint(idx)
        } else if (item_idx == 4) {
            if (this.selecting_tp) {
                this.cancel_select_tp()
            } else {
                this.select_tp(idx)
            }
        }

    },

    get_foundDown() {
        this.item_foundDown = true
    },

    init() {
        if (this.colis == null) {
            this.colis = this.node.getComponent(cc.CircleCollider)
        }
        // cc.log('???')
        this.hp = this.fullhp
        this.stateMotion = 0
        this.item_foundDown = false
        this.selecting_tp = false
        this.delta_hp(0)
        // setTimeout(this.delta_hp(0), this.waitTime)

        this.item[0] = 0 //0空，1血包，3EMP，4跃迁
        this.item[1] = 0
        this.item_paint(0)
        this.item_paint(1)
        // cc.log(this.item_isfull())
        // this.node.setSiblingIndex(1024)
        this.labelnewinfo = cc.find('player_board/label_newInfo')
        this.labelnewinfo_js = this.labelnewinfo.getComponent('newinfo')
        // cc.log(this.labelnewinfo_js)
        // this.labelnewinfo_label = this.labelnewinfo.getComponent(cc.Label)
    },

    start() {

    },

    onCollisionEnter() {
        this.node.color = cc.Color.RED
    },

    onCollisionExit() {
        this.node.color = cc.Color.WHITE
    },

    onTouchStart(event) {

    },

    onTouchMove(event) {
        // if (this.selecting_tp) {
        //     var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        //     cc.log(pos.x, pos.y)
        // }
    },

    onTouchEnd(event) {

    },

    onTouchCancel(event) {

    },

    update(dt) {
        // this.delta_hp(-0.1)
    },

    onDestroy() {
        this.node.off('touchstart', this.onTouchStart, this);
        // this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },
});
