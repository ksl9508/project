function SquareFactory() {

}

SquareFactory.create = function (type, x, y, color) {
    if (SquareFactory.prototype[type] == undefined) {
        throw 'no this type'
    }
    if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory) {
        SquareFactory.prototype[type].prototype = new SquareFactory()
    }
    return new SquareFactory.prototype[type](x, y, color)
}
SquareFactory.prototype.init = function (square, color, msg) {
    var dom = square.viewContent;
    dom.style.position = 'absolute';
    dom.style.backgroundColor = color;
    dom.style.width = square.width + 'px';
    dom.style.height = square.height + 'px';
    dom.style.left = square.x * square.width + 'px';
    dom.style.top = square.y * square.height + 'px';

    square.touch = function () {
        return msg
    }
    
}

SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, color, STRATEGYENUM.move);
    return floor;
}
SquareFactory.prototype.Stone = function (x, y, color) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, STRATEGYENUM.die);
    return stone;
}
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(food, color, STRATEGYENUM.eat);
    food.update(x, y);
    return food;
}
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var osh = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(osh, color, STRATEGYENUM.die);
    osh.update(x, y);
    return osh;
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var osb = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(osb, color, STRATEGYENUM.die);
    return osb;
}