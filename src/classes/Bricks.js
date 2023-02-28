class Bricks {
  constructor(canvasContext) {
    this.canvasContext = canvasContext;
    this.config();
  }

  config() {
    this.widthOfCanvas = this.canvasContext.canvas.width;
    this.heightOfCanvas = this.canvasContext.canvas.height;
    this.bricks = [];
    this.rows = 3;
    this.brickHeigth = 30;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.setBrickWidth();
    this.setBrickColumns();
    this.setBrickOffsetLeft();
    this.generateBricks();
    this.generatePositions();
  }

  setBrickWidth() {
    const QTD_BRICKS_LARGE_SCREEN = 9;
    const QTD_BRICKS_SMALL_SCREEN = 5;
    const MIN_SCREEN = 550;

    if (this.widthOfCanvas > MIN_SCREEN) {
      this.brickWidth =
        this.widthOfCanvas / QTD_BRICKS_LARGE_SCREEN - this.brickPadding;
    } else {
      this.brickWidth =
        this.widthOfCanvas / QTD_BRICKS_SMALL_SCREEN - this.brickPadding;
    }
  }

  setBrickColumns() {
    const KEEP_COLUMNS_ALIGNED = 2;
    this.columns =
      Math.round(this.widthOfCanvas / this.brickWidth) - KEEP_COLUMNS_ALIGNED;
  }

  setBrickOffsetLeft() {
    const TOTAL_OF_WIDTH_BRICKS =
      this.columns * (this.brickWidth + this.brickPadding);
    this.brickOffsetLeft = (this.widthOfCanvas - TOTAL_OF_WIDTH_BRICKS) / 2;
  }

  generateBricks() {
    for (let column = 0; column < this.columns; column++) {
      this.bricks[column] = [];
      for (let row = 0; row < this.rows; row++) {
        this.bricks[column][row] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  generatePositions() {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        this.bricks[column][row].x =
          column * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
        this.bricks[column][row].y =
          row * (this.brickHeigth + this.brickPadding) + this.brickOffsetTop;
      }
    }
  }

  setRows(rows) {
    this.rows = rows;
  }

  getBricks() {
    return this.bricks;
  }

  drawBricks(column, row) {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = `rgb(${Math.floor(242.5 - 42.5 * row)}, ${Math.floor(
      242.5 - 42.5 * column
    )}, 0)`;
    this.canvasContext.rect(
      this.bricks[column][row].x,
      this.bricks[column][row].y,
      this.brickWidth,
      this.brickHeigth
    );

    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  drawBricksInContext() {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.bricks[column][row]?.status === 1) {
          this.drawBricks(column, row);
        }
      }
    }
  }

  removeBrickIfCollapseWithElement(element) {
    if (!element) return false;

    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        let brick = this.bricks[column][row];

        if (
          brick.status === 1 &&
          element.getPositionX() > brick.x  &&
          element.getPositionX() < brick.x + this.brickWidth &&
          element.getPositionY() > brick.y  &&
          element.getPositionY() < brick.y + this.brickHeigth + element.getRadius()
        ) {
          this.bricks[column][row].status = 0;
          return true;
        }
      }
    }

    return false;
  }

  checkWinner() {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.bricks[column][row]?.status === 1) return false;
      }
    }

    return true;
  }

  reset() {
    this.generateBricks()
    this.generatePositions();
  }
}

export default Bricks;
