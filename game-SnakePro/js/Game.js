var oGame = new Game();
oGame.timer = null;
oGame.interval = 400;
oGame.score = 0;

oGame.init = function () {
    oGround.init();
    oSnake.init(oGround);
    createFood(oGround, oSnake);
    // 
    document.onkeydown = function (e) {
        console.log(e.which)
        if (e.which == 37 && oSnake.direction != DIRECTIONENUM.RIGHT) {
            oSnake.direction = DIRECTIONENUM.LEFT
        } else if (e.which == 38 && oSnake.direction != DIRECTIONENUM.DOWN) {
            oSnake.direction = DIRECTIONENUM.UP
        } else if (e.which == 39 && oSnake.direction != DIRECTIONENUM.LEFT) {
            oSnake.direction = DIRECTIONENUM.RIGHT
        } else if (e.which == 40 && oSnake.direction != DIRECTIONENUM.UP) {
            oSnake.direction = DIRECTIONENUM.DOWN
        }
    }
}

oGame.start = function () {
    clearInterval(oGame.timer);
    oGame.timer = setInterval(function () {
        oSnake.move(oGround)
    }, oGame.interval);
}

oGame.over = function () {
    clearInterval(oGame.timer);
}

oGame.init();
oGame.start();


function createFood(oGround, snake) {
    var x, y, flag = true;
    while (flag) {
        x = 1 + Math.floor( Math.random() * (XLEN - 2) );
        y = 1 + Math.floor( Math.random() * (YLEN - 2) );
        var node = snake.head;
        var isOKNum = true;
        while (node) {
            if (node.x == x && node.y == y) {
                isOKNum = false;
                break;
            }
            node = node.next;
        }
        flag = !isOKNum;
    }

    var oFood = SquareFactory.create('Food', x, y, 'white');
    oGround.remove(x, y);
    oGround.append(oFood);
}

