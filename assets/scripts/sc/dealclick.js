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
        this.node.on('touchstart', this.onTouchStart, this);
        // this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
        this.player = cc.find('Canvas/mapbg/map/self')
        this.player_js = this.player.getComponent('player_self')
        this.sc = cc.find('Canvas')
        this.sc_js = this.sc.getComponent('sc_logic')
        this.walls = this.sc_js.walls
        this.labelnewinfo = cc.find('player_board/label_newInfo')
        this.labelnewinfo_js = this.labelnewinfo.getComponent('newinfo')
    },

    get_rec_angle(b) { // b is cc.Rect
        var q = [
            [b.x - b.width / 2, b.y - b.height / 2],
            [b.x + b.width / 2, b.y + b.height / 2],
        ]
        return q
    },

    get_rec_angles(a) {
        var p = [
            [a.x - a.width / 2, a.y - a.height / 2],
            [a.x + a.width / 2, a.y - a.height / 2],
            [a.x - a.width / 2, a.y + a.height / 2],
            [a.x + a.width / 2, a.y + a.height / 2],
        ]
        return p
    },

    get_future_player_angle(tsx, tsy) {
        var p = [
            [tsx - this.player.width / 2, tsy - this.player.height / 2],
            [tsx + this.player.width / 2, tsy + this.player.height / 2],
        ]
        return p
    },

    get_future_player_angles(tsx, tsy) {
        var p = [
            [tsx - this.player.width / 2, tsy - this.player.height / 2],
            [tsx + this.player.width / 2, tsy - this.player.height / 2],
            [tsx - this.player.width / 2, tsy + this.player.height / 2],
            [tsx + this.player.width / 2, tsy + this.player.height / 2],
        ]
        return p
    },

    inwall(tsx, tsy) {
        for (let i = 0; i < this.walls.length; ++i) {
            var rec = this.get_rec_angle(this.walls[i])
            if (tsx >= rec[0][0] && tsy >= rec[0][1] && tsx <= rec[1][0] && tsy <= rec[1][1]) {
                return i //coli in i
            }
        }
        return -1 //not in
    },

    polycoli(x, y) {
        for (let i = 0; i < 4; ++i) {
            if (x[i][0] >= y[0][0] && x[i][0] <= y[3][0] && x[i][1] >= y[0][1] && x[i][1] <= y[3][1]) {
                return i
            }
        }

        let cfx = (x[0][0] + x[3][0]) / 2
        let cfy = (x[0][1] + x[3][1]) / 2
        // cc.log(x, cfx, cfy)
        if (cfx >= y[0][0] && cfx <= y[3][0] && cfy >= y[0][1] && cfy <= y[3][1]) {
            return 5
        }
        return -1
    },

    db_polycoli(x, y) {
        let det = this.polycoli(x, y)
        // cc.log(x, y, det)
        if (det != -1) {
            return det
        }
        let deu = this.polycoli(y, x)
        // cc.log(x, y, deu, 'append')
        return deu
    },

    future_player_inwall(tsx, tsy) {
        var future_player = this.get_future_player_angles(tsx, tsy)
        // cc.log(this.walls)
        // for (let i = 0; i < 4; ++i) {
        for (let i = 0; i < this.walls.length; ++i) {
            // let det = this.inwall(future_player[i][0], future_player[i][1])
            let tempwall = this.get_rec_angles(this.walls[i])
            let det = this.db_polycoli(future_player, tempwall)
            // cc.log(cc.Intersection.)
            if (det != -1) {
                return det
            }
        }
        return -1
        var future_player_half = this.get_future_player_angle(tsx, tsy)
        for (let i = 0; i < 4; ++i) {
            let temp = this.get_rec_angle(this.walls[i])
            let det = this.inwall(temp[0], temp[1])
            if (det) {
                return det
            }
        }
        return -1
    },

    start() {

    },

    onDestroy() {
        this.node.off('touchstart', this.onTouchStart, this);
        // this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event) {

    },

    onTouchMove(event) {
        // if (this.selecting_tp) {
        // var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // cc.log(pos.x, pos.y)
        // }
    },

    onTouchEnd(event) {
        // var pos = this.node.convertToNodeSpaceAR(event.getLocation())
        // cc.log(pos.x, pos.y)
        if (this.player_js.selecting_tp) {
            var pos = this.node.convertToNodeSpaceAR(event.getLocation())
            var clickx = pos.x
            var clicky = pos.y
            var playerx = this.player.x
            var playery = this.player.y
            var d = Math.sqrt((playerx - clickx) * (playerx - clickx) + (playery - clicky) * (playery - clicky))
            if (d < this.player_js.item_tp_d / 2) {
                if (this.future_player_inwall(clickx, clicky) != -1) {
                    this.labelnewinfo_js.broadcast('不能跃迁到这个位置！')
                    return
                }
                this.player_js.do_tp(clickx, clicky)
            }
            // cc.log(d)
        }
    },

    onTouchCancel(event) {

    },



    // update (dt) {},
});
