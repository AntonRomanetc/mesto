import '../pages/index.css';

import {
  profileEditButton,
  profileAddButton,
  profileEditAvatarButton,
  formEdit,
  formInputName,
  formInputAbout,
  formAdd,
  formEditAvatar,
  popupEditSelector,
  popupAddSelector,
  popupPreviewSelector,
  popupPreviewTitleSelector,
  popupPreviewUrlSelector,
  popupDeleteSelector,
  popupEditAvatarSelector,
  cardsContainer,
  cardElementTemplate,
  userInfoInputsSelector,
} from '../utils/constants.js';

import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js';
import { formConfig } from '../utils/formConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const popupPreview = new PopupWithImage(popupPreviewSelector, popupPreviewTitleSelector, popupPreviewUrlSelector);
const popupEdit = new PopupWithForm(popupEditSelector, handleSubmitEditPopup);
const popupAdd = new PopupWithForm(popupAddSelector, handleSubmitAddPopup);
const popupDelete = new PopupWithConfirmation(popupDeleteSelector, handleSubmitDeletePopup);
const popupAvatarEdit = new PopupWithForm(popupEditAvatarSelector, handleSubmitAvatarEditPopup);

const userInfo = new UserInfo(userInfoInputsSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '898681ec-22eb-45c1-9316-89a4888b48cb',
    'Content-Type': 'application/json'
  }
}); 

const formEditValidation = new FormValidator(formConfig, formEdit);
const formAddValidation = new FormValidator(formConfig, formAdd);
const formAvatareditValidation = new FormValidator(formConfig, formEditAvatar);

formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatareditValidation.enableValidation();

function card(cardItem) {
  const card = new Card(cardItem, userInfo._userId, cardElementTemplate, handleCardClick, handleDeleteClick, handleSetLike, handleDeleteLike);
  return card;
}

function createCard(cardItem) {
  return card(cardItem).generateCard();
}

const cardsList = new Section({
  renderer: (item) => {
    cardsList.appendItem(createCard(item));
  }
}, cardsContainer);

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(values => {
  userInfo.setUserInfo(values[0]);
  userInfo.setAvatar(values[0]);
  userInfo.setId(values[0]);
  cardsList.renderItems(values[1]);
})
.catch((err) => {
  alert(`${err} Данные пользователя или карточки не загружены`)
});

function handleSubmitAddPopup(cardItem) {
  popupAdd.renderLoading(true, 'Создать');

  api.setNewCard(cardItem)
  .then(() => {
    cardsList.addItem(createCard(cardItem));
    popupAdd.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Карточка не создана`)
  })
  .finally(() => {
    popupAdd.renderLoading(false, 'Создать');
  })
}

function fillEditPopupInput() {
  const getUserInfo = userInfo.getUserInfo();
  formInputName.value = getUserInfo.name;
  formInputAbout.value = getUserInfo.about;
}

function handleSubmitEditPopup(user) {
  popupEdit.renderLoading(true, 'Сохранить');

  api.setUserInfo(user)
  .then(() => {
    userInfo.setUserInfo(user);
    popupEdit.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Данные не отредактировались`)
  })
  .finally(() => {
    popupEdit.renderLoading(false, 'Сохранить');
  }); 
}

function handleSubmitAvatarEditPopup(user) {
  popupAvatarEdit.renderLoading(true, 'Сохранить');

  api.setAvatar(user)
  .then(() => {
    userInfo.setAvatar(user);
    popupAvatarEdit.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Аватар не сменился`)
  })
  .finally(() => {
    popupAvatarEdit.renderLoading(false, 'Сохранить');
  }); 
}

function handleDeleteClick(cardElement, id) {
  popupDelete.handleOpenPopup(cardElement, id);
}

function handleSubmitDeletePopup(cardElement, id) {
  api.deleteCard(id)
  .then(() => {
    card(cardElement).handleCardDelete(cardElement);
    popupDelete.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Карточка не удалилась`)
  }); 
}

function handleCardClick(imageName, imageLink) {
  popupPreview.handleOpenPopup(imageName, imageLink);
}

function handleSetLike(evt, cardElement, cardId) {
  api.setLike(cardId)
  .then((res) => {
    card(cardElement).setLike(evt);
    card(res).generateCard();
  })
  .catch((err) => {
    alert(`${err} Карточка не лайкнулась`)
  });
}

function handleDeleteLike(evt, cardElement, cardId) {
  api.deleteLike(cardId)
  .then((res) => {
    card(cardElement).deleteLike(evt);
    card(res).generateCard();
  })
  .catch((err) => {
    alert(`${err} Лайк не удалился`)
  });
}

popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupAvatarEdit.setEventListeners();

profileEditAvatarButton.addEventListener('click', function () {
  popupAvatarEdit.handleOpenPopup();
  formAvatareditValidation.toggleButtonState();
});

profileEditButton.addEventListener('click', function () {
  popupEdit.handleOpenPopup();
  fillEditPopupInput();
  formEditValidation.resetValidationFields();
  formEditValidation.toggleButtonState();
});

profileAddButton.addEventListener('click', function () {
  popupAdd.handleOpenPopup();
  formAddValidation.resetValidationFields();
  formAddValidation.toggleButtonState();
});