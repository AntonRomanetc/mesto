import FormValidator from "./FormValidator.js";
import Card  from "./Card.js";
import { initialCards } from "./initialCards.js"
import { config } from "./FormValidator.js";

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupForms = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupOpenedClass = 'popup_opened';
const formProfileEdit = document.querySelector('.popup__form-edit-profile');
const formNameInput = formProfileEdit.querySelector('.popup__text_name');
const formDescriptionInput = formProfileEdit.querySelector('.popup__text_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_card');
const popupAddCard = document.querySelector('.popup__form-add-card');
const formTitleInput = popupAddCard.querySelector('.popup__text_name');
const formLinkInput = popupAddCard.querySelector('.popup__text_link');
const initialCardsElement = document.querySelector('.element');
const elementTemplate = '#element-template';
const cardFoto = document.querySelector('.card-popup');
const popupCardImage = document.querySelector('.card-popup__foto');
const popupCardTitle = document.querySelector('.card-popup__caption');

const formProfileEditValidator = new FormValidator(config, formProfileEdit);
const popupAddCardValidator = new FormValidator(config, popupAddCard);

const openProfilePopup = () => {
  formNameInput.value = profileName.textContent;
  formDescriptionInput.value = profileDescription.textContent;
  formProfileEditValidator.toggleSubmitButtonState(formProfileEdit, config);
  formProfileEditValidator.resetValidation(formProfileEdit, config);
  openPopup(popupProfile);
};

const handleformProfileEditSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = formNameInput.value;
  profileDescription.textContent = formDescriptionInput.value;
  closePopup(popupProfile);
};

const openCardPopup = () => {
  popupAddCardValidator.toggleSubmitButtonState(popupAddCard, config);
  popupAddCardValidator.resetValidation(popupAddCard, config);
  openPopup(popupAdd);
  popupAddCard.reset();
};

const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const elementList = {
    name: formTitleInput.value,
    link: formLinkInput.value,
    openPhoto: openPhoto,
  }
  addCard(elementList);
  closePopup(popupAdd);
};

const openPhoto = (element) => {
  openPopup(cardFoto);
  popupCardTitle.textContent = element._name;
  popupCardImage.src = element._link;
  popupCardImage.alt = element._name;
}

const createCard = (data) => {
  const card = new Card(data, elementTemplate);
  const elementList = card.getCardElement();
  return elementList;
}

const addCard = (data) => {
  initialCardsElement.prepend(createCard(data));
};

initialCards.forEach((data) => {
  const element = {
    name: data.name,
    link: data.link,
    openPhoto: openPhoto,
  }
  addCard(element);
});

const openPopup = (popup) => {
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keydown', closeEscapePopup);
}

const closePopup = (popup) => {
  popup.classList.remove(popupOpenedClass);
  document.removeEventListener('keydown', closeEscapePopup);
}

const closeEscapePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

popupForms.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

formProfileEdit.addEventListener('submit', handleformProfileEditSubmit);
buttonProfileEdit.addEventListener('click', openProfilePopup);

popupAddCard.addEventListener('submit', handleCardSubmit);
buttonProfileAdd.addEventListener('click', openCardPopup);

formProfileEditValidator.enableValidation();
popupAddCardValidator.enableValidation();