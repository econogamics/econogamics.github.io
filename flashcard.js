// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText, moveChangeCountCallback, endChangeCountCallback, showNextCardCallback) {
    this.containerElement = containerElement;
    this.moveChangeCountCallback = moveChangeCountCallback;
    this.endChangeCountCallback = endChangeCountCallback;
    this.showNextCardCallback = showNextCardCallback;

    this._flipCard = this._flipCard.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);

    this.originX = null;
    this.originY = null;
    this.dragStarted = false;
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this.flashcardElement.addEventListener('pointerdown', this._onDragStart);
    this.flashcardElement.addEventListener('pointermove', this._onDragMove);
    this.flashcardElement.addEventListener('pointerup', this._onDragEnd);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  _onDragStart(event) {
    event.currentTarget.style.transition = '';
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  _onDragMove(event) {
    if (!this.dragStarted) {
      return;
    }
    this.flashcardElement.removeEventListener('pointerup', this._flipCard);
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    event.currentTarget.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) rotate(' + 0.2*deltaX + 'deg)';
    
    const body = document.querySelector('body');
    let status = null;
    if (deltaX >= 150) {
      status = 'right';
      body.classList.add('drop');
    } else if (deltaX <= -150) {
      status = 'wrong';
      body.classList.add('drop');
    } else{
      status = null;
      body.classList.remove('drop');
    }

    this.moveChangeCountCallback(status);
  }

  _onDragEnd(event) {
    this.dragStarted = false;
    this.flashcardElement.addEventListener('pointerup', this._flipCard);

    event.currentTarget.style.transition = '0.6s';
    event.currentTarget.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
    const body = document.querySelector('body');
    body.classList.remove('drop');

    const deltaX = event.clientX - this.originX;
    let status = null;
    if (deltaX >= 150) {
      status = 'right';
    } else if (deltaX <= -150) {
      status = 'wrong';
    } else{
      status = null;
    }
    this.endChangeCountCallback(status);
    this.showNextCardCallback(status);
  }
}
