import Ball from './classes/Ball.js';
import Platform from './classes/Platform.js';

let canvas = document.getElementById('canvas');
let widthCanva = window.window.innerWidth - 10;
let heigthCanva = window.innerHeight - 10;

let interval = null;

canvas.height = heigthCanva;
canvas.width = widthCanva;

let context = canvas.getContext('2d');

context.fillStyle = '#eee';

const ball = new Ball(context);
const platform = new Platform(context);


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

  checkMovingPlatform(platform);
  

  ball.setPositionX(ball.getPositionX() + ball.getVariationX());
  ball.setPositionY(ball.getPositionY() + ball.getVariationY());

}, 1);

function checkMovingPlatform(platform) {
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

window.addEventListener('keydown', (event) => {

  if (event.key.toLowerCase() === 'd') {
    console.log('')
    platform.moveToRight();
  }
  if (event.key === 'ArrowRight') platform.moveToRight();
  
  if (event.key.toLowerCase() === 'a')  platform.moveToLeft();
  if (event.key === 'ArrowLeft' )  platform.moveToLeft();

});

window.addEventListener('keyup', (event) => {

  if (event.key.toLowerCase() === 'd') platform.stopMoveToRight();
  if (event.key === 'ArrowRight') platform.stopMoveToRight();
  
  if (event.key.toLowerCase() === 'a')  platform.stopMoveToLeft();
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