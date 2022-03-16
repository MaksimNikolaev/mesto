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

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');

const closePopupEdit = popupEdit.querySelector('.popup__close');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const closePopupPhoto = popupPhoto.querySelector('.popup__close');

const photoFull = document.querySelector('.popup__photo');
const photoCaption = document.querySelector('.popup__caption');

const openPopupEdit = document.querySelector('.profile__edit-button');
const openPopupAdd = document.querySelector('.profile__add-button');
const formElementEdit = document.querySelector('.popup__form_data_edit');
const formElementAdd = document.querySelector('.popup__form_data_add');
const nameInput = formElementEdit.querySelector('.popup__input_data_name');
const jobInput = formElementEdit.querySelector('.popup__input_data_job');
const placeInput = formElementAdd.querySelector('.popup__input_data_place');
const linkInput = formElementAdd.querySelector('.popup__input_data_link');
const photo = document.querySelector('.elements__photo');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const likeList = document.querySelector('.elements__like');
const cardsList = document.querySelector('.elements__items');



//-------------Попап--------------------//
function togglePopup (popup) {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closedPopup (popup) {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closedPopup (popupEdit);
}

//---------Рендеринг карточек-----------//
function renderCards (place, link) {
  const cards = document
    .querySelector('.cards-template')
    .content.firstElementChild.cloneNode(true);
    const elementPhoto = cards.querySelector('.elements__photo');
  cards.querySelector('.elements__title').textContent = place;
  elementPhoto.src = link;
  elementPhoto.alt = place;
  cards.querySelector('.elements__like').addEventListener('click', function (evt){  //слушатель лайков
    evt.target.classList.toggle('elements__like_active')
  })
  cards.querySelector('.elements__trash').addEventListener('click', removeCard);  //слушатель удаления карточек
  elementPhoto.addEventListener('click', function (evt){
    photoFull.src = link;
    photoCaption.textContent = place;
    popupPhoto.classList.toggle('popup_opened');
  })
  cardsList.prepend(cards);
}

//---------Добавление карточек-----------//
function createCard () {
  const newCard = [];
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  renderCards(newCard.name, newCard.link);
}

function formSubmitHandlerNewCard (evt) {
  evt.preventDefault();
  createCard();
  placeInput.value = '';
  linkInput.value = '';
  closedPopup (popupAdd);
}

function removeCard (evt) {
  const element = evt.currentTarget.closest('.elements__item');
  element.remove();
}

initialCards.forEach(card => renderCards(card.name, card.link));


//-------Открытие Попапа--------------------//
openPopupEdit.addEventListener('click', function () {
  togglePopup(popupEdit)
});
openPopupAdd.addEventListener('click', function () {
  togglePopup(popupAdd)
});
//-------Закрытие Попапа--------------------//
closePopupEdit.addEventListener('click', function() {
  closedPopup(popupEdit)
});
closePopupAdd.addEventListener('click', function() {
  closedPopup(popupAdd)
});
closePopupPhoto.addEventListener('click', function() {
  closedPopup(popupPhoto)
});

formElementEdit.addEventListener('submit', formSubmitHandler);

formElementAdd.addEventListener('submit', formSubmitHandlerNewCard);




