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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('touchstart', this.onTouchStart, this);
        // this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
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
        // if (this.selecting_tp) {
        // var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // cc.log(pos.x, pos.y)
        // }
    },

    onTouchEnd(event) {
        // var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // cc.log(pos.x, pos.y)
        if (this.player_js.selecting_tp) {
            var pos = this.node.convertToNodeSpaceAR(event.getLocation())
            var clickx = pos.x
            var clicky = pos.y
            var playerx = this.player.x
            var playery = this.player.y
            var d = Math.sqrt((playerx - clickx) * (playerx - clickx) + (playery - clicky) * (playery - clicky))
            if (d < this.player_js.item_tp_d / 2) {
                this.player_js.do_tp(clickx, clicky)
            }
            // cc.log(d)
        }
    },

    onTouchCancel(event) {

    },

    // update (dt) {},
});
