class Restart {
  
  constructor(score) {
    this.score = score;
    this.modal = document.querySelector('.modal');
    this.configScore();
    this.show();
  }

  show() {
    this.modal.classList.add('show');
  }

  hide() {
    this.modal.classList.remove('show');
  }

  configButton(restartFunction) {
    this.addHandleClickToButton(restartFunction);
  }

  configScore() {
    const score = document.getElementById('scoreLvl');
    score.innerHTML = this.score;
  }

  addHandleClickToButton(restartFunction) {
    this.button = document.querySelector('.modal__restart');
    this.button.addEventListener('click', () => {
      console.log(restartFunction.reset);
      restartFunction.reset();
    });
  }

}

export default Restart;
