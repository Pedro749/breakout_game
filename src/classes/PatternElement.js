class PatternElement {
  constructor(canvasContext) {
    this.canvasContext = canvasContext;
    this.POSITION_X = 0;
    this.POSITION_Y = 0;
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
}

export default PatternElement;
