import PatternElement from './PatternElement.js';

class Ball extends PatternElement {
  constructor(canvasContext) {
    super(canvasContext);
    this.body = { radius: 20 };
    this.POSITION_X = this.randomNumber(canvasContext.canvas.width - 10, 20);
    this.POSITION_Y = 250;
    this.Speed = 2;
    this.ADD_SPEED = 1.01;
    this.delta = {
      x: this.getSpeed() * Math.cos(35),
      y: -this.getSpeed() * Math.sin(35),
    };
  }

  drawBallInContext() {
    this.canvasContext.beginPath();

    this.addStyle();
    this.canvasContext.arc(
      this.POSITION_X,
      this.POSITION_Y,
      this.body.radius,
      0,
      Math.PI * 2,
      true
    );

    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  addStyle() {
    const gradient = this.canvasContext.createLinearGradient(20, 0, 220, 0);
    gradient.addColorStop(0, '#8693AB');
    gradient.addColorStop(1, '#BDD4E7');
    this.canvasContext.fillStyle = gradient;
    this.canvasContext.shadowColor = '#8A4FFF';
    this.canvasContext.shadowBlur = 15;
  }

  changeAngule(angule) {
    this.delta = {
      x: this.getSpeed() * Math.cos(angule * (Math.PI / 180)),
      y: -this.getSpeed() * Math.sin(angule * (Math.PI / 180)),
    };
  }

  collapseElement() {
    const MAX_ANGULE = 120;
    const MIN_ANGULE = 30;
    this.setVariationY(-this.getVariationY());
    this.changeAngule(this.randomNumber(MAX_ANGULE, MIN_ANGULE));
    this.setSpeed(this.getSpeed() * this.ADD_SPEED);
  }

  randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getSpeed() {
    return this.Speed;
  }

  setSpeed(speed) {
    this.Speed = speed;
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

  resetSpeed() {
    this.Speed = 2;
  }

  resetPosition() {
    this.POSITION_X = this.randomNumber(
      this.canvasContext.canvas.width - this.getRadius(),
      this.getRadius()
    );
    this.POSITION_Y = 250;
    this.ADD_SPEED = 1.01;
    this.delta = { x: this.getSpeed(), y: -this.getSpeed() };
    this.delta = {
      x: this.getSpeed() * Math.cos(35),
      y: -this.getSpeed() * Math.sin(35),
    };
  }

  reset() {
    this.resetPosition();
    this.resetSpeed();
  }
}

export default Ball;
