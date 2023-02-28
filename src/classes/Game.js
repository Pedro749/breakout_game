import Ball from "./Ball.js";
import Platform from "./Platform.js";
import Bricks from "./Bricks.js";
import Score from "./Score.js";

class Game {

  constructor() {
    this.interval = null;
    this.initilConfig();
  }

  initilConfig() {
    this.configCanvas();
    this.configElements();
    this.configControllers();
  }

  configCanvas() {
    this.canvas = document.getElementById("canvas");
    this.CANVAS_WIDTH = window.innerWidth - 10;
    this.CANVAS_HEIGHT = window.innerHeight - 60;
    this.canvas.height = this.CANVAS_HEIGHT;
    this.canvas.width = this.CANVAS_WIDTH;
    this.context = this.canvas.getContext("2d");
  }

  configElements() {
    this.ball = new Ball(this.context);
    this.platform = new Platform(this.context);
    this.bricks = new Bricks(this.context);
    this.score = new Score();
  }

  configControllers() {
    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "d" ||event.key === "ArrowRight") {
        this.platform.moveToRight();
      }
    
      if (event.key.toLowerCase() === "a" || event.key === "ArrowLeft") {
        this.platform.moveToLeft();
      }
    });
    
    window.addEventListener("keyup", (event) => {
      if (event.key.toLowerCase() === "d" || event.key === "ArrowRight") {
        this.platform.stopMoveToRight();
      }
    
      if (event.key.toLowerCase() === "a" || event.key === "ArrowLeft") {
        this.platform.stopMoveToLeft();
      } 
    });

    window.addEventListener('touchstart', (event) => {
      if (this.isRightTouch(event)) {
        this.platform.moveToRight();
      } else {
        this.platform.moveToLeft();
      }

    })

    window.addEventListener('touchend', (event) => {
      if (this.isRightTouch(event)) {
        this.platform.stopMoveToRight();
      } else {
        this.platform.stopMoveToLeft();
      }
    });
    
  }

  isRightTouch(event) {
    const POSITION_OF_TOUCH = event?.touches[0]?.clientX;
    const MIDDLE_OF_SCREEN = this.CANVAS_WIDTH / 2;

    if (POSITION_OF_TOUCH > MIDDLE_OF_SCREEN) {
      return true;
    }

    return false;
  }

  start() {
    this.interval = setInterval(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
      this.spawnElements();
      this.checkTheColision(this.ball, this.platform);
      this.checkMovingPlatform(this.platform);
    
      if (this.bricks.removeBrickIfCollapseWithElement(this.ball)) {
        this.ball.setVariationY(-this.ball.getVariationY());
      }

      if (this.bricks.checkWinner()) {
        this.hasAWinner();
      }
    
      this.ball.setPositionX(this.ball.getPositionX() + this.ball.getVariationX());
      this.ball.setPositionY(this.ball.getPositionY() + this.ball.getVariationY());
    }, 1);
  }

  checkTheColision(ball, platform) {
    if (this.touchedTheWall(ball, canvas.width)) {
      ball.setVariationX(-ball.getVariationX());
    }
  
    if (this.touchedTheTop(ball)) {
      ball.setVariationY(-ball.getVariationY());

    } else if (this.passedTheSafeZone(ball, platform.getPositionY() - ball.getRadius())) {
      if (this.isOnTopOfPlatform(ball, platform)) {
        ball.collapseElement();

      } else if (this.passedTheSafeZone(ball, canvas.height - ball.getRadius() )) {
        this.hasALoser();

      }
    }
  }

  spawnElements() {
    this.ball.drawBallInContext();
    this.platform.drawnPlatformInContext();
    this.bricks.drawBricksInContext();
  }
  
 touchedTheWall(ball, wallSize) {
    if (
      ball.getPositionX() + ball.getVariationX() > wallSize - ball.getRadius() ||
      ball.getPositionX() + ball.getVariationX() < ball.getRadius()
    ) {
      return true;
    }
  
    return false;
  }
  
  touchedTheTop(ball) {
    if (ball.getPositionY() + ball.getVariationY() < ball.getRadius()) {
      return true;
    }
  
    return false;
  }
  
  passedTheSafeZone(ball, zone) {
    if (ball.getPositionY() + ball.getVariationY() > zone) {
      return true;
    }
  
    return false;
  }
  
  isOnTopOfPlatform(ball, platform) {
    if (
      ball.getPositionX() > platform.getPositionX() &&
      ball.getPositionX() < platform.getPositionX() + platform.getWidth()
    ) {
      return true;
    }
  
    return false;
  }

  checkMovingPlatform(platform) {
    if (platform.isMovingLeft) {
      if (platform.getPositionX() <= 0) {
        platform.stopMoveToLeft();
      } else {
        platform.setPositionX(platform.getPositionX() - platform.getSpeed());
      }
    }
  
    if (platform.isMovingRight) {
      if (platform.getPositionX() >= canvas.width - platform.getWidth()) {
        platform.stopMoveToRight();
      } else {
        platform.setPositionX(platform.getPositionX() + platform.getSpeed());
      }
    }
  }

  hasAWinner() {
    
    this.score.addLevel();
    this.bricks.reset();
    this.platform.setSpeed(this.platform.getSpeed() + 0.5);
    console.log('YOU WIN: POINTS :' + this.wins);
  }

  hasALoser() {
    this.ball.resetPosition();
    this.score.removeLifes();


    if (this.score.getLifes() === 0 ) {
      this.reset();
      this.score.reset();
      console.log('YOU LOSE : POINTS '+this.wins);
    }
  }

  reset() {
    this.ball.reset();
    this.bricks.reset();
  }

}

export default Game;
