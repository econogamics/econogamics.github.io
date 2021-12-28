// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement, showResultsScreenCallback) {
    this.containerElement = containerElement;
    this.showResultsScreenCallback = showResultsScreenCallback;

    this.currentDeck = null;
    this.currentIndex = 0;
    this.wordList = [];
    this.definitionList = [];
    this.listLength = this.wordList.length;
    this.incorrectWordList = [];
    this.incorrectDefinitionList = [];
    this.correctNumber = 0;
    this.incorrectNumber = 0;

    this.correctSpan = document.querySelector('#main .correct');
    this.incorrectSpan = document.querySelector('#main .incorrect');

    this.initializeDeck = this.initializeDeck.bind(this);
    this.moveChangeCount = this.moveChangeCount.bind(this);
    this.endChangeCount = this.endChangeCount.bind(this);
    this.showNextCard = this.showNextCard.bind(this);
  }

  show() {
    this.currentIndex = 0;
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    flashcardContainer.innerHTML = '';
    const card = new Flashcard(flashcardContainer, this.wordList[this.currentIndex], this.definitionList[this.currentIndex], this.moveChangeCount, this.endChangeCount, this.showNextCard);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  initializeDeck() {
    for (const word in this.currentDeck.words) {
      if (Object.hasOwnProperty.call(this.currentDeck.words, word)) {
        const definition = this.currentDeck.words[word];
        this.wordList.push(word);
        this.definitionList.push(definition);
      }
    }

    this.correctSpan.textContent = this.correctNumber;
    this.incorrectSpan.textContent = this.incorrectNumber;
  }

  moveChangeCount(status) {
    if (this.incorrectNumber + this.correctNumber < this.wordList.length) {
      if (status === 'right') {
        this.correctSpan.textContent = this.correctNumber + 1;
        this.incorrectSpan.textContent = this.incorrectNumber;      
      } else if (status === 'wrong') {
        this.correctSpan.textContent = this.correctNumber;
        this.incorrectSpan.textContent = this.incorrectNumber + 1;      
      } else {
        this.correctSpan.textContent = this.correctNumber;
        this.incorrectSpan.textContent = this.incorrectNumber;
      }
    } else {
      if (status === 'right') {
        this.correctSpan.textContent = this.correctNumber + 1;
        this.incorrectSpan.textContent = this.incorrectNumber - 1;      
      } else if (status === 'wrong') {
        this.correctSpan.textContent = this.correctNumber;
        this.incorrectSpan.textContent = this.incorrectNumber;      
      } else {
        this.correctSpan.textContent = this.correctNumber;
        this.incorrectSpan.textContent = this.incorrectNumber;
      }
    }
    
  }

  endChangeCount(status) {
    if (this.incorrectNumber + this.correctNumber < this.wordList.length) {
      if (status === 'right') {
        this.correctNumber = this.correctNumber + 1;
        this.incorrectNumber = this.incorrectNumber;     
      } else if (status === 'wrong') {
        this.correctNumber = this.correctNumber;
        this.incorrectNumber = this.incorrectNumber + 1;
        this.incorrectWordList.push(this.wordList[this.currentIndex]); 
        this.incorrectDefinitionList.push(this.definitionList[this.currentIndex]);     
      } else {
        this.correctNumber = this.correctNumber;
        this.incorrectNumber = this.incorrectNumber; 
      }
    } else {
      if (status === 'right') {
        this.correctNumber = this.correctNumber + 1;
        this.incorrectNumber = this.incorrectNumber - 1;     
      } else if (status === 'wrong') {
        this.correctNumber = this.correctNumber;
        this.incorrectNumber = this.incorrectNumber;
        this.incorrectWordList.push(this.wordList[this.currentIndex]); 
        this.incorrectDefinitionList.push(this.definitionList[this.currentIndex]);     
      } else {
        this.correctNumber = this.correctNumber;
        this.incorrectNumber = this.incorrectNumber; 
      }
    }
  }

  showNextCard(status) {
    if (status === null) {
      return;
    }
    if (this.currentIndex === this.wordList.length - 1) {
      this.showResultsScreenCallback();
      this.endShift();
    }
    this.currentIndex += 1;
    const flashcardContainer = document.querySelector('#flashcard-container');
    flashcardContainer.innerHTML = '';
    const card = new Flashcard(flashcardContainer, this.wordList[this.currentIndex], this.definitionList[this.currentIndex], this.moveChangeCount, this.endChangeCount, this.showNextCard);
  }

  endShift() {
    this.wordList = this.incorrectWordList;
    this.definitionList = this.incorrectDefinitionList;
    this.currentIndex = 0;
    this.incorrectWordList = [];
    this.incorrectDefinitionList = [];
  }

  restart() {
    this.currentDeck = null;
    this.currentIndex = 0;
    this.wordList = [];
    this.definitionList = [];
    this.incorrectWordList = [];
    this.incorrectDefinitionList = [];
    this.correctNumber = 0;
    this.incorrectNumber = 0;
    const flashcardContainer = document.querySelector('#flashcard-container');
    flashcardContainer.innerHTML = '';
  }
}
