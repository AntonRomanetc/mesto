import '../pages/index.css';

import {
  profileEditButton,
  profileAddButton,
  formEdit,
  formInputName,
  formInputJob,
  formAdd,
  popupEditSelector,
  popupAddSelector,
  popupPreviewSelector,
  cardsContainer,
  cardElementTemplate,
  userInfoInputsSelector,
  formsValidationConfig
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/initial-cards.js';

const popupPreview = new PopupWithImage(popupPreviewSelector);
const popupEdit = new PopupWithForm(popupEditSelector, handleSubmitEditPopup);
const popupAdd = new PopupWithForm(popupAddSelector, handleSubmitAddPopup);

const userInfo = new UserInfo(userInfoInputsSelector);

const formEditValidation = new FormValidator(formsValidationConfig, formEdit);
const formAddValidation = new FormValidator(formsValidationConfig, formAdd);

formEditValidation.enableValidation();
formAddValidation.enableValidation();

function createCard(cardItem) {
  const card = new Card(cardItem, cardElementTemplate, handleCardClick);
  return card.generateCard();
}

const cardsList = new Section({ 
  items: initialCards,
  renderer: (item) => {
    cardsList.appendItem(createCard(item));
  }
}, cardsContainer);

cardsList.renderItems();
 
function handleSubmitAddPopup(cardItem) {
  cardsList.addItem(createCard(cardItem));

  popupAdd.handleClosePopup();
}

function fillEditPopupInput() {
  const getUserInfo = userInfo.getUserInfo();
  formInputName.value = getUserInfo.name;
  formInputJob.value = getUserInfo.job;
}

function handleSubmitEditPopup(user) {
  userInfo.setUserInfo(user);
  popupEdit.handleClosePopup();
}

function handleCardClick(imageName, imageLink) {
  popupPreview.handleOpenPopup(imageName, imageLink);
}

popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

profileEditButton.addEventListener('click', function() {
  popupEdit.handleOpenPopup();
  fillEditPopupInput();
  formEditValidation.resetValidationFields();
  formEditValidation.toggleButtonState();
});

profileAddButton.addEventListener('click', function() {
  popupAdd.handleOpenPopup();
  formAddValidation.resetValidationFields();
  formAddValidation.toggleButtonState();
});