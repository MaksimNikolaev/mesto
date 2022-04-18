import Card from './card.js'
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
export const popupPhoto = document.querySelector('.popup_photo');

const buttonClosePopupProfile = popupEdit.querySelector('.popup__close');
const buttonClosePopupCard = popupAdd.querySelector('.popup__close');
const buttonClosePopupPhoto = popupPhoto.querySelector('.popup__close');

export const photoFull = document.querySelector('.popup__photo');
export const photoCaption = document.querySelector('.popup__caption');
const buttonList = document.querySelectorAll('.popup__button');
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

const spanList = document.querySelectorAll('.popup__input-error');
const inputList = document.querySelectorAll('.popup__input');

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

function setUserInfo(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closedPopup(popupEdit);
}

function renderCard() {//рендер карточек
  const newCard = [];
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  const elem = new Card(newCard, '.cards-template').generateCard();
  cardList.prepend(elem);
}

function clearError() {//Очистка ошибки и подчеркивание инпута.
  spanList.forEach(element => element.textContent = '');
  inputList.forEach(element => element.classList.remove('popup__input_type_error'));
}

function disabledButton() {//Сделать кнопку неактивной
  buttonList.forEach((element) => {
    element.disabled = true;
    element.classList.add('popup__button_disabled');
  });
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
  clearError();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
buttonAddCard.addEventListener('click', function () {
  formPopupAddCard.reset();
  openPopup(popupAdd);
  clearError();
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

formPopupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard();
  closedPopup(popupAdd);
  disabledButton()
});

initialCards.forEach(item => {
  const card = new Card(item, '.cards-template');
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
});
