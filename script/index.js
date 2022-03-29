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

const buttonClosePopupProfile = popupEdit.querySelector('.popup__close');
const buttonClosePopupCard = popupAdd.querySelector('.popup__close');
const buttonClosePopupPhoto = popupPhoto.querySelector('.popup__close');

const photoFull = document.querySelector('.popup__photo');
const photoCaption = document.querySelector('.popup__caption');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formPopupProfile = document.querySelector('.popup__form_data_edit');
const formPopupAddCard = document.querySelector('.popup__form_data_add');
const nameInput = formPopupProfile.querySelector('.popup__input_data_name');
const jobInput = formPopupProfile.querySelector('.popup__input_data_job');
const placeInput = formPopupAddCard.querySelector('.popup__input_data_place');
const linkInput = formPopupAddCard.querySelector('.popup__input_data_link');
const photo = document.querySelector('.elements__photo');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const likeList = document.querySelector('.elements__like');
const cardList = document.querySelector('.elements__items');

const spanList = document.querySelectorAll('.popup__input-error');


//-------------Попап--------------------//
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc)
}

function closedPopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
}

function setUserInfo (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closedPopup (popupEdit);
}

function addLike (evt) {
  evt.target.classList.toggle('elements__like_active');
}

function openPopupPhoto (place, link) {
  photoFull.src = link;
  photoCaption.textContent = place;
  openPopup(popupPhoto);
}

//---------Рендеринг карточек-----------//
function createCard (place, link) {
  const card = document
    .querySelector('.cards-template')
    .content.firstElementChild.cloneNode(true);
    const elementPhoto = card.querySelector('.elements__photo');
  card.querySelector('.elements__title').textContent = place;
  elementPhoto.src = link;
  elementPhoto.alt = place;
  card.querySelector('.elements__like').addEventListener('click', addLike);  ////слушатель добавления лайков
  card.querySelector('.elements__trash').addEventListener('click', removeCard);  //слушатель удаления карточек
  elementPhoto.addEventListener('click',  ()=>{
    openPopupPhoto(place, link)
  });
  return card;
}

//---------Добавление карточек-----------//
function renderCard () {

  const newCard = [];
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  const elem = createCard(newCard.name, newCard.link);
  cardList.prepend(elem);
}

function removeCard (evt) {
  const element = evt.currentTarget.closest('.elements__item');
  element.remove();
}

function clearSpan() {
  spanList.forEach(element => element.textContent='');
}

initialCards.forEach(card => cardList.prepend(createCard(card.name, card.link)));

//-------Открытие Попапа--------------------//
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEdit);
  clearSpan();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
buttonAddCard.addEventListener('click', function () {
  formPopupAddCard.reset();
  openPopup(popupAdd);
  clearSpan();
});
//-------Закрытие Попапа--------------------//
buttonClosePopupProfile.addEventListener('click', function() {
  closedPopup(popupEdit)
});
buttonClosePopupCard.addEventListener('click', function() {
  closedPopup(popupAdd)
});
buttonClosePopupPhoto.addEventListener('click', function() {
  closedPopup(popupPhoto)
});

formPopupProfile.addEventListener('submit', setUserInfo);

formPopupAddCard.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderCard ();
  closedPopup(popupAdd);
});


popupEdit.addEventListener('click', (event) => addListenerOverlay(event, popupEdit));
popupAdd.addEventListener('click', (event) => addListenerOverlay(event, popupAdd));
popupPhoto.addEventListener('click',(event) => addListenerOverlay(event, popupPhoto));


function addListenerOverlay(event, popup) {
  if (event.target === event.currentTarget) {
    closedPopup(popup);
  }
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closedPopup(openedPopup); 
  }
} 