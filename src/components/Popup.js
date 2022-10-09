export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);    
  }

  handleOpenPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  handleClosePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.handleClosePopup();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains('popup_opened') || targetClasses.contains('popup__close-button')) {
        this.handleClosePopup()
      }
    });
  }
}