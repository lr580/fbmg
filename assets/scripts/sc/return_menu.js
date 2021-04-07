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
        waitTime: 20,//等待重载缓冲时间(ms)
    },

    // LIFE-CYCLE CALLBACKS:

    click_return(event, customEventData) {
        var jstk = cc.find('Canvas/joystick')
        var jstk_js = jstk.getComponent('joystick')
        jstk_js.ban = false
        jstk_js.dir = cc.Vec2()

        var jstko = cc.find('Canvas/joystick/fingerPos')
        jstko.x = 0
        jstko.y = 0

        var father = cc.find('ac_board')
        var father_js = father.getComponent('ac_board')
        //father_js.
        father.active = false

        var player = cc.find('Canvas/mapbg/map/self')
        player.x = 0
        player.y = 0

        cc.director.resume()

        var sc = cc.find('Canvas')
        var sc_js = sc.getComponent('sc_logic')
        sc_js.gameinit()

        setTimeout(cc.director.loadScene('menu'), this.waitTime)

        // cc.director.loadScene('menu')
        // cc.game.restart()
        //cc.director.resume()
        //cc.director.loadScene('menu')
    },

    return_menu(event, customEventData) {
        // cc.log('die')
        var jstk = cc.find('Canvas/joystick')
        var jstk_js = jstk.getComponent('joystick')
        jstk_js.ban = false
        jstk_js.dir = cc.Vec2()

        var jstko = cc.find('Canvas/joystick/fingerPos')
        jstko.x = 0
        jstko.y = 0

        var father = cc.find(customEventData)
        var father_js = father.getComponent(customEventData)

        father.active = false

        var player = cc.find('Canvas/mapbg/map/self')
        player.x = 0
        player.y = 0

        cc.director.resume()

        var sc = cc.find('Canvas')
        var sc_js = sc.getComponent('sc_logic')
        sc_js.gameinit()

        setTimeout(cc.director.loadScene('menu'), this.waitTime)
    },

    sc_resume(customEventData) {
        var jstk = cc.find('Canvas/joystick')
        var jstk_js = jstk.getComponent('joystick')
        jstk_js.ban = false
        jstk_js.dir = cc.Vec2()

        var jstko = cc.find('Canvas/joystick/fingerPos')
        jstko.x = 0
        jstko.y = 0

        var father = cc.find(customEventData)
        var father_js = father.getComponent(customEventData)

        father.active = false

        var player = cc.find('Canvas/mapbg/map/self')
        player.x = 0
        player.y = 0

        cc.director.resume()

        var sc = cc.find('Canvas')
        var sc_js = sc.getComponent('sc_logic')
        sc_js.gameinit()
    },

    retry(event, customEventData) {
        this.sc_resume(customEventData)
    },

    onLoad() {

    },

    start() {

    },

    // update (dt) {},
});
