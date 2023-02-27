import PatternElement from "./PatternElement.js";

class Ball extends PatternElement {
  constructor(canvasContext) {
    super(canvasContext);
    this.body = { radius: 20 };
    this.delta = { x: 3, y: -3 };
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
      Math.PI * 2
    );

    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  get variationX() {
    return this.delta.x;
  }

  get variationY() {
    return this.delta.y;
  }

  set variationX(x) {
    this.delta.x = x;
  }

  set variationY(y) {
    this.delta.y = y;
  }

  get radius() {
    return this.body.radius;
  }

  set bodyRadius(radius) {
    this.body.radius = radius;
  }
}

export default Ball;
