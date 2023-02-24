export default class Ball {
  BODY = { radius: 20 };
  DELTA = { x: 4, y: -4 };
  canvaContext = null;
  POSITION_X = 100;
  POSITION_Y = 250;
  SPEED = 20;

  constructor(canvasContext) {
    this.canvaContext = canvasContext;
  }

  drawBallInContext() {
    this.canvaContext.beginPath();
    this.canvaContext.arc(
      this.POSITION_X, 
      this.POSITION_Y, 
      this.BODY.radius, 
      0,
      Math.PI*2
    );

    this.canvaContext.fill();
    this.canvaContext.closePath();
  }

  getVariationX() {
    return this.DELTA.x;
  }

  getVariationY() {
    return this.DELTA.y;
  }

  setVariationX(x) {
    this.DELTA.x = x;
  }

  setVariationY(y) {
    this.DELTA.y = y;
  }

  getRadius() {
    return this.BODY.radius;
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

  setBodyRadius(radius) {
    this.BODY.radius = radius;
  }

  setPositionX(newPositionX) {
    this.POSITION_X = newPositionX;
  }

  setPositionY(newPositionY) {
    this.POSITION_Y = newPositionY;
  }

}

