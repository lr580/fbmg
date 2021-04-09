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
        info: '',
        ctni: false,//是否正在播报信息
        ctn: 0//剩余播报时间(ms)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.label = this.node.getComponent(cc.Label)
    },

    broadcast(io, ctn = 2000) {
        this.info = io
        this.ctn = ctn
        this.ctni = true
        this.label.string = io
    },

    broadcast_cancel() {
        this.info = ''
        this.label.string = ''
        this.ctn = 0
        this.ctni = false
    },

    start() {
    },

    update(dt) {
        if (this.ctni) {
            this.ctn -= 1000 / 60
            if (this.ctn <= 0) {
                this.ctn = 0
                this.ctni = false
                this.label.string = ''
            }
        }
    },
});
