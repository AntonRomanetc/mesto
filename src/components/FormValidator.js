export class FormValidator {
  constructor(formConfig, form) {
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _inactivateButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _activateButtonState() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._inactivateButtonState();
    } else {
      this._activateButtonState();
    }
  }

  resetValidationFields() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  _handleEventInput(inputElement) {
    this._checkInputValidity(inputElement);
    this.toggleButtonState();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleEventInput(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}