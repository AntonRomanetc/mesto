const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = document.querySelector('.popup__close-edit-button');
const formProfileEdit = document.querySelector('.popup__form-edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formNameInput = formProfileEdit.querySelector('#name-input');
const formDescriptionInput = formProfileEdit.querySelector('#job-input');
const popupAddCard = document.querySelector('.popup__form-add-card');
const popupAdd = document.querySelector('.popup_card');
const buttonCardEdit = document.querySelector('.profile__add-button');
const formTitleInput = popupAdd.querySelector('#title-input');
const formLinkInput = popupAdd.querySelector('#link-input');
const elementTitle = document.querySelector('.element__title');
const popupProfileEdit = document.querySelector('.popup_profile');
const buttonCloseAddCard = document.querySelector('.popup__close-add-button');
const elementTemplate = document.querySelector('#element-template').content;
const initialCardsElement = document.querySelector('.element');
const cardsElement = elementTemplate.cloneNode(true);
const cardFoto = document.querySelector('.card-popup');
const popupCardImage = document.querySelector('.card-popup__foto');
const popupCardTitle = document.querySelector('.card-popup__caption');
const cardCloseButton = document.querySelector('#card-close');
const popupAddSave = popupAdd.querySelector('.popup__submit-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeEsc);
}

buttonProfileEdit.addEventListener('click', function (event) {
  formNameInput.value = profileName.textContent;
  formDescriptionInput.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
});

buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupProfileEdit);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formNameInput.value;
  profileDescription.textContent = formDescriptionInput.value;
  closePopup(popupProfileEdit);
}

formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

buttonCardEdit.addEventListener('click', function (event) {
  openPopup(popupAdd);
});

buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAdd);
});

function createCard(name, link) {
  const cardsElement = elementTemplate.cloneNode(true);
  cardsElement.querySelector('.element__title').textContent = name;
  const cardImage = cardsElement.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardsElement
    .querySelector('.element__like')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__active_like');
    });

  cardsElement
    .querySelector('.element__delete')
    .addEventListener('click', (evt) => {
      evt.target.closest('.element__description').remove();
    });

  cardImage
    cardImage.addEventListener('click', () => openFoto(name, link)); 
    return cardsElement;
}

function addCard(newCard) {
  initialCardsElement.prepend(newCard);
}

initialCards.forEach((item) => {
  const newCard = createCard(item.name, item.link);
  addCard(newCard);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = formTitleInput.value;
  const link = formLinkInput.value;
  const newCard = createCard(name, link)
  addCard(newCard);
  closePopup(popupAdd);
  popupAddCard.reset();
  popupAddSave.classList.add("popup__submit-button_disabled");
  popupAddSave.setAttribute("disabled", true);
}

popupAdd.addEventListener('submit', handleCardFormSubmit);
function openFoto(name, link) {
  popupCardImage.src = link;
  popupCardTitle.textContent = name;
  popupCardImage.alt = name;
  openPopup(cardFoto);
}

cardCloseButton.addEventListener('click', function () {
  closePopup(cardFoto);
});

function closeEsc(evt) {
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
    }
}

const popups = [...document.querySelectorAll(".popup")];

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains(".popup__close-edit-button")
    ) {
      closePopup(popup);
  
    }
  });
});