class SnakeGame {
    LEFT = 'ArrowLeft';
    UP = 'ArrowUp';
    RIGHT = 'ArrowRight';
    DOWN = 'ArrowDown';

    constructor() {
        this.score = document.getElementById('score');
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
        this.disabledKey1 = this.currentDirection();
        this.disabledKey2 = this.oppositeDirection();

        this.generateDot();
        window.setTimeout(this.drawBoard, this.interval);
        document.onkeydown = this.handleKeyDown;
    }

    drawBoard = () => {
        this.overlappingDot(true);
        this.score.textContent = `${this.ctr * 10}`;
        this.board.innerHTML = '';

        for (let y = 0; y < this.height; y++) {
            let row = document.createElement('div');
            row.className = 'row';

            for (let x = 0; x < this.width; x++) {
                let square = document.createElement('div');
                square.className = 'square';

                if (x === this.xDot && y === this.yDot) {
                    square.className = 'dot-square';
                } else {
                    for (let i = 0; i < this.body.length; i++) {
                        let point = this.body[i];

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

        this.disabledKey1 = this.currentDirection();
        this.disabledKey2 = this.oppositeDirection();

        if (this.gameLost()) {
            alert('God you suck');
        } else {
            this.xPos += this.xDir;
            this.yPos += this.yDir;

            this.body.push({ x: this.xPos, y: this.yPos });

            if (this.body.length > this.len) {
                this.body.shift();
            }

            setTimeout(this.drawBoard, this.interval);
        }
    };

    generateDot = () => {
        this.xDot = Math.floor(Math.random() * this.width);
        this.yDot = Math.floor(Math.random() * this.height);

        this.overlappingDot(false);
    };

    overlappingDot = (scoring) => {
        for (let i = 0; i < this.body.length; i++) {
            let point = this.body[i];

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
    };

    gameLost = () => {
        if (this.xPos < 0 || this.xPos >= this.width || this.yPos < 0 || this.yPos >= this.height) {
            return true;
        }

        for (let i = 0; i < this.body.length - 1; i++) {
            let point = this.body[i];

            if (this.xPos === point.x && this.yPos === point.y) {
                return true;
            }
        }

        return false;
    };

    currentDirection = () => {
      if (this.xDir === -1 && this.yDir === 0) {
          return this.LEFT
      } else if (this.xDir === 0 && this.yDir === -1) {
          return this.UP
      } else if (this.xDir === 1 && this.yDir === 0) {
          return this.RIGHT
      } else if (this.xDir === 0 && this.yDir === 1) {
          return this.DOWN
      }
    };

    oppositeDirection = () => {
        if (this.xDir === -1 && this.yDir === 0) {
            return this.RIGHT
        } else if (this.xDir === 0 && this.yDir === -1) {
            return this.DOWN
        } else if (this.xDir === 1 && this.yDir === 0) {
            return this.LEFT
        } else if (this.xDir === 0 && this.yDir === 1) {
            return this.UP
        }
    };

    keyDisabled = (key) => {
        return this.disabledKey1 === key || this.disabledKey2 === key
    };

    handleKeyDown = (e) => {
        const key = e.key;
        const delay = this.keyDisabled(key) ? this.interval : 0;

        setTimeout(() => {
            if (this.keyDisabled(key)) {
                return;
            }

            switch(key) {
                case this.LEFT:
                    this.xDir = -1;
                    this.yDir = 0;

                    break;
                case this.UP:
                    this.xDir = 0;
                    this.yDir = -1;

                    break;
                case this.RIGHT:
                    this.xDir = 1;
                    this.yDir = 0;

                    break;
                case this.DOWN:
                    this.xDir = 0;
                    this.yDir = 1;

                    break;
            }
        }, delay);
    }
}

new SnakeGame();
