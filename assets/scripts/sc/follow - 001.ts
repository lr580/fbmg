const { ccclass, property } = cc._decorator;

@ccclass
export default class Follow extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    start() {
        var follow = cc.follow(this.target, cc.rect(0, 0, 2000, 4000));
        this.node.runAction(follow);
    }
}