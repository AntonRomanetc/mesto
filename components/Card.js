export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector).content
    .querySelector('.element__description')
    .cloneNode(true);
  }

  _handleCardLike(evt) { 
    evt.target.classList.toggle('element__active_like');
  }

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }
  
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleCardLike(evt);
    });
    
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.element__title').textContent = this._name;
    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}