// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([ cc.SpriteFrame ])
    frames : cc.SpriteFrame[] =new Array();


    sprite : cc.Sprite = null;//sprite组件
    index : number = 0;//当前显示第n张图片
    interval : number = 0.1;//定时器的间隔

    onLoad () {
        this.sprite = this.getComponent(cc.Sprite);
    }

    start () {
        this.schedule(this.onTimer,this.interval);
    }
    onTimer(){
        if(this.frames.length == 0) return;

        
        this.sprite.spriteFrame = this.frames[this.index];
        //下一帧
        this.index ++;
        if(this.index >= this.frames.length)
        this.index = 0;
    }
    onDestroy(){
        this.unschedule(this.onTimer);
    }

    // update (dt) {}
}
