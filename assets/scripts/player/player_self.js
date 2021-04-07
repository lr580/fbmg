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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onCollisionEnter() {
        this.node.color = cc.Color.RED
    },

    onCollisionExit() {
        this.node.color = cc.Color.WHITE
    }

    // update (dt) {},
});
