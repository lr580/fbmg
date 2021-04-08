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
        item_idx: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('touchstart', this.onTouchStart, this)
        this.node.on('touchmove', this.onTouchMove, this)
        this.node.on('touchend', this.onTouchEnd, this)
        this.node.on('touchcancel', this.onTouchCancel, this)
        this.player = cc.find('Canvas/mapbg/map/self')
        this.player_js = this.player.getComponent('player_self')
    },

    onDestroy() {
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event) {
        // var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // cc.log()
    },

    onTouchMove(event) {
        // var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // var posDelta = event.getDelta()
    },

    onTouchEnd(event) { //只有在按钮内松开才有效
        // var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // cc.log(pos.x, pos.y)
        this.player_js.item_use(this.item_idx)
    },

    onTouchCancel(event) {

    },

    start() {

    },

    // update (dt) {},
});
