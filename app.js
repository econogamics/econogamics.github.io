// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.showFlashcardScreen = this.showFlashcardScreen.bind(this);
    this.menu = new MenuScreen(menuElement, this.showFlashcardScreen);

    const mainElement = document.querySelector('#main');
    this.showResultsScreen = this.showResultsScreen.bind(this);
    this.flashcards = new FlashcardScreen(mainElement, this.showResultsScreen);

    const resultElement = document.querySelector('#results');
    this.showMenu = this.showMenu.bind(this);
    this.continueReview = this.continueReview.bind(this);
    this.results = new ResultsScreen(resultElement, this.showMenu, this.continueReview);
  }

  showFlashcardScreen(selectedDeckOrder) {
    this.menu.hide();
    this.flashcards.currentDeck = FLASHCARD_DECKS[selectedDeckOrder];
    this.flashcards.initializeDeck();
    this.flashcards.show();
  }

  showResultsScreen() {
    this.flashcards.hide();
    this.results.show(this.flashcards.correctNumber,this.flashcards.incorrectNumber);
  }

  showMenu() {
    this.results.hide();
    this.menu.show();
    this.flashcards.hide();
    this.flashcards.restart();
  }

  continueReview() {
    this.flashcards.show();
    this.results.hide();
  }
}
