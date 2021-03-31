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
        fadeMask: {
            default: null,
            type: cc.Prefab,
            tooltip: "渐变遮罩"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 其它 js 调用此脚本的方法, 声明周期函数无效
        // this.fadeMaskNode = cc.instantiate(this.fadeMask);
    },

    /**
     * 渐隐为白色并转场
     * @param {String} nextScene 
     * @param {Number} interval 
     */
    fadeIntoWhite(nextScene, interval) {
        let fadeMaskNode = cc.instantiate(this.fadeMask);
        fadeMaskNode.opacity = 0;
        this.node.addChild(fadeMaskNode);

        this.loadScene(fadeMaskNode, interval, nextScene);

        console.log("fadeIntoWhite");
    },

    /**
     * 当前场景从白色渐显
     * @param {Number} interval 
     */
    fadeFromWhite(interval) {
        let fadeMaskNode = cc.instantiate(this.fadeMask);
        fadeMaskNode.opacity = 255;
        this.node.addChild(fadeMaskNode);

        this.fade(fadeMaskNode, interval);

        console.log("fadeFromWhite");
    },

    /**
     * 附带效果(渐隐或渐显)转场
     * @param {cc.Node} fadeMaskNode Prefab 实例化出的新节点(遮罩节点)
     * @param {Number} interval 
     * @param {String} nextScene 
     */
    loadScene(fadeMaskNode, interval = .3, nextScene = "") {
        if (nextScene) {
            cc.director.preloadScene(nextScene, () => {
                this.fade(fadeMaskNode, interval, () => {
                    cc.director.loadScene(nextScene);
                });
            });
        } else {
            this.fade(fadeMaskNode, interval);
        }
    },

    /**
     * 渐隐渐显效果执行函数
     * @param {cc.Node} fadeMaskNode Prefab 实例化出的新节点(遮罩节点)
     * @param {Number} interval 
     * @param {Function} callback 
     */
    fade(fadeMaskNode, interval = .3, callback = () => {}) {
        // 判断遮罩节点是否为透明, 是则使用渐显动作, 否则为渐隐
        let fadeAction = this.isTransparent(fadeMaskNode) ? cc.fadeIn(interval) : cc.fadeOut(interval);

        fadeMaskNode.runAction(
            cc.sequence(
                fadeAction,
                cc.callFunc(() => callback())
            )
        );
    },

    /**
     * 判断遮罩节点是否透明
     * @param {cc.Node} fadeMaskNode Prefab 实例化出的新节点(遮罩节点)
     * @returns {Boolean}
     */
    isTransparent(fadeMaskNode) {
        // 0 透明 1-255 不透明
        return Boolean(!fadeMaskNode.opacity);
    }
});
