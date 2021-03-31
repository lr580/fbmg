项目内变量等的说明：

# assets

## resources

### level

### temp

## scenes

1. menu 主界面(当前默认开始场景)
   1. global 节点(常驻节点，存储各种全局变量)
2. temp 用于临时测试各种事情专用的场景
3. nowLevel 现在正在玩的关卡场景

## scripts

> - test.js 临时js（一个布朗运动脚本），可以忽略

### menu

- gameStart 开始游戏按钮脚本
- global 全局变量脚本

### player

- player_self 玩家对象脚本

### sc

- joystick 四方向摇杆脚本
- pause_button 暂停按钮

# 全局变量

存放在menu场景的节点global内。

# 项目配置

## 分组

- default
- player 玩家
- enemy 敌人
- sc 场景(如墙)

碰撞配对：

- player-enemy
- player-sc
- enemy-sc