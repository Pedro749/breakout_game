class Score {
  constructor() {
    this.lifes = 3;
    this.level = 1;
    this.lifesElement = document.querySelector('.lifes');
    this.levelElement = document.querySelector('.level');
    this.levelElement.innerHTML = this.level;
    this.lifesElement.innerHTML = this.lifes;
    this.lose = false;
  }
  
  getLifes() {
    return this.lifes;
  }

  getLevel() {
    return this.level;
  }

  addLevel() {
    this.level++;
    this.levelElement.innerHTML = this.level;
  }

  removeLifes() {
    this.lifes--;
    this.lifesElement.innerHTML = this.lifes;
  }

  reset() {
    this.lifes = 3;
    this.level = 1;

    this.levelElement.innerHTML = this.level;
    this.lifesElement.innerHTML = this.lifes;
  } 

}

export default Score;