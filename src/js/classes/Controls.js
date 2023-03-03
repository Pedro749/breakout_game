class Controls {
  constructor(element, screenSize) {
    this.element = element;
    this.screenSize = screenSize;
  }

  configControls() {
    this.configKeyDownEvents();
    this.configKeyUpEvents();
    this.configTouchStartEvents();
    this.configTouchEndEvents();    
  }

  configKeyDownEvents() {
    window.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'd' ||event.key === 'ArrowRight') {
        this.element.moveToRight();
      }
    
      if (event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft') {
        this.element.moveToLeft();
      }
    });
  }

  configKeyUpEvents() {
    window.addEventListener('keyup', (event) => {
      if (event.key.toLowerCase() === 'd' || event.key === 'ArrowRight') {
        this.element.stopMoveToRight();
      }
    
      if (event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft') {
        this.element.stopMoveToLeft();
      } 
    });
  }

  configTouchStartEvents() {
    window.addEventListener('touchstart', (event) => {
      if (this.isRightTouch(event)) {
        this.element.moveToRight();
      } else {
        this.element.moveToLeft();
      }

    });
  }

  configTouchEndEvents() {
    window.addEventListener('touchend', (event) => {
      if (this.isRightTouch(event)) {
        this.element.stopMoveToRight();
      } else {
        this.element.stopMoveToLeft();
      }
    });
  }

  isRightTouch(event) {
    const POSITION_OF_TOUCH = event?.touches[0]?.clientX;
    const MIDDLE_OF_SCREEN = this.screenSize / 2;

    if (POSITION_OF_TOUCH > MIDDLE_OF_SCREEN) {
      return true;
    }

    return false;
  }
}

export default Controls;
