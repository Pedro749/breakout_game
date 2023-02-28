import PatternElement from "./PatternElement.js";

class Ball extends PatternElement {
  constructor(canvasContext) {
    super(canvasContext);
    this.body = { radius: 20 };
    this.POSITION_X = 100;
    this.POSITION_Y = 250;
    this.Speed = 5;
    this.delta = { x: this.getSpeed()*Math.cos(35), y: -this.getSpeed()*Math.sin(35) };
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

  changeAngule(angule) {
    this.delta = { 
      x: this.getSpeed()*Math.cos(angule), 
      y: -this.getSpeed()*Math.sin(angule) 
    }
  }

  getSpeed() {
    return this.Speed;
  }

  setSpeed(speed) {
    this.speed = speed;
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
