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
        ctn: 0,
        ctni: false, //正在点击
        //state: 0,//0正在移动，1正在伪装
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('touchstart', this.onTouchStart, this);
        // this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);

        this.m_hiding = this.node.children[0]
        this.m_unhiding = this.node.children[1]

        this.player = cc.find('Canvas/mapbg/map/self')
        this.player_js = this.player.getComponent('player_self')

        this.joystick = cc.find('Canvas/joystick')
        this.joystick_js = this.joystick.getComponent('joystick')
    },

    start() {

    },

    onDestroy() {
        this.node.off('touchstart', this.onTouchStart, this);
        // this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event) {
        this.ctni = true
    },

    onTouchMove(event) {

    },

    onTouchEnd(event) {
        this.ctni = false
        this.ctn = 0
        if (this.player_js.stateMotion == 0) {
            this.m_hiding.scaleY = 0
            this.m_unhiding.scaleY = 0
        } else if (this.player_js.stateMotion == 1) {
            this.m_hiding.scaleY = 1
            this.m_unhiding.scaleY = 0
        }
        this.joystick_js.ban = false
    },

    onTouchCancel(event) {

    },

    update(dt) {
        if (this.ctni) {
            this.ctn += 1000.0 / 60
            this.joystick_js.ban = true
            if (this.player_js.stateMotion == 0) {
                this.m_hiding.scaleY = this.ctn / this.player_js.hiding_yz
                if (this.ctn >= this.player_js.hiding_yz) {
                    this.player_js.stateMotion = 1
                    this.player_js.cancel_select_tp()
                    // this.player.spriteFrame = 
                    //cc.log('qwq')
                    let thee = this
                    cc.loader.loadRes("player/player_hiding", cc.SpriteFrame, function (err, spriteFrame) {
                        let sp = thee.player.getComponent(cc.Sprite)
                        sp.spriteFrame = spriteFrame
                    })
                    this.ctni = false
                    this.ctn = 0
                    // this.player_js.coli.size.width = this.player.width
                    // this.player_js.coli.size.height = this.player.height
                    this.player_js.colis.radius = this.player_js.hiding_cr
                }
            } else if (this.player_js.stateMotion == 1) {
                this.m_unhiding.scaleY = this.ctn / this.player_js.unhiding_yz
                if (this.ctn >= this.player_js.unhiding_yz) {
                    this.player_js.stateMotion = 0
                    // this.player_js.hp_image()
                    // let thee = this
                    // cc.loader.loadRes("player/player", cc.SpriteFrame, function (err, spriteFrame) {
                    //     let sp = thee.player.getComponent(cc.Sprite)
                    //     sp.spriteFrame = spriteFrame
                    // })
                    this.ctni = false
                    this.ctn = 0
                    this.player_js.delta_hp(0)
                }
            }
        }
    },
});
