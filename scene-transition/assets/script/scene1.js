// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 渐显(和场景2的 渐隐 组合成过渡效果)
        this.node.getComponent("fade").fadeFromWhite(.5);

        // 渐隐(与场景2的 渐显 组合成过渡效果)
        this.text.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.getComponent("fade").fadeIntoWhite("scene2", .5);
        });
    }
});
