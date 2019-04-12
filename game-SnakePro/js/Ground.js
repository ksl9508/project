var oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

oGround.init = function () {
    var dom = this.viewContent;
    dom.style.position = 'absolute';
    dom.style.backgroundColor = '#ff0';
    dom.style.left = this.x + 'px';
    dom.style.top = this.y + 'px';
    dom.style.width = this.width + 'px';
    dom.style.height = this.height + 'px';

    this.SquareTable = [];

    for (var i = 0; i < YLEN; i++) {
        this.SquareTable[i] = [];
        for (var j = 0; j < XLEN; j++) {
            var square;
            if (j == 0 || i == 0 || (j == XLEN - 1) || (i == YLEN - 1)) {
                square = SquareFactory.create('Stone', j, i, 'black')
            } else {
                square = SquareFactory.create('Floor', j, i, 'orange')
            }
            
            this.SquareTable[i].push(square);
            dom.appendChild(square.viewContent);
        }
    }

    document.body.appendChild(dom)
};

oGround.remove = function (x, y) {
    var square = this.SquareTable[y][x];
    this.viewContent.removeChild(square.viewContent);
    this.SquareTable[y][x] = null;
}

oGround.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square;
}
