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

    },

    onTouchMove(event) {

    },

    onTouchEnd(event) {

    },

    onTouchCancel(event) {

    },

    // update (dt) {},
});
