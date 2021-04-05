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
        control_target: {
            default: null,
            type: cc.Node,
        },

        player: {
            default: null,
            type: cc.Node,
        },

        maxSpeed: 10,
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad() {
        // hide FPS info
        //cc.debug.setDisplayStats(false);

        // get joyStickBtn
        this.joyStickBtn = this.node.children[0];

        //this.player = this.control_target //typedef 

        // touch event
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);

        // Player's move direction
        this.dir = cc.v2(0, 0);
    },

    onDestroy() {
        // touch event
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event) {
        // when touch starts, set joyStickBtn's position 
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.joyStickBtn.setPosition(pos);
        this.onTouchMove(event)
    },

    onTouchMove(event) {
        // constantly change joyStickBtn's position
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));

        // get direction
        this.dir = this.joyStickBtn.position.normalize();
    },

    onTouchEnd(event) {
        // reset
        this.joyStickBtn.setPosition(cc.v2(0, 0));
    },

    onTouchCancel(event) {
        // reset
        this.joyStickBtn.setPosition(cc.v2(0, 0));
    },

    start() {

    },

    // update (dt) {},
    update(dt) {
        // get ratio
        let len = this.joyStickBtn.position.mag();
        let maxLen = this.node.width / 2;
        let ratio = len / maxLen;
        //cc.log(ratio)
        //cc.log(this.dir.x)

        // restrict joyStickBtn inside the joyStickPanel
        if (ratio > 1) {
            this.joyStickBtn.setPosition(this.joyStickBtn.position.div(ratio));
        }

        // move Player

        let dis = this.dir.mul(this.maxSpeed * ratio);
        this.player.setPosition(this.player.position.add(dis));


        // restrict Player inside the Canvas
        if (this.player.x > this.player.parent.width / 2 - this.player.width / 2)
            this.player.x = this.player.parent.width / 2 - this.player.width / 2;
        else if (this.player.x < -this.player.parent.width / 2 + this.player.width / 2)
            this.player.x = -this.player.parent.width / 2 + this.player.width / 2;

        if (this.player.y > this.player.parent.height / 2 - this.player.height / 2)
            this.player.y = this.player.parent.height / 2 - this.player.height / 2;
        else if (this.player.y < -this.player.parent.height / 2 + this.player.height / 2)
            this.player.y = -this.player.parent.height / 2 + this.player.height / 2;
        // console.log(this.player.x, this.player.y)
    },
});
