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
cardsElement.querySelector('.element__title').textContent;
cardsElement.querySelector('.element__image').href;
const cardFoto = document.querySelector('.card');
const popupCardImage = document.querySelector('.card__foto');
const popupCardTitle = document.querySelector('.card__caption');
const cardCloseButton = document.querySelector('#card-close');
const popupAddSave = popupAdd.querySelector('.popup__submit-button');


////функция открытия

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

///функция закрытия

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

///Форма редактировать профиль//

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

//Форма добавлять карточки//

buttonCardEdit.addEventListener('click', function (event) {
  openPopup(popupAdd);
});
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAdd);
});

// Create card

function createCard(name, link) {
  const cardsElement = elementTemplate.cloneNode(true);
  cardsElement.querySelector('.element__title').textContent = name;
  const cardImage = cardsElement.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = name;

  // like/dislike card

  cardsElement
    .querySelector('.element__like')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__active_like');
    });

  // delete card

  cardsElement
    .querySelector('.element__delete')
    .addEventListener('click', (evt) => {
      evt.target.closest('.element__description').remove();
    });
  cardImage
    .addEventListener('click', openFoto);
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
  popupAddCard.reset();
  closePopup(popupAdd);
}
popupAdd.addEventListener('submit', handleCardFormSubmit);

///openFoto//

function openFoto(name, link) {
  openPopup(cardFoto);
  popupCardImage.src = link;
  popupCardTitle.textContent = name;
  popupCardImage.alt = name;
}
cardCloseButton.addEventListener('click', function () {
  closePopup(cardFoto);
});