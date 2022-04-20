import Card from './card.js'
import FormValidator from './FormValidator.js'
import { initialCards } from './data.js'

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
export const popupPhoto = document.querySelector('.popup_photo');

const buttonClosePopupProfile = popupEdit.querySelector('.popup__close');
const buttonClosePopupCard = popupAdd.querySelector('.popup__close');
const buttonClosePopupPhoto = popupPhoto.querySelector('.popup__close');

export const photoFull = document.querySelector('.popup__photo');
export const photoCaption = document.querySelector('.popup__caption');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formPopupProfile = document.querySelector('.popup__form_data_edit');
const formPopupAddCard = document.querySelector('.popup__form_data_add');
const nameInput = formPopupProfile.querySelector('.popup__input_data_name');
const jobInput = formPopupProfile.querySelector('.popup__input_data_job');
const placeInput = formPopupAddCard.querySelector('.popup__input_data_place');
const linkInput = formPopupAddCard.querySelector('.popup__input_data_link');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardList = document.querySelector('.elements__items');

//-------------Попап--------------------//
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('click', closeByOverlay);
}

function closedPopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('click', closeByOverlay);
}

function setUserInfo() {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closedPopup(popupEdit);
}

function renderCard(card) {
  cardList.prepend(card);
}

function createCard(data) {//рендер карточек
  const newCard = new Card(data, '.cards-template').generateCard();
  return newCard;
}

function closeByOverlay(event) {//Закрытие попапа по оверлею
  const openedPopup = document.querySelector('.popup_opened');
  if (event.target === event.currentTarget) {
    closedPopup(openedPopup);
  }
}

function closeByEsc(evt) {//закрытие попапа по кнопке Esc
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closedPopup(openedPopup);
  }
}

//-------Открытие Попапа--------------------//
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEdit);
  editFormValidator.resetErrors();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
buttonAddCard.addEventListener('click', function () {
  formPopupAddCard.reset();
  openPopup(popupAdd);
  addFormValidator.resetErrors();
});
//-------Закрытие Попапа--------------------//
buttonClosePopupProfile.addEventListener('click', function () {
  closedPopup(popupEdit)
});
buttonClosePopupCard.addEventListener('click', function () {
  closedPopup(popupAdd)
});
buttonClosePopupPhoto.addEventListener('click', function () {
  closedPopup(popupPhoto)
});

formPopupProfile.addEventListener('submit', setUserInfo);

formPopupAddCard.addEventListener('submit', () => {
  const data = {
    name: placeInput.value,
    link: linkInput.value,
  };
  const newCard = createCard(data);
  renderCard(newCard);
  closedPopup(popupAdd);
  addFormValidator.disabledButton()
});

initialCards.forEach(item => {
  const card = createCard(item);
  renderCard(card);
});

const data = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

const editFormValidator = new FormValidator(data, formPopupProfile);
const addFormValidator = new FormValidator(data, formPopupAddCard);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
