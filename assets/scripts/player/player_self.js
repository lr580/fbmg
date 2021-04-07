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
        hp: 100,
        fullhp: 100,//满血HP是多少
        maxSpeed: 6.2,
        tMaxSpeed: 6.2,
        hiding_yz: 3000, //伪装所需时长
        unhiding_yz: 1500, //去伪装所需时长
        tHiding_yz: 3000,
        tUnhiding_yz: 1500,
        stateMotion: 0,//0正在移动，1正在伪装，2伪装中硬直动画状态(未实体化),3去伪装中硬直动画状态(未实体化)
        hurt1_lim: 60, //轻伤界限hp
        hurt2_lim: 30, //重伤界限hp
        normal_cw: 120,//一般碰撞箱宽
        normal_ch: 120,//一般碰撞箱高
        hurt1_cw: 135,//轻伤碰撞箱
        hurt1_ch: 135,
        hurt2_cw: 155,//重伤碰撞箱
        hurt2_ch: 155,
        hurt1Speed: 4.8,
        hurt2Speed: 3.5,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.sclogic = cc.find('Canvas')
        this.sclogic_js = this.sclogic.getComponent('sc_logic')
        this.coli = this.node.getComponent(cc.BoxCollider)
        // cc.log('coli', this.coli)
        this.change_hp(80)
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

    change_hp(v) {
        this.hp = v
        if (this.hp > this.fullhp) {
            this.hp = this.fullhp
        }
        if (this.hp <= 0) {
            this.hp = 0
            this.sclogic_js.gameover()
        }

        if (this.hp < this.hurt2_lim) {
            this.maxSpeed = this.hurt2Speed
            this.coli.size.height = this.hurt2_ch
            this.coli.size.width = this.hurt2_cw
        } else if (this.hp < this.hurt1_lim) {
            this.maxSpeed = this.hurt1Speed
            this.coli.size.height = this.hurt1_ch
            this.coli.size.width = this.hurt1_cw
        } else {
            this.maxSpeed = this.tMaxSpeed
            this.coli.size.height = this.normal_ch
            this.coli.size.width = this.normal_cw
        }
        this.hp_image()

    },



    delta_hp(v) {
        let dt = this.hp + v
        this.change_hp(dt)
    },

    start() {

    },

    onCollisionEnter() {
        this.node.color = cc.Color.RED
    },

    onCollisionExit() {
        this.node.color = cc.Color.WHITE
    },

    update(dt) {
        this.delta_hp(-0.5)
    },
});
