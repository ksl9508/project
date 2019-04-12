// 去初始化后续要用到的变量

// 设定游戏场景位置
var BASE_X_POINT = 100;
var BASE_Y_POINT = 100;

// 宽度系数和高度系数
var XLEN = 30;
var YLEN = 30;

// 方块宽度
var SQUAREWIDTH = 15;

// 基类
function Square(x, y, width, height, dom) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');

}
Square.prototype.update = function(x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top  = y * SQUAREWIDTH + 'px';
}
Square.prototype.touch = function() {
    console.log('touch')
}

// 地板方块 橙色
var Floor = tool.extends(Square);
// 障碍物 黑色
var Stone = tool.extends(Square);
// 食物 亮蓝色
var Food = tool.single(Square);
// 蛇头 红色
var SnakeHead = tool.single(Square);
// 蛇身 蓝色
var SnakeBody = tool.extends(Square);

// 广场
var Ground = tool.single(Square);

// 蛇
var Snake = tool.single();
// ?
var Game = tool.single();

// 方向枚举
var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
};

// 
var STRATEGYENUM = {
    move: 'MOVE',
    eat: 'EAT',
    die: 'DIE'
}