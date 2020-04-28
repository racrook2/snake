class SnakeGame {
    constructor() {
        this.board = document.getElementById('board');
        this.height = 21;
        this.width = 31;
        this.xPos = 15;
        this.yPos = 10;
        this.xDir = -1;
        this.yDir = 0;
        this.len = 4;
        this.body = [{ x: this.xPos, y: this.yPos }];
        this.ctr = 0;
        this.interval = 250;

        this.generateDot();
        window.setTimeout(this.drawBoard.bind(this), this.interval);
        document.onkeydown = this.handleKeyDown.bind(this);
    }

    drawBoard() {
        this.overlappingDot(true);
        this.board.innerHTML = '';

        for (var y = 0; y < this.height; y++) {
            var row = document.createElement('div');
            row.className = 'row';

            for (var x = 0; x < this.width; x++) {
                var square = document.createElement('div');
                square.className = 'square';

                if (x === this.xDot && y === this.yDot) {
                    square.className = 'dot-square';
                } else {
                    for (var i = 0; i < this.body.length; i++) {
                        var point = this.body[i];

                        if (x === point.x && y === point.y) {
                            square.className = 'filled-square';
                            break;
                        }
                    }
                }

                row.appendChild(square);
            }

            this.board.appendChild(row);
        }

        this.xPos += this.xDir;
        this.yPos += this.yDir;

        this.body.push({ x: this.xPos, y: this.yPos });

        if (this.body.length > this.len) {
            this.body.shift();
        }

        window.setTimeout(this.drawBoard.bind(this), this.interval);
    }

    generateDot() {
        this.xDot = Math.floor(Math.random() * this.width);
        this.yDot = Math.floor(Math.random() * this.height);

        this.overlappingDot(false);
    }

    overlappingDot(scoring) {
        for (var i = 0; i < this.body.length; i++) {
            var point = this.body[i];

            if (this.xDot === point.x && this.yDot === point.y) {
                this.generateDot();

                if (scoring === true) {
                    this.ctr++;
                    this.len++;

                    if (this.ctr % 10 === 0) {
                        this.interval *= 0.8;
                    }
                }
            }
        }
    }

    handleKeyDown(e) {
        if (e.keyCode === 37) {
            if (this.xDir !== 1 || this.yDir !== 0) {
                this.xDir = -1;
                this.yDir = 0;
            }
        } else if (e.keyCode === 38) {
            if (this.xDir !== 0 || this.yDir !== 1) {
                this.xDir = 0;
                this.yDir = -1;
            }
        } else if (e.keyCode === 39) {
            if (this.xDir !== -1 || this.yDir !== 0) {
                this.xDir = 1;
                this.yDir = 0;
            }
        } else if (e.keyCode === 40) {
            if (this.xDir !== 0 || this.yDir !== -1) {
                this.xDir = 0;
                this.yDir = 1;
            }
        }
    }
}

new SnakeGame();
