// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement, showMenuCallback, continueCallback) {
    this.containerElement = containerElement;
    this.showMenuCallback = showMenuCallback;
    this.continueCallback = continueCallback;
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
    const percent = document.querySelector('#results .percent');
    const correct = document.querySelector('#results .correct');
    const incorrect = document.querySelector('#results .incorrect');
    const continueButton = document.querySelector('#results .continue');
    const toMenu = document.querySelector('#results .to-menu');

    percent.textContent = (numberCorrect / (numberCorrect + numberWrong) * 100).toFixed(2);
    correct.textContent = numberCorrect;
    incorrect.textContent = numberWrong;
    
    if (numberWrong === 0) {
      continueButton.textContent = 'Start over?';
      continueButton.removeEventListener('click', this.continueCallback);
      continueButton.addEventListener('click', this.showMenuCallback);
    } else {
      continueButton.textContent = 'Continue';
      continueButton.removeEventListener('click', this.showMenuCallback);
      continueButton.addEventListener('click', this.continueCallback);
    }

    toMenu.addEventListener('click', this.showMenuCallback);
    
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
