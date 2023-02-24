import PatternElement from "./PatternElement.js";

class Platform extends PatternElement {

  constructor(canvasContext) {
    super(canvasContext);
    this.body = { height: 30, width: 180 };
    
    this.POSITION_X = (this.canvasContext.canvas.width / 2) - this.body.width;
    this.POSITION_Y = this.canvasContext.canvas.height - 70;
    this.SPEED = 7;
  
    this.isMovingRight = false;
    this.isMovingLeft = false;
  }

  drawnPlatformInContext() {
    this.canvasContext.beginPath();
    this.canvasContext.rect(
      this.POSITION_X, 
      this.POSITION_Y, 
      this.body.width,
      this.body.height
    );
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  getWidth() {
    return this.body.width;
  }

  getHeight() {
    return this.body.height;
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

  setSpeed(speed) {
    this.SPEED = speed;
  }

  getSpeed() {
    return this.SPEED;
  }
}

export default Platform;
