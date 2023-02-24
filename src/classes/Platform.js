export default class Platform {
  BODY = { height: 30, width: 180 };
  canvaContext = null;
  POSITION_X = 100;
  POSITION_Y = 700;
  SPEED = 7;

  isMovingRight = false;
  isMovingLeft = false;

  constructor(canvasContext) {
    this.canvaContext = canvasContext;

    this.POSITION_X = (this.canvaContext.canvas.width / 2) - this.BODY.width;
    this.POSITION_Y = this.canvaContext.canvas.height - 70;
  }

  drawnPlatformInContext() {
    this.canvaContext.beginPath();
    this.canvaContext.rect(
      this.POSITION_X, 
      this.POSITION_Y, 
      this.BODY.width,
      this.BODY.height
    );
    this.canvaContext.fill();
    this.canvaContext.closePath();
  }

  getWidth() {
    return this.BODY.width;
  }

  getHeight() {
    return this.BODY.height;
  }

  getPositionX() {
    return this.POSITION_X;
  }

  getPositionY() {
    return this.POSITION_Y;
  }

  setPositionX(newPositionX) {
    this.POSITION_X = newPositionX;
  }

  setPositionY(newPositionY) {
    this.POSITION_Y = newPositionY;
  }

  moveToRight() {
    this.isMovingRight = true;
  }

  moveToLeft() {
    this.isMovingLeft = true;
  }

  stopMoveToRight() {
    this.isMovingRight = false;
  }

  stopMoveToLeft() {
    this.isMovingLeft = false;
  }

}

