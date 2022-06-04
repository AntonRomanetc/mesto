export default class Card {
    constructor (element, elementTemplate) {
      this._name = element.name;
      this._link = element.link;
      this.openPhoto = element.openPhoto;
      this._template = document.querySelector(elementTemplate).content;
    }
  
    _toggleLike() {
      this._likeButton.classList.toggle('element__active_like')
    };
  
    _deleteCard() {
      this._elementList.remove()
    };
  
    _setEventListeners() {
      this._likeButton = this._elementList.querySelector('.element__like');
      this._likeButton.addEventListener('click', () => {
        this._toggleLike();
      });
  
      this._deleteButton = this._elementList.querySelector('.element__delete');
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
  
      this._elementList.querySelector('.element__image').addEventListener('click', () => {
        this.openPhoto(this);
      });
    }
  
    getCardElement() {
      this._elementList = this._template.querySelector('.element__description').cloneNode(true);
      this._setEventListeners();
  
      this._cardName = this._elementList.querySelector('.element__title');
      this._cardImage = this._elementList.querySelector('.element__image');
  
      this._cardName.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
  
      return this._elementList;
    }
  }