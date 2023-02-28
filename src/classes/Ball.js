import PatternElement from "./PatternElement.js";

class Ball extends PatternElement {
  constructor(canvasContext) {
    super(canvasContext);
    this.body = { radius: 20 };
    this.POSITION_X = 100;
    this.POSITION_Y = 250;
    this.Speed = 2;
    this.ADD_SPEED = 1.05;
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

  collapseElement() {
    const MAX_ANGULE = 50;
    const MIN_ANGULE = 30;
    this.setVariationY(-this.getVariationY());
    this.setVariationX(this.getVariationX() * this.ADD_SPEED);
    this.setVariationY(this.getVariationY() * this.ADD_SPEED);
    this.changeAngule(this.randomNumber(MAX_ANGULE, MIN_ANGULE));
  }

  randomNumber(max, min) {
    return Math.floor(Math.random() * max) + min;
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

  reset() {
    this.POSITION_X = 100;
    this.POSITION_Y = 250;
    this.Speed = 2;
    this.ADD_SPEED = 1.05;
    this.delta = { x: this.getSpeed()*Math.cos(35), y: -this.getSpeed()*Math.sin(35) };
  }
}

export default Ball;
