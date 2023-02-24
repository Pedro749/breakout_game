import Ball from './classes/Ball.js';
import Platform from './classes/Platform.js';

let canvas = document.getElementById('canvas');
let widthCanva = window.window.innerWidth - 10;
let heigthCanva = window.innerHeight - 10;

let interval = null;

canvas.height = heigthCanva;
canvas.width = widthCanva;

let context = canvas.getContext('2d');

const ball = new Ball(context);
const platform = new Platform(context);


function isInCollision(ball, platform) {
  let VARIATION_X = ball.POSITION_X - platform.POSITION_X;
  let VARIATION_Y = ball.POSITION_Y - platform.POSITION_Y;
  let distance = Math.sqrt(VARIATION_X * VARIATION_X + VARIATION_Y * VARIATION_Y);

  if (distance < ball.BODY.radius + platform.BODY.radius ) {
    return true;
  }

  return false;
}

function checkTheColision(ball, platform) {
    if  (touchedTheWall(ball, canvas.width)) { 
      ball.setVariationX(-ball.getVariationX());
    }

  if  (touchedTheTop(ball)) { 
    ball.setVariationY(-ball.getVariationY());

  } else if (passedTheSafeZone(ball, platform.getPositionY())) {

    if (isOnTopOfPlatform(ball, platform)) {
      ball.setVariationY(-ball.getVariationY());
      ball.setVariationX(ball.getVariationX()* 1.03);
      ball.setVariationY(ball.getVariationY()*1.03 );

    } else if (passedTheSafeZone(ball, canvas.height - ball.getRadius())) {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }

  }  
}

function touchedTheWall(ball, wallSize) {
  if (
    ball.getPositionX() + ball.getVariationX() > wallSize - ball.getRadius() || 
    ball.getPositionX() + ball.getVariationX() < ball.getRadius()
  ) {
    return true;
  }

  return false;
}

function touchedTheTop(ball) {
  if  (ball.getPositionY() + ball.getVariationY() < ball.getRadius()) { 
    return true;
  }

  return false;
}

function passedTheSafeZone(ball, zone) {
  if (ball.getPositionY() + ball.getVariationY() > zone) {
    return true;
  }

  return false;
}

function isOnTopOfPlatform(ball, platform) {
  if (
    ball.getPositionX() > platform.getPositionX() && 
    ball.getPositionX() < platform.getPositionX() + platform.getWidth()
  ) {
    return true;
  }

  return false;
}

interval  = setInterval(() => {
  
  context.clearRect(
    0, 
    0, 
    canvas.width, 
    canvas.height
  );
  
  checkTheColision(ball,platform);

  ball.drawBallInContext();


  platform.drawnPlatformInContext();

  if (platform.isMovingLeft) {
    if (platform.POSITION_X <= 0) {
      platform.stopMoveToLeft();
    } else {
      platform.setPositionX(platform.POSITION_X - platform.SPEED);
    }
  }

  if (platform.isMovingRight) {
    if (platform.POSITION_X >= canvas.width - platform.BODY.width) {
      platform.stopMoveToRight();
    } else {
      platform.setPositionX(platform.POSITION_X + platform.SPEED);
    }
    
  }

  ball.setPositionX(ball.POSITION_X + ball.DELTA.x)
  ball.setPositionY(ball.POSITION_Y + ball.DELTA.y)

}, 1)



window.addEventListener('keydown', (event) => {  

  if (event.key === 'd') platform.moveToRight();
  if (event.key === 'ArrowRight') platform.moveToRight();
  
  if (event.key === 'a')  platform.moveToLeft();
  if (event.key === 'ArrowLeft' )  platform.moveToLeft();

});

window.addEventListener('keyup', (event) => {  

  if (event.key === 'd') platform.stopMoveToRight();
  if (event.key === 'ArrowRight') platform.stopMoveToRight();
  
  if (event.key === 'a')  platform.stopMoveToLeft();
  if (event.key === 'ArrowLeft' )  platform.stopMoveToLeft();

});


// window.addEventListener('mousemove', (event) => {
//   ball.setPositionX(event.clientX);
//   ball.setPositionY(event.clientY);

//   if (isInCollision(ball, ball2)) {
//     ball2.changeColorOfBall('#ff0000');
//   } else {
//     ball2.changeColorOfBall('#fff');
//   }
// })