export class Card {
  constructor(data, userId, templateSelector, handleCardClick, handleDeleteClick, handleSetLike, handleDeleteLike) {
    this._data = data; 
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector).content
    .querySelector('.element__description')
    .cloneNode(true);
  }

  _hideDeleteButton () {
    if (this._owner._id !== this._userId) {
      this._buttonDelete.classList.add('element__delete_hidden');
    }
  }

  setLike(evt) {
    evt.target.classList.add('element_active_like');
  }

  deleteLike(evt) {
    evt.target.classList.remove('element_active_like');
  }

  _handleToggleLike(evt) { 
    if (evt.target.classList.contains('element_active_like')) {
       this._handleDeleteLike(evt, this._element, this._data._id);
    } else {
      this._handleSetLike(evt, this._element, this._data._id);
    }
  }

  _setPreLike() {
    this._likes.forEach(item => {
      if (item._id === this._userId) {
        this._buttonLike.classList.add('element_active_like');
      }
    })
  }

  _countLikes() {
    this._countLike.textContent = this._likes.length;
  }

  handleCardDelete(element) {
    element.remove();
    element = null;
  }

  _setEventListeners = () => {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', (evt) => {
      this._handleToggleLike(evt);
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._element, this._data._id);
    });
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._buttonLike = this._element.querySelector('.element__like');
    this._countLike = this._element.querySelector('.element__likes');
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    if (this._likes) {
      this._countLikes();
    }
    if (this._owner) { 
      this._hideDeleteButton();
      this._setPreLike();
    }
    this._setEventListeners();
    return this._element;
  }
}