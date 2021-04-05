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

        this.player.fuckingshit = this.player.getComponent(cc.RigidBody)
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
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.joyStickBtn.setPosition(pos);
        this.onTouchMove(event)
    },

    onTouchMove(event) {
        // constantly change joyStickBtn's position
        var posDelta = event.getDelta();
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
        var len = this.joyStickBtn.position.mag();
        var maxLen = this.node.width / 2;
        var ratio = len / maxLen;
        //cc.log(ratio)
        //cc.log(this.dir.x)

        // restrict joyStickBtn inside the joyStickPanel
        if (ratio > 1) {
            this.joyStickBtn.setPosition(this.joyStickBtn.position.div(ratio));
        }

        var px = this.player.x
        var py = this.player.y
        var pw = this.player.width
        var ph = this.player.height
        var ckcoli = this.checkcoli()
        if (!ckcoli) return

        // move Player

        var dis = this.dir.mul(this.maxSpeed * ratio * 40);

        // this.player.rbd = this.player.getComponent(cc.RigidBody)
        // var rb = this.player.rbd
        // rb.linearVelocity.x = dis.x
        // rb.linearVelocity.y = dis.y
        // this.player.rbd = rb
        this.player.fuckingshit.linearVelocity = dis

        // cc.log(rb.linearVelocity.x, rb.linearVelocity.y, dis.x, dis.y)
        // this.player.setPosition(this.player.position.add(dis));


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

    polycoli(a, b) {
        // var p = [
        //     [a.x, a.y],
        //     [a.x + a.width, a.y],
        //     [a.x, a.y + a.height],
        //     [a.x + a.width, a.y + a.height],
        // ]
        var p = [
            [a.x - a.width / 2, a.y - a.height / 2],
            [a.x + a.width / 2, a.y - a.height / 2],
            [a.x - a.width / 2, a.y + a.height / 2],
            [a.x + a.width / 2, a.y + a.height / 2],
        ]
        // var q = [
        //     [b.x, b.y],
        //     [b.x + b.width, b.y + b.height],
        // ]
        var q = [
            [b.x - b.width / 2, b.y - b.height / 2],
            [b.x + b.width / 2, b.y + b.height / 2],
        ]
        // for (let i = 0; i < 4; ++i) cc.log(p[i])
        // cc.log(q[0])
        // cc.log(q[1])
        for (let i = 0; i < 4; ++i) {
            if (p[i][0] >= q[0][0] && p[i][1] >= q[0][1] && p[i][0] <= q[1][0] && p[i][1] <= q[1][1]) {
                return true;
            }
        }
        return false;
    },

    checkcoli() {
        var len = this.joyStickBtn.position.mag();
        var maxLen = this.node.width / 2;
        var ratio = len / maxLen;
        var px = this.player.x
        var py = this.player.y
        var pw = this.player.width
        var ph = this.player.height
        // var nowrect = cc.rect(px - pw / 2, py - ph / 2, pw, ph)
        var nowrect = cc.rect(px, py, pw, ph)
        var dis = this.dir.mul(this.maxSpeed * ratio);
        var dx = dis.x
        var dy = dis.y
        var futurerect = cc.rect(nowrect.x + dx, nowrect.y + dy, pw, ph)
        var futurerect_x = cc.rect(nowrect.x, nowrect.y + dy, pw, ph)
        var futurerect_y = cc.rect(nowrect.x + dx, nowrect.y, pw, ph)

        var cv = cc.find('Canvas')
        var cvcp = cv.getComponent('sc_logic - 001')
        var walls = cvcp.walls

        for (let i = 0; i < walls.length; ++i) {
            //cc.log(futurerect, walls[i])
            if (this.polycoli(futurerect, walls[i])) {
                //cc.log('qwq')
                return false
            }
            // cc.log(walls[i], futurerect)
            // if (cc.Intersection.polygonPolygon(futurerect, walls[i])) {
            //     cc.log('qwq')
            //     return false
            // }
        }
        return true

        //cc.log(walls)
        //cc.log('wtf', nowrect, futurerect)
    },
});