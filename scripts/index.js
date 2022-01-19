let formModal = document.querySelector('.pop-up')
let formElement = document.querySelector('.pop-up__form');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.pop-up__close-button');

let profileName = document.querySelector('.profile__name')
let profileText = document.querySelector('.profile__text')
let formName = document.querySelector('.pop-up__name')
let formAbout = document.querySelector('.pop-up__about')

function modalToggler() {
  formModal.classList.toggle('pop-up_opened');
}

openButton.addEventListener('click', () => {
  modalToggler()
  formName.value = profileName.textContent;
  formAbout.value = profileText.textContent;
});


closeButton.addEventListener('click', () => {
  modalToggler()
})

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = formName.value;
  profileText.textContent = formAbout.value;
  formModal.classList.remove('pop-up_opened');
});


