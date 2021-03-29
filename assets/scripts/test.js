// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var rd = 0
var rc = 0
const cr = 10
let Sprite = cc.Class({
    name: 'hucker',
    huck: function () {
        cc.log('i wanna huck u & would u let me huck?')
    }
})
let SpriteSon = cc.Class({
    extends: Sprite,
})

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
        // height: 22,
        // type: 'hucker',
        // isdie: false,
        // target: cc.Node,
        // anyf: [],
        // intss: [cc.Integer],
        // score: {
        //     default: 0,
        //     displayName: '分数',
        //     tooltip: 'qwq',
        //     //type: cc.Node,
        //     //visible: false,
        // }
        reverse: false,
        ymax: 450, //不减速边界(超过了就减速返回)
        ymin: 150,
        xmax: 750,
        xmin: 150,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    onEnable() {
        var x = 1

    },

    start() {
    },

    update(dt) {
        var nw = Math.floor(Math.random() * 2)
        if (Math.random() > 0.5) nw = -nw;
        if (this.node.x > this.xmax && nw > 0) rd += -nw;
        else if (this.node.x < this.xmin && nw < 0) rd += -nw;
        else rd += nw;
        this.node.x += rd

        var nw2 = Math.floor(Math.random() * 2)
        if (Math.random() > 0.5) nw2 = -nw2;
        if (this.node.y > this.ymax && nw2 > 0) rc += -nw2;
        else if (this.node.y < this.xmin && nw2 < 0) rc += -nw2;
        else rc += nw2
        this.node.y += rc

        if (Math.abs(rc) > cr) rc = cr * rc / Math.abs(rc)
        if (Math.abs(rd) > cr) rd = cr * rd / Math.abs(rd)

        this.node.rotation += 8
    },

    lateUpdate(dt) {
    },

    onDisable() {
    },

    onDestroy() {
    },

});
