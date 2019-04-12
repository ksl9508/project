var oSnake = new Snake();

oSnake.head = null;
oSnake.tail = null;

oSnake.init = function (oGround) {
    var SnakeHead  = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var SnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
    var SnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');

    // 双向链表
    SnakeHead.next = SnakeBody1;
    SnakeHead.prev = null;

    SnakeBody1.next = SnakeBody2;
    SnakeBody1.prev = SnakeHead;

    SnakeBody2.next = null;
    SnakeBody2.prev = SnakeBody1;

    this.head = SnakeHead;
    this.tail = SnakeBody2;

    // render
    oGround.remove(SnakeHead.x, SnakeHead.y);
    oGround.append(SnakeHead);

    oGround.remove(SnakeBody1.x, SnakeBody1.y);
    oGround.append(SnakeBody1);

    oGround.remove(SnakeBody2.x, SnakeBody2.y);
    oGround.append(SnakeBody2);
    
    // 默认移动方向
    this.direction = DIRECTIONENUM.RIGHT;
}

oSnake.strategies = {
    MOVE: function (snake, square, oGround, fromEat) {
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'blue');
        newBody.next = snake.head.next;
        newBody.prev = null;
        newBody.next.prev = newBody;

        oGround.remove(snake.head.x, snake.head.y);
        oGround.append(newBody);

        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        newHead.next = newBody;
        newHead.prev = null;
        newBody.prev = newHead;

        oGround.remove(square.x, square.y);
        oGround.append(newHead);
        snake.head = newHead; // 新的蛇头

        if (!fromEat) {
            var floor =  SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            oGround.remove(floor.x, floor.y);
            oGround.append(floor);
            snake.tail = snake.tail.prev; // 新的蛇尾
        }
        
    },
    EAT: function (snake, square, oGround) {
        this.MOVE(snake, square, oGround, true);
        oGame.score++;
        createFood(oGround, snake);
    },
    DIE: function () {
        oGame.over();
        alert('over!'+ oGame.score)
    }
}

oSnake.move = function (oGround) {
    // 预判蛇头下次到达的方块
    var square = oGround.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    
    if (typeof square.touch == 'function') {
        this.strategies[ square.touch() ](this, square, oGround);
    }
}

