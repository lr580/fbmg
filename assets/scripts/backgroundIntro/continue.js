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

    onLoad () {
        this.node.on("mousedown",this.continue,this);
        // var faO = cc.fadeOut(2);//2秒淡出this.node.runAction(faO);
        // var faI = cc.fadeIn(2);//2秒淡入
        // this.node.opacity = 0;//调节透明度
        // this.node.runAction(faI);
        // var faTo = cc.fadeTo(1, 128);
        // this.node.runAction(faTo);

    },

    start() {
        
    },

    continue(){
        // let node = cc.find("Canvas/content");
        // console.log(node.lable);
        // var faO = cc.fadeOut(2);//2秒淡出this.node.runAction(faO);
        // this.node.opacity = 66;//调节透明度
        // var faTo = cc.fadeTo(1, 128);
        // this.node.runAction(faTo);
        cc.director.loadScene('menu');
    }
    // clickEvent(event, customEventData) {
    //     cc.director.loadScene('menu');
    // },

    // update (dt) {},
});
