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
        this.shit = 100
        this.RigidBody = this.getComponent(cc.RigidBody)
        var fuck = this.RigidBody
        fuck.linearVelocity.x = this.shit
        this.RigidBody = fuck
    },

    start() {

    },

    update(dt) {
        if (this.node.x > 200) {
            // this.RigidBody = this.getComponent(cc.RigidBody)
            // var fuck = this.RigidBody
            // fuck.linearVelocity.y += 1
            // this.RigidBody = fuck
            // cc.log('hell')
            this.RigidBody.linearVelocity = cc.Vec2(-100, 0);
        } else if (this.node.x < 0) {
            // this.RigidBody = this.getComponent(cc.RigidBody)
            // var fuck = this.RigidBody
            // fuck.linearVelocity.x = this.shit
            // this.RigidBody = fuck
            this.RigidBody.linearVelocity = cc.Vec2(100, 0);
        }
        cc.log('qqqqq', this.node.x)
    },
});
