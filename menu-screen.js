// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement, onClickMenuCallback) {
    this.containerElement = containerElement;
    this.onClickMenuCallback = onClickMenuCallback;
    this._onClickMenu = this._onClickMenu.bind(this);

    //create menus of FLASHCARD_DECKS
    this.menuContainer = document.querySelector('div #choices');
    this._createMenus(this.menuContainer);

    this.selectedDeckOrder = null;
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _createMenus(menuContainer) {
    for (let index = 0; index < FLASHCARD_DECKS.length; index++) {
      const deck = FLASHCARD_DECKS[index];
      const menu = document.createElement('div');
      menu.textContent = deck.title;
      menu.index = index;
      menu.addEventListener('click', this._onClickMenu)
      menuContainer.append(menu);
    }
  }

  _onClickMenu(event){
    this.selectedDeckOrder = event.currentTarget.index;
    this.onClickMenuCallback(this.selectedDeckOrder);
  }
}
