export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
  
export const popupActionEdit = document.querySelector('.popup_profile');
export const formEdit = popupActionEdit.querySelector('.popup__form-edit-profile');
export const formInputName = popupActionEdit.querySelector('.form__input_name');
export const formInputJob = popupActionEdit.querySelector('.form__input_job');
  
export const popupActionAdd = document.querySelector('.popup_add');
export const formAdd = popupActionAdd.querySelector('.popup__form-add');
  
export const popupEditSelector = '.popup_profile';
export const popupAddSelector = '.popup_add';
export const popupPreviewSelector = '.popup_card';

export const popupPreviewTitleSelector = '.popup__card-caption';
export const popupPreviewUrlSelector = '.popup__card-foto';
  
export const cardsContainer = '.element';
export const cardElementTemplate = '#element-template';
  
export const userInfoInputsSelector = {
  nameSelector: '.profile__name', 
  jobSelector: '.profile__description'
}

export const formsValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}