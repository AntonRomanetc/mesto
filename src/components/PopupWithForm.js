import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formSubmitButton = this._form.querySelector('.form__submit-button');
  }

  handleClosePopup() {
    super.handleClosePopup();
    this._form.reset();
  }
  
  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => { 
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading, submitText) {
    if (!isLoading) {
      this._formSubmitButton.textContent = submitText;  
    } else {
      this._formSubmitButton.textContent = 'Сохранение...';
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}