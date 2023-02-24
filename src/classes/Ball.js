import PatternElement from "./PatternElement.js";

class Ball extends PatternElement {
  
  constructor(canvasContext) {
    super(canvasContext);

    this.body = { radius: 20 };
    this.delta = { x: 4, y: -4 };
    this.POSITION_X = 100;
    this.POSITION_Y = 250;
  }

  drawBallInContext() {
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.POSITION_X, 
      this.POSITION_Y, 
      this.body.radius, 
      0,
      Math.PI*2
    );

    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  getVariationX() {
    return this.delta.x;
  }

  getVariationY() {
    return this.delta.y;
  }

  setVariationX(x) {
    this.delta.x = x;
  }

  setVariationY(y) {
    this.delta.y = y;
  }

  getRadius() {
    return this.body.radius;
  }

  setbodyRadius(radius) {
    this.body.radius = radius;
  }

}

export default Ball;
